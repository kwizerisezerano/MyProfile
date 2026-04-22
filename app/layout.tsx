import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://kwizerisezerano.vercel.app'),
  title: 'KWIZERISEZERANO - Software Developer',
  description: 'Software Developer specializing in Backend Development with Golang, Python, Node.js, PHP, Docker, and more.',
  keywords: ['Software Developer', 'Backend Developer', 'Golang', 'Python', 'PHP', 'Docker', 'Full Stack'],
  authors: [{ name: 'KWIZERISEZERANO' }],
  openGraph: {
    title: 'KWIZERISEZERANO - Software Developer',
    description: 'Software Developer specializing in Backend Development',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
