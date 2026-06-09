'use client'

import { useEffect } from 'react'

export default function VisitorTracker() {
  useEffect(() => {
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
