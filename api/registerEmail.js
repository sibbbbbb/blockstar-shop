import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.DB_URL
const supabaseAnonKey = process.env.DB_KEY

console.log(supabaseUrl, supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function putEmail (email) {
  try {
    await supabase
      .from('emails')
      .insert([
        { email }
      ])
      .select()
  } catch (error) {
    throw new Error(error)
  }
}
