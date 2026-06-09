'use client'

import { useEffect, useState } from 'react'
import { Monitor, Smartphone, Globe, MapPin, Clock, Users, TrendingUp, Eye } from 'lucide-react'

type Visitor = {
  id: string
  ip: string
  country: string
  city: string
  flag: string
  page: string
  referrer: string
  device: string
  timestamp: string
}

export default function Dashboard() {
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [pwd, setPwd] = useState('')
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function login() {
    setLoading(true)
    const res = await fetch(`/api/visitors?pwd=${pwd}`)
    if (res.ok) {
      const data = await res.json()
      setVisitors(data.visitors)
      setAuthed(true)
    } else {
      setError('Wrong password')
    }
    setLoading(false)
  }

  const totalVisits = visitors.length
  const uniqueIPs = new Set(visitors.map((v) => v.ip)).size
  const countries = [...new Set(visitors.map((v) => v.country))]
  const mobile = visitors.filter((v) => v.device === 'Mobile').length
  const desktop = visitors.filter((v) => v.device === 'Desktop').length

  const countryCounts = visitors.reduce((acc, v) => {
    acc[v.country] = (acc[v.country] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm">
          <h1 className="text-white text-2xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-500 text-sm mb-6">Enter your password to view analytics</p>
          <input
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 mb-3 outline-none focus:border-blue-500"
          />
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            {loading ? 'Loading...' : 'Enter'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-6 h-6 text-blue-400" />
          <h1 className="text-2xl font-bold">Visitor Analytics</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Eye, label: 'Total Visits', value: totalVisits, color: 'text-blue-400' },
            { icon: Users, label: 'Unique Visitors', value: uniqueIPs, color: 'text-green-400' },
            { icon: Globe, label: 'Countries', value: countries.length, color: 'text-purple-400' },
            { icon: Monitor, label: 'Desktop', value: desktop, color: 'text-orange-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Top Countries */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h2 className="font-semibold mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-blue-400" /> Top Countries</h2>
            {topCountries.map(([country, count]) => (
              <div key={country} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                <span className="text-gray-300">{country}</span>
                <span className="text-blue-400 font-medium">{count}</span>
              </div>
            ))}
          </div>

          {/* Device Split */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h2 className="font-semibold mb-4 flex items-center gap-2"><Monitor className="w-4 h-4 text-blue-400" /> Devices</h2>
            <div className="flex items-center gap-4 py-3">
              <Monitor className="w-8 h-8 text-blue-400" />
              <div className="flex-1">
                <div className="flex justify-between mb-1"><span>Desktop</span><span>{desktop}</span></div>
                <div className="h-2 bg-gray-800 rounded-full"><div className="h-2 bg-blue-500 rounded-full" style={{ width: `${totalVisits ? (desktop / totalVisits) * 100 : 0}%` }} /></div>
              </div>
            </div>
            <div className="flex items-center gap-4 py-3">
              <Smartphone className="w-8 h-8 text-green-400" />
              <div className="flex-1">
                <div className="flex justify-between mb-1"><span>Mobile</span><span>{mobile}</span></div>
                <div className="h-2 bg-gray-800 rounded-full"><div className="h-2 bg-green-500 rounded-full" style={{ width: `${totalVisits ? (mobile / totalVisits) * 100 : 0}%` }} /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Visitors Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="font-semibold mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-blue-400" /> Recent Visitors</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b border-gray-800">
                  <th className="text-left py-2 pr-4">Time</th>
                  <th className="text-left py-2 pr-4">Location</th>
                  <th className="text-left py-2 pr-4">Device</th>
                  <th className="text-left py-2 pr-4">Page</th>
                  <th className="text-left py-2">Referrer</th>
                </tr>
              </thead>
              <tbody>
                {visitors.slice(0, 50).map((v) => (
                  <tr key={v.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="py-3 pr-4 text-gray-400">{new Date(v.timestamp).toLocaleString()}</td>
                    <td className="py-3 pr-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        {v.city}, {v.country}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-1 rounded text-xs ${v.device === 'Mobile' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                        {v.device}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-gray-400">{v.page}</td>
                    <td className="py-3 text-gray-500 truncate max-w-[150px]">{v.referrer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
