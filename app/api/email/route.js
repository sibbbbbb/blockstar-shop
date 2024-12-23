import { supabaseClient } from '@/lib/supabase'

export async function POST (request) {
  const { email } = await request.json()
  try {
    await supabaseClient.from('emails').insert([{ email }])
    return new Response(JSON.stringify({ message: 'Email sent' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Error sending email' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
