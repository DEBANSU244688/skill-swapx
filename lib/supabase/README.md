# Supabase Integration Guide

This directory contains the Supabase client setup for the Skill Swap application.

## Files

- **`client.ts`** - Browser client for use in Client Components
- **`server.ts`** - Server client for use in Server Components and Server Actions
- **`types.ts`** - TypeScript types matching the database schema

## Setup Instructions

### 1. Install Dependencies ✅

Already installed:
- `@supabase/supabase-js`
- `@supabase/ssr`

### 2. Configure Environment Variables

Copy `env.example` to `.env.local` and fill in your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get these from: Supabase Dashboard → Project Settings → API

### 3. Run Database Schema

Execute `supabase-schema.sql` in your Supabase SQL Editor. This creates:
- All tables (profiles, skills, matches, messages, reviews)
- Row Level Security (RLS) policies
- Indexes for performance
- Triggers for auto-profile creation
- Views for user statistics

## Usage Examples

### Client Component (Browser)

```tsx
"use client"

import { useEffect, useState } from "react"
import { supabaseBrowser } from "@/lib/supabase/client"
import type { Skill } from "@/lib/supabase/types"

export default function MySkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSkills() {
      const supabase = supabaseBrowser()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (!error && data) {
        setSkills(data)
      }
      setLoading(false)
    }

    fetchSkills()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2>My Skills</h2>
      {skills.map(skill => (
        <div key={skill.id}>
          {skill.skill_name} - {skill.level}
        </div>
      ))}
    </div>
  )
}
```

### Server Component

```tsx
import { supabaseServer } from "@/lib/supabase/server"
import type { Profile } from "@/lib/supabase/types"

export default async function ProfilePage() {
  const supabase = await supabaseServer()
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return <div>Please sign in</div>
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  return (
    <div>
      <h1>{profile?.full_name}</h1>
      <p>Trust Score: {profile?.trust_score}</p>
    </div>
  )
}
```

### Server Action

```tsx
"use server"

import { supabaseServer } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { SkillInsert } from "@/lib/supabase/types"

export async function addSkill(formData: FormData) {
  const supabase = await supabaseServer()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const skillData: SkillInsert = {
    user_id: user.id,
    type: formData.get("type") as "offer" | "want",
    skill_name: formData.get("skill_name") as string,
    level: formData.get("level") as "beginner" | "intermediate" | "expert",
  }

  const { error } = await supabase
    .from("skills")
    .insert(skillData)

  if (error) throw error

  revalidatePath("/dashboard")
  return { success: true }
}
```

### Authentication Examples

#### Sign Up
```tsx
const { data, error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "password123",
  options: {
    data: {
      full_name: "John Doe",
      avatar_url: "https://example.com/avatar.jpg"
    }
  }
})
```

#### Sign In
```tsx
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password123"
})
```

#### Sign Out
```tsx
const { error } = await supabase.auth.signOut()
```

#### Get Current User
```tsx
const { data: { user } } = await supabase.auth.getUser()
```

## Database Schema Overview

### Tables

- **profiles** - User profiles (extends auth.users)
- **skills** - Skills users offer or want
- **matches** - Connections between users
- **messages** - Chat messages within matches
- **reviews** - User reviews and ratings

### Views

- **user_stats** - Aggregated user statistics (sessions, ratings)

### Security

All tables have Row Level Security (RLS) enabled with appropriate policies:
- Users can read most data
- Users can only modify their own data
- Match participants can access match-related data
- Reviews require completed matches

## TypeScript Types

Import types from `types.ts`:

```tsx
import type { 
  Profile, 
  Skill, 
  Match, 
  Message, 
  Review,
  SkillInsert,
  MatchUpdate 
} from "@/lib/supabase/types"
```

## Realtime Subscriptions (Optional)

Enable realtime for live updates:

```tsx
const supabase = supabaseBrowser()

// Subscribe to new messages
const channel = supabase
  .channel("messages")
  .on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "messages",
      filter: `match_id=eq.${matchId}`
    },
    (payload) => {
      console.log("New message:", payload.new)
    }
  )
  .subscribe()

// Cleanup
return () => {
  supabase.removeChannel(channel)
}
```

## Troubleshooting

### Environment Variables Not Found
- Ensure `.env.local` exists with correct values
- Restart dev server after adding env vars
- Check variable names start with `NEXT_PUBLIC_`

### RLS Policy Errors
- Verify user is authenticated
- Check RLS policies in Supabase Dashboard
- Ensure user has permission for the operation

### Type Errors
- Run `npm run dev` to generate `next-env.d.ts`
- Ensure `@types/node` is installed
- Check `tsconfig.json` includes correct paths
