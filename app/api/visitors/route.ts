import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function GET(req: NextRequest) {
  const pwd = req.nextUrl.searchParams.get('pwd')
  if (pwd !== process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const raw = await redis.lrange('visitors', 0, 999)
  const visitors = raw.map((v) => (typeof v === 'string' ? JSON.parse(v) : v))

  return NextResponse.json({ visitors })
}
