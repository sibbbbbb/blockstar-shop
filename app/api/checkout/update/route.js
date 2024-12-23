import shopifyClient from '@/lib/shopify'

export async function POST (request) {
  const body = await request.json()
  const { cartId, lineItems } = body

  const query = `
    mutation cartLinesAdd($id: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $id, lines: $lines) {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `

  const { data, errors } = await shopifyClient.request(query, { variables: { id: cartId, lines: lineItems } })

  if (errors) {
    console.log(errors)
    return new Response(JSON.stringify(errors), { status: 500 })
  }

  return new Response(JSON.stringify(data.cartLinesAdd.cart), { status: 200 })
}
