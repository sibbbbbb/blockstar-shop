// import shopifyClient from '@/lib/shopify'

export async function POST () {
  const NUBE_API = process.env.NUBE_API
  const NUBE_ACCESS_TOKEN = process.env.NUBE_ACCESS_TOKEN
  const NUBE_SUPER_USER = process.env.NUBE_SUPER_USER

  const response = await fetch(`${NUBE_API}/products/carts`, {
    method: 'POST',
    headers: {
      Authentication: `bearer ${NUBE_ACCESS_TOKEN}`,
      'User-Agent': `${NUBE_SUPER_USER}`
    }
  })

  console.log(response)

  // const queryCart = `
  //   mutation cartCreate ($input: CartInput) {
  //     cartCreate (input: $input) {
  //       cart {
  //         id
  //       }
  //     }
  //   }
  // `

  // const { data, errors } = await shopifyClient.request(queryCart, {
  //   variables: { input: { lines: [] } }
  // })

  // if (errors) {
  //   console.log(errors)
  //   return new Response(JSON.stringify(errors), { status: 500 })
  // }

  // return new Response(JSON.stringify(data.cartCreate.cart), { status: 200 })
}
