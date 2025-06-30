// import shopifyClient from '@/lib/shopify'

export async function POST () {
  const NUBE_API = process.env.NUBE_API
  const NUBE_ACCESS_TOKEN = process.env.NUBE_ACCESS_TOKEN
  const NUBE_SUPER_USER = process.env.NUBE_SUPER_USER

  const response = await fetch(`${NUBE_API}/products/cart`, {
    method: 'POST',
    headers: {
      Authentication: `bearer ${NUBE_ACCESS_TOKEN}`,
      'User-Agent': `${NUBE_SUPER_USER}`
    },
    body: JSON.stringify({
      items: [
        {
          variant_id: 1149179132,
          quantity: 1
        }
      ]
    })
  })

  console.log(response)

  // const body = await request.json()
  // const { cartId, lineItems } = body

  // const query = `
  //   mutation cartLinesAdd($id: ID!, $lines: [CartLineInput!]!) {
  //     cartLinesAdd(cartId: $id, lines: $lines) {
  //       cart {
  //         id
  //         checkoutUrl
  //       }
  //     }
  //   }
  // `

  // const { data, errors } = await shopifyClient.request(query, { variables: { id: cartId, lines: lineItems } })

  // if (errors) {
  //   console.log(errors)
  //   return new Response(JSON.stringify(errors), { status: 500 })
  // }

  // return new Response(JSON.stringify(data.cartLinesAdd.cart), { status: 200 })
}
