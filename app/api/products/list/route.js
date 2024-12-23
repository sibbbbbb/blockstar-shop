import shopifyClient from '@/lib/shopify'

export async function GET () {
  const queryProducts = `
    query {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 1) {
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
      }
    }
  `

  const { data, errors } = await shopifyClient.request(queryProducts)

  if (errors) {
    console.log(errors)
    return new Response(JSON.stringify(errors), { status: 500 })
  }

  const formattedProducts = data.products.edges.map(({ node }) => ({
    id: node.id.split('/').pop(),
    title: node.title,
    image: {
      src: node.images.edges[0]?.node.url,
      alt: node.images.edges[0]?.node.altText,
      height: node.images.edges[0]?.node.height,
      width: node.images.edges[0]?.node.width
    },
    price: node.variants.edges[0]?.node.price.amount
  }))

  return new Response(JSON.stringify(formattedProducts), { status: 200 })
}
