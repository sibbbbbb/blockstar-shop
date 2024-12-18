import Parser from 'rss-parser'

const parser = new Parser()

export async function GET () {
  try {
    const feed = await parser.parseURL('https://www.perfil.com/feed')
    const items = feed.items.slice(0, 5)

    return new Response(JSON.stringify(items), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify(Array(10).fill({ title: 'Unite al club', date: '[18/12/2024]' })), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
