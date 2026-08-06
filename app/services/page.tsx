import type { Metadata } from 'next'
import Navigation from '../components/Navigation'
import Services from '../components/Services'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://my-profile-sandy-ten.vercel.app'),
  title: 'Services - KWIZERISEZERANO | Software Developer',
  description: 'Services offered by KWIZERISEZERANO: Web Development, Backend Development, Mobile App Development, Database Design, Software Testing, Information Security and more.',
  keywords: ['Services', 'Web Development', 'Backend Development', 'Mobile App', 'Database Design', 'Software Testing', 'KWIZERISEZERANO'],
  authors: [{ name: 'KWIZERISEZERANO' }],
  alternates: { canonical: 'https://my-profile-sandy-ten.vercel.app/services' },
  openGraph: {
    title: 'Services - KWIZERISEZERANO | Software Developer',
    description: 'Web Development, Backend Development, Mobile App, Database Design, Software Testing and more.',
    url: 'https://my-profile-sandy-ten.vercel.app/services',
    type: 'website',
    siteName: 'KWIZERISEZERANO Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services - KWIZERISEZERANO | Software Developer',
    description: 'Web Development, Backend Development, Mobile App, Database Design, Software Testing and more.',
  },
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navigation />
      <Services />
      <Footer />
    </main>
  )
}
