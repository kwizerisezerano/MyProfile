import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-900">
      <Navigation />
      <Hero />
      <Footer />
    </main>
  )
}
