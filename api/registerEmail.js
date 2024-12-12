import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_DB_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_DB_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function putEmail (email) {
  try {
    await supabase
      .from('emails')
      .insert([
        { email }
      ])
  } catch (error) {
    throw new Error(error)
  }
}
