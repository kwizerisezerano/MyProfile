import type { Metadata } from 'next'
import Navigation from '../components/Navigation'
import About from '../components/About'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://kwizerisezerano.vercel.app'),
  title: 'About - KWIZERISEZERANO | Software Developer',
  description: 'Learn about KWIZERISEZERANO, a Software Developer specializing in Backend Development with Golang, Python, Node.js, PHP and cloud technologies at Qonics Inc.',
  keywords: ['About', 'KWIZERISEZERANO', 'Backend Developer', 'Qonics Inc', 'Rwanda Developer', 'Software Engineer'],
  authors: [{ name: 'KWIZERISEZERANO' }],
  alternates: { canonical: 'https://kwizerisezerano.vercel.app/about' },
  openGraph: {
    title: 'About - KWIZERISEZERANO | Software Developer',
    description: 'Learn about KWIZERISEZERANO, a Software Developer specializing in Backend Development.',
    url: 'https://kwizerisezerano.vercel.app/about',
    type: 'profile',
    siteName: 'KWIZERISEZERANO Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About - KWIZERISEZERANO | Software Developer',
    description: 'Learn about KWIZERISEZERANO, a Software Developer specializing in Backend Development.',
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navigation />
      <About />
      <Footer />
    </main>
  )
}
