import shopifyClient from '@/lib/shopify'

export async function POST () {
  const queryCart = `
    mutation cartCreate ($input: CartInput) {
      cartCreate (input: $input) {
        cart {
          id
        }
      }
    }
  `

  const { data, errors } = await shopifyClient.request(queryCart, {
    variables: { input: { lines: [] } }
  })

  if (errors) {
    console.log(errors)
    return new Response(JSON.stringify(errors), { status: 500 })
  }

  return new Response(JSON.stringify(data.cartCreate.cart), { status: 200 })
}
