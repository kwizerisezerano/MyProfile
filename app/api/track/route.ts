import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0] ||
      req.headers.get('x-real-ip') ||
      'unknown'

    // Get location from IP using free ipapi
    let country = 'Unknown', city = 'Unknown', flag = '🌍'
    try {
      const geo = await fetch(`https://ipapi.co/${ip}/json/`)
      const geoData = await geo.json()
      country = geoData.country_name || 'Unknown'
      city = geoData.city || 'Unknown'
      flag = geoData.country_code
        ? `https://flagcdn.com/24x18/${geoData.country_code.toLowerCase()}.png`
        : '🌍'
    } catch {}

    const visitor = {
      id: crypto.randomUUID(),
      ip,
      country,
      city,
      flag,
      page: body.page || '/',
      referrer: body.referrer || 'direct',
      userAgent: req.headers.get('user-agent') || 'unknown',
      device: /mobile/i.test(req.headers.get('user-agent') || '') ? 'Mobile' : 'Desktop',
      timestamp: new Date().toISOString(),
    }

    await redis.lpush('visitors', JSON.stringify(visitor))
    await redis.ltrim('visitors', 0, 999) // keep last 1000 visitors

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
