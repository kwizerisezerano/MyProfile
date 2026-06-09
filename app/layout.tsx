import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import { LanguageProvider } from './components/LanguageProvider'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import VisitorTracker from './components/VisitorTracker'

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
        <LanguageProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LanguageProvider>
        <Analytics />
        <VisitorTracker />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-50FSR30CCY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-50FSR30CCY');
          `}
        </Script>
      </body>
    </html>
  )
}
