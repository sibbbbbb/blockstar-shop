import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.DB_URL
const supabaseAnonKey = process.env.DB_KEY

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
