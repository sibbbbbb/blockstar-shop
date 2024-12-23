import shopifyClient from '@/lib/shopify'

export async function POST (request) {
  const body = await request.json()
  const { gid } = body

  const queryProduct = `
    query($id: ID!) {
      product(id: $id) {
        id
        title
        description
        totalInventory
        images(first: 10) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              price {
                amount
              }
            }
          }
        }
      }
    }
  `

  const { data, errors } = await shopifyClient.request(queryProduct, {
    variables: { id: gid }
  })

  if (errors) {
    console.log(errors)
    return new Response(JSON.stringify(errors), { status: 500 })
  }

  const formattedProduct = {
    id: data.product.variants.edges[0]?.node.id.split('/').pop(),
    title: data.product.title,
    images: data.product.images.edges.map(({ node }) => ({
      src: node.url,
      alt: node.altText,
      height: node.height,
      width: node.width
    })),
    stock: data.product.totalInventory,
    price: data.product.variants.edges[0]?.node.price.amount
  }

  return new Response(JSON.stringify(formattedProduct), { status: 200 })
}
