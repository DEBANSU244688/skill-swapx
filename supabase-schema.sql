-- ============================================
-- Skill Swap Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ============================================
-- TABLES
-- ============================================

-- PROFILES table (extends Supabase Auth)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  trust_score numeric default 5.0,
  created_at timestamp with time zone default now()
);

-- SKILLS table (Offer & Want)
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  type text check (type in ('offer', 'want')),
  skill_name text not null,
  level text check (level in ('beginner', 'intermediate', 'expert')),
  created_at timestamp with time zone default now()
);

-- MATCHES table
create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  user_a uuid references public.profiles(id) on delete cascade,
  user_b uuid references public.profiles(id) on delete cascade,
  status text default 'pending' check (status in ('pending', 'accepted', 'completed')),
  match_score numeric,
  created_at timestamp with time zone default now(),
  constraint different_users check (user_a != user_b)
);

-- MESSAGES table
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  match_id uuid references public.matches(id) on delete cascade,
  sender_id uuid references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default now()
);

-- REVIEWS table
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  match_id uuid references public.matches(id) on delete cascade,
  reviewer_id uuid references public.profiles(id),
  reviewee_id uuid references public.profiles(id),
  rating int check (rating between 1 and 5) not null,
  comment text,
  created_at timestamp with time zone default now(),
  constraint different_reviewer_reviewee check (reviewer_id != reviewee_id)
);

-- ============================================
-- INDEXES for better query performance
-- ============================================

create index if not exists idx_skills_user_id on public.skills(user_id);
create index if not exists idx_skills_type on public.skills(type);
create index if not exists idx_matches_user_a on public.matches(user_a);
create index if not exists idx_matches_user_b on public.matches(user_b);
create index if not exists idx_matches_status on public.matches(status);
create index if not exists idx_messages_match_id on public.messages(match_id);
create index if not exists idx_messages_sender_id on public.messages(sender_id);
create index if not exists idx_reviews_reviewee_id on public.reviews(reviewee_id);

-- ============================================
-- VIEWS
-- ============================================

-- User stats view: completed sessions count and average rating
create or replace view public.user_stats as
select
  p.id,
  p.full_name,
  p.trust_score,
  count(distinct m.id) filter (where m.status = 'completed') as sessions_completed,
  avg(r.rating) as avg_rating,
  count(distinct r.id) as total_reviews
from public.profiles p
left join public.matches m on (m.user_a = p.id or m.user_b = p.id)
left join public.reviews r on r.reviewee_id = p.id
group by p.id, p.full_name, p.trust_score;

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function: Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Trigger: Create profile on auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Function: Update trust score based on reviews
create or replace function public.update_trust_score()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
  set trust_score = (
    select coalesce(avg(rating), 5.0)
    from public.reviews
    where reviewee_id = new.reviewee_id
  )
  where id = new.reviewee_id;
  return new;
end;
$$;

-- Trigger: Update trust score after review insert/update
drop trigger if exists on_review_change on public.reviews;
create trigger on_review_change
  after insert or update on public.reviews
  for each row execute function public.update_trust_score();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.skills enable row level security;
alter table public.matches enable row level security;
alter table public.messages enable row level security;
alter table public.reviews enable row level security;

-- ============================================
-- PROFILES POLICIES
-- ============================================

-- Anyone can read all profiles
create policy "profiles_read_all"
  on public.profiles for select
  using (true);

-- Users can update their own profile
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- Users can insert their own profile (for manual creation)
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

-- ============================================
-- SKILLS POLICIES
-- ============================================

-- Anyone can read all skills
create policy "skills_read_all"
  on public.skills for select
  using (true);

-- Users can insert their own skills
create policy "skills_insert_own"
  on public.skills for insert
  with check (auth.uid() = user_id);

-- Users can update their own skills
create policy "skills_update_own"
  on public.skills for update
  using (auth.uid() = user_id);

-- Users can delete their own skills
create policy "skills_delete_own"
  on public.skills for delete
  using (auth.uid() = user_id);

-- ============================================
-- MATCHES POLICIES
-- ============================================

-- Participants can read their matches
create policy "matches_read_participants"
  on public.matches for select
  using (auth.uid() = user_a or auth.uid() = user_b);

-- Participants can create matches
create policy "matches_insert_participants"
  on public.matches for insert
  with check (auth.uid() = user_a or auth.uid() = user_b);

-- Participants can update their matches
create policy "matches_update_participants"
  on public.matches for update
  using (auth.uid() = user_a or auth.uid() = user_b);

-- ============================================
-- MESSAGES POLICIES
-- ============================================

-- Participants can read messages in their matches
create policy "messages_read_participants"
  on public.messages for select
  using (
    exists (
      select 1 from public.matches m
      where m.id = match_id 
        and (auth.uid() = m.user_a or auth.uid() = m.user_b)
    )
  );

-- Participants can send messages in their matches
create policy "messages_insert_participants"
  on public.messages for insert
  with check (
    sender_id = auth.uid() and
    exists (
      select 1 from public.matches m
      where m.id = match_id 
        and (auth.uid() = m.user_a or auth.uid() = m.user_b)
    )
  );

-- ============================================
-- REVIEWS POLICIES
-- ============================================

-- Anyone can read reviews
create policy "reviews_read_all"
  on public.reviews for select
  using (true);

-- Users can create reviews for matches they're part of
create policy "reviews_insert_by_reviewer"
  on public.reviews for insert
  with check (
    reviewer_id = auth.uid() and
    exists (
      select 1 from public.matches m
      where m.id = match_id 
        and m.status = 'completed'
        and (m.user_a = reviewer_id or m.user_b = reviewer_id)
    )
  );

-- Users can update their own reviews
create policy "reviews_update_own"
  on public.reviews for update
  using (reviewer_id = auth.uid());

-- Users can delete their own reviews
create policy "reviews_delete_own"
  on public.reviews for delete
  using (reviewer_id = auth.uid());

-- ============================================
-- REALTIME (Optional - enable for live updates)
-- ============================================

-- Enable realtime for messages (for chat functionality)
-- alter publication supabase_realtime add table public.messages;

-- Enable realtime for matches (for live match updates)
-- alter publication supabase_realtime add table public.matches;
