import type { Metadata } from 'next'
import Navigation from '../components/Navigation'
import GitHubContributions from '../components/GitHubContributions'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://my-profile-sandy-ten.vercel.app'),
  title: 'Contributions - KWIZERISEZERANO | GitHub Activity',
  description: 'GitHub contributions and open source activity of KWIZERISEZERANO, Software Developer based in Kigali, Rwanda.',
  keywords: ['GitHub', 'Contributions', 'Open Source', 'KWIZERISEZERANO'],
  authors: [{ name: 'KWIZERISEZERANO' }],
  alternates: { canonical: 'https://my-profile-sandy-ten.vercel.app/contributions' },
  openGraph: {
    title: 'Contributions - KWIZERISEZERANO | GitHub Activity',
    description: 'GitHub contributions and open source activity of KWIZERISEZERANO.',
    url: 'https://my-profile-sandy-ten.vercel.app/contributions',
    type: 'website',
    siteName: 'KWIZERISEZERANO Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contributions - KWIZERISEZERANO | GitHub Activity',
    description: 'GitHub contributions and open source activity of KWIZERISEZERANO.',
  },
}

export default function ContributionsPage() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navigation />
      <GitHubContributions />
      <Footer />
    </main>
  )
}
