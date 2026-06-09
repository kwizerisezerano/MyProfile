import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
  if (!token) return NextResponse.json({ errors: [{ message: 'No token' }] }, { status: 401 })

  const body = await req.json()
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return NextResponse.json(data)
}
