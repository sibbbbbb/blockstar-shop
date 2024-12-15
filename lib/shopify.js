const SHOPIFY_API_URL = process.env.SHOPIFY_API_URL
const SHOPIFY_API_PASSWORD = process.env.SHOPIFY_API_PASSWORD

export const shopifyFetch = async (endpoint, options = {}) => {
  const url = `${SHOPIFY_API_URL}/${endpoint}.json`

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': SHOPIFY_API_PASSWORD
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  })

  if (!response.ok) {
    console.error(`Shopify API error: ${response.statusText}`)
    throw new Error(`Error: ${response.status}`)
  }

  return response.json()
}
