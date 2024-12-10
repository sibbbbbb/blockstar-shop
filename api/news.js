import Parser from 'rss-parser'

const parser = new Parser()

export async function getNews () {
  const feed = await parser.parseURL('https://www.perfil.com/feed')
  const items = feed.items.slice(0, 5)

  return items.map(({ title, isoDate }) => {
    const date = new Date(isoDate)
    const formattedDate = `[${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}]`
    return {
      title,
      date: formattedDate
    }
  })
}
