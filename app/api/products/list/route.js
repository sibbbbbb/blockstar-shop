export async function GET () {
  const NUBE_API = process.env.NUBE_API
  const NUBE_ACCESS_TOKEN = process.env.NUBE_ACCESS_TOKEN
  const NUBE_SUPER_USER = process.env.NUBE_SUPER_USER

  const response = await fetch(`${NUBE_API}/products`, {
    method: 'GET',
    headers: {
      Authentication: `bearer ${NUBE_ACCESS_TOKEN}`,
      'User-Agent': `${NUBE_SUPER_USER}`
    }
  })

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`)
  }

  const data = await response.json()

  const formattedProducts = data.map((product) => ({
    id: product.id,
    title: product.name.es,
    stock: 10,
    image: {
      src: product.images[0]?.src,
      alt: `${product.images[0]?.product_id} product image`,
      height: product.images[0]?.height,
      width: product.images[0]?.width
    },
    price: product.variants[0]?.price
  }))

  return new Response(JSON.stringify(formattedProducts), { status: 200 })
}
