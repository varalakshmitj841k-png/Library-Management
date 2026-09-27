import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const hasValidSupabaseConfig =
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'YOUR_SUPABASE_URL' &&
  supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY' &&
  /^https?:\/\//.test(supabaseUrl)

export const supabase = hasValidSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
