import { shopifyFetch } from '@/lib/shopify'

export async function POST (request) {
  try {
    const { productId } = await request.json()
    const data = await shopifyFetch(`products/${productId}`)
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: 'Error fetching product' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
