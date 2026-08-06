import type { Metadata } from 'next'
import Navigation from '../components/Navigation'
import Skills from '../components/Skills'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://my-profile-sandy-ten.vercel.app'),
  title: 'Skills - KWIZERISEZERANO | Backend Developer',
  description: 'Technical skills of KWIZERISEZERANO: Golang, Python, PHP, Node.js, PostgreSQL, MySQL, Redis, Docker, Linux, CI/CD and more.',
  keywords: ['Skills', 'Golang', 'Python', 'PHP', 'Node.js', 'PostgreSQL', 'Docker', 'Redis', 'Backend Developer', 'KWIZERISEZERANO'],
  authors: [{ name: 'KWIZERISEZERANO' }],
  alternates: { canonical: 'https://my-profile-sandy-ten.vercel.app/skills' },
  openGraph: {
    title: 'Skills - KWIZERISEZERANO | Backend Developer',
    description: 'Technical skills: Golang, Python, PHP, Node.js, PostgreSQL, Docker and more.',
    url: 'https://my-profile-sandy-ten.vercel.app/skills',
    type: 'website',
    siteName: 'KWIZERISEZERANO Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skills - KWIZERISEZERANO | Backend Developer',
    description: 'Technical skills: Golang, Python, PHP, Node.js, PostgreSQL, Docker and more.',
  },
}

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navigation />
      <Skills />
      <Footer />
    </main>
  )
}
