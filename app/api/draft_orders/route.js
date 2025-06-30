export async function POST (request) {
  const NUBE_API = process.env.NUBE_API
  const NUBE_ACCESS_TOKEN = process.env.NUBE_ACCESS_TOKEN
  const NUBE_SUPER_USER = process.env.NUBE_SUPER_USER
  const body = await request.json()
  const { products, name, lastName, email } = body

  const firstLetterUppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  const response = await fetch(`${NUBE_API}/draft_orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authentication: `bearer ${NUBE_ACCESS_TOKEN}`,
      'User-Agent': `${NUBE_SUPER_USER}`
    },
    body: JSON.stringify({
      payment_status: 'unpaid',
      contact_name: firstLetterUppercase(name),
      contact_lastname: firstLetterUppercase(lastName),
      contact_email: email,
      products: products.map(({ id, quantity }) => ({
        variant_id: id,
        quantity
      }))
    })
  })

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`)
  }

  const data = await response.json()

  return new Response(JSON.stringify(data?.checkout_url), { status: 200 })
}
