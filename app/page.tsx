'use client'

import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Services from './components/Services'
import Projects from './components/Projects'
import Experience from './components/Experience'
import GitHubContributions from './components/GitHubContributions'
import Contact from './components/Contact'
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
      <Projects />
      <Experience />
      <GitHubContributions />
      <Contact />
      <Footer />
    </main>
  )
}
