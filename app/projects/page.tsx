import type { Metadata } from 'next'
import Navigation from '../components/Navigation'
import Projects from '../components/Projects'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://kwizerisezerano.vercel.app'),
  title: 'Projects - KWIZERISEZERANO | Software Developer',
  description: 'Featured projects by KWIZERISEZERANO: Leazi (Property SaaS), TontineHub (Group Savings), GECO Rwanda (Healthcare), TMIS, Menya-Tech and more.',
  keywords: ['Projects', 'Leazi', 'TontineHub', 'GECO Rwanda', 'TMIS', 'Menya-Tech', 'Portfolio', 'KWIZERISEZERANO'],
  authors: [{ name: 'KWIZERISEZERANO' }],
  alternates: { canonical: 'https://kwizerisezerano.vercel.app/projects' },
  openGraph: {
    title: 'Projects - KWIZERISEZERANO | Software Developer',
    description: 'Featured projects: Leazi, TontineHub, GECO Rwanda, TMIS, Menya-Tech and more.',
    url: 'https://kwizerisezerano.vercel.app/projects',
    type: 'website',
    siteName: 'KWIZERISEZERANO Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects - KWIZERISEZERANO | Software Developer',
    description: 'Featured projects: Leazi, TontineHub, GECO Rwanda, TMIS, Menya-Tech and more.',
  },
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navigation />
      <Projects />
      <Footer />
    </main>
  )
}
