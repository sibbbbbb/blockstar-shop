import { createStorefrontApiClient } from '@shopify/storefront-api-client'

const SHOPIFY_API_URL = process.env.SHOPIFY_API_URL
const SHOPIFY_API_PASSWORD = process.env.SHOPIFY_API_PASSWORD
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION

export default createStorefrontApiClient({
  storeDomain: SHOPIFY_API_URL,
  apiVersion: SHOPIFY_API_VERSION,
  publicAccessToken: SHOPIFY_API_PASSWORD
})
