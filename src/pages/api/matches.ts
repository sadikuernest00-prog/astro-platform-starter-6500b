export async function GET() {
  const response = await fetch(
    'https://v3.football.api-sports.io/fixtures?live=all',
    {
      headers: {
        'x-apisports-key': '82c608c837000113d5867bd11f243454'
      }
    }
  )

  const data = await response.json()

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
