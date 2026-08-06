import type { Metadata } from 'next'
import Navigation from '../components/Navigation'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://kwizerisezerano.vercel.app'),
  title: 'Contact - KWIZERISEZERANO | Software Developer',
  description: 'Get in touch with KWIZERISEZERANO, Software Developer based in Kigali, Rwanda. Available for freelance projects and collaborations.',
  keywords: ['Contact', 'KWIZERISEZERANO', 'Hire Developer', 'Kigali Rwanda', 'Freelance Developer', 'Software Developer Rwanda'],
  authors: [{ name: 'KWIZERISEZERANO' }],
  alternates: { canonical: 'https://kwizerisezerano.vercel.app/contact' },
  openGraph: {
    title: 'Contact - KWIZERISEZERANO | Software Developer',
    description: 'Get in touch with KWIZERISEZERANO, Software Developer based in Kigali, Rwanda.',
    url: 'https://kwizerisezerano.vercel.app/contact',
    type: 'website',
    siteName: 'KWIZERISEZERANO Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact - KWIZERISEZERANO | Software Developer',
    description: 'Get in touch with KWIZERISEZERANO, Software Developer based in Kigali, Rwanda.',
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navigation />
      <Contact />
      <Footer />
    </main>
  )
}
