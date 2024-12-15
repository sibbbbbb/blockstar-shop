import { shopifyFetch } from '@/lib/shopify'

export async function GET () {
  try {
    const data = await shopifyFetch('products')
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Error fetching products' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
