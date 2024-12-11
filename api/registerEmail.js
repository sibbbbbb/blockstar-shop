export async function putEmail (email) {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzUxZvec2qmDBgrWw9NqkUCWrdIe7iG_4ggVE6xCA8H0Lc28Se6sahpT9Snvo5Zs8Li6w/exec', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' }
    })

    console.log(response)

    // console.log(response)
  } catch (error) {
    console.error(error)
  }
}
