import shopifyClient from '@/lib/shopify'

export async function POST (request) {
  const body = await request.json()
  const { lineItems } = body

  const queryCart = `
    mutation CreateCart($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const { data, errors } = await shopifyClient.request(queryCart, {
    variables: { input: { lines: lineItems } }
  })

  if (errors) {
    console.log(errors)
    return new Response(JSON.stringify(errors), { status: 500 })
  }

  console.log(data)

  return new Response(JSON.stringify(), { status: 200 })
}
