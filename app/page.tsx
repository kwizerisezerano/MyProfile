'use client'

import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Services from './components/Services'
import Experience from './components/Experience'
import Navigation from './components/Navigation'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Experience />
      <Footer />
    </main>
  )
}
