// Database types for Supabase tables
// These types match the schema defined in supabase-schema.sql

export type Profile = {
  id: string
  full_name: string | null
  avatar_url: string | null
  trust_score: number
  created_at: string
}

export type SkillType = 'offer' | 'want'
export type SkillLevel = 'beginner' | 'intermediate' | 'expert'

export type Skill = {
  id: string
  user_id: string
  type: SkillType
  skill_name: string
  level: SkillLevel
  created_at: string
}

export type MatchStatus = 'pending' | 'accepted' | 'completed'

export type Match = {
  id: string
  user_a: string
  user_b: string
  status: MatchStatus
  match_score: number | null
  created_at: string
}

export type Message = {
  id: string
  match_id: string
  sender_id: string
  content: string
  created_at: string
}

export type Review = {
  id: string
  match_id: string
  reviewer_id: string
  reviewee_id: string
  rating: number
  comment: string | null
  created_at: string
}

export type UserStats = {
  id: string
  full_name: string | null
  trust_score: number
  sessions_completed: number
  avg_rating: number | null
  total_reviews: number
}

// Helper types for inserts (without auto-generated fields)
export type ProfileInsert = Omit<Profile, 'created_at'>
export type SkillInsert = Omit<Skill, 'id' | 'created_at'>
export type MatchInsert = Omit<Match, 'id' | 'created_at'>
export type MessageInsert = Omit<Message, 'id' | 'created_at'>
export type ReviewInsert = Omit<Review, 'id' | 'created_at'>

// Helper types for updates (all fields optional except id)
export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'created_at'>>
export type SkillUpdate = Partial<Omit<Skill, 'id' | 'user_id' | 'created_at'>>
export type MatchUpdate = Partial<Omit<Match, 'id' | 'created_at'>>
export type MessageUpdate = Partial<Omit<Message, 'id' | 'match_id' | 'sender_id' | 'created_at'>>
export type ReviewUpdate = Partial<Omit<Review, 'id' | 'match_id' | 'reviewer_id' | 'reviewee_id' | 'created_at'>>
