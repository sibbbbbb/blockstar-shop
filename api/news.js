import Parser from 'rss-parser'

const parser = new Parser()

export async function getNews () {
  const feed = await parser.parseURL('https://www.clarin.com/rss/lo-ultimo/')
  const items = feed.items.slice(0, 5) // Obtener las 5 noticias más recientes

  return items
}
