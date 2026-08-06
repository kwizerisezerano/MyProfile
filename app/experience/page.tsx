import type { Metadata } from 'next'
import Navigation from '../components/Navigation'
import Experience from '../components/Experience'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://my-profile-sandy-ten.vercel.app'),
  title: 'Experience - KWIZERISEZERANO | Software Developer',
  description: 'Professional experience of KWIZERISEZERANO: Back-End Developer at Qonics Inc, Teacher at Lycee Saint Alexandre Sauli de Muhura and Bright Academy TSS. BSc IT at University of Kigali.',
  keywords: ['Experience', 'Qonics Inc', 'Backend Developer', 'Teacher', 'University of Kigali', 'RP Tumba', 'KWIZERISEZERANO'],
  authors: [{ name: 'KWIZERISEZERANO' }],
  alternates: { canonical: 'https://my-profile-sandy-ten.vercel.app/experience' },
  openGraph: {
    title: 'Experience - KWIZERISEZERANO | Software Developer',
    description: 'Back-End Developer at Qonics Inc, Teacher, BSc IT at University of Kigali.',
    url: 'https://my-profile-sandy-ten.vercel.app/experience',
    type: 'website',
    siteName: 'KWIZERISEZERANO Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience - KWIZERISEZERANO | Software Developer',
    description: 'Back-End Developer at Qonics Inc, Teacher, BSc IT at University of Kigali.',
  },
}

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navigation />
      <Experience />
      <Footer />
    </main>
  )
}
