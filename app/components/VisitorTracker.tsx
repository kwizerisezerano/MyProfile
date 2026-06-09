'use client'

import { useEffect, useRef } from 'react'

export default function VisitorTracker() {
  const tracked = useRef(false)
  useEffect(() => {
    if (tracked.current) return
    tracked.current = true
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: window.location.pathname,
        referrer: document.referrer || 'direct',
      }),
    }).catch(() => {})
  }, [])

  return null
}
