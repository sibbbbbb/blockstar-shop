export async function POST (request) {
  const NUBE_API = process.env.NUBE_API
  const NUBE_ACCESS_TOKEN = process.env.NUBE_ACCESS_TOKEN
  const NUBE_SUPER_USER = process.env.NUBE_SUPER_USER
  const body = await request.json()
  const { gid } = body

  const response = await fetch(`${NUBE_API}/products/${gid}`, {
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

  const formattedProduct = {
    id: data.id,
    title: data.name.es,
    stock: data.variants[0]?.stock,
    images: data.images.map((image) => ({
      src: image.src,
      alt: `${image.product_id} product image`,
      height: image.height,
      width: image.width
    })),
    sizes: data.variants.map((variant) => {
      return {
        id: variant.id,
        title: data.name.es,
        images: [
          { src: data.images[0]?.src, alt: `${data.id} product image` }
        ],
        position: variant.position,
        stock: variant.stock,
        price: variant.price,
        size: variant.values.length > 0 ? variant.values[0].es : null
      }
    }),
    price: data.variants[0]?.price
  }

  return new Response(JSON.stringify(formattedProduct), { status: 200 })
}
