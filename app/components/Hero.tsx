'use client'

import { Github, Linkedin, Mail, ChevronDown, Terminal, X, Facebook, Instagram } from 'lucide-react'

export default function Hero() {
  const scrollToAbout = () => {
    const element = document.querySelector('#about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dark-900 transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-dark-900 to-dark-900 dark-mode-bg" />
        <div className="absolute inset-0 dot-pattern" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(74, 222, 128, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
              <Terminal className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-gray-300">Back End Developer @ Qonics Inc</span>
            </div>

            {/* Name */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 animate-slide-up">
              <span className="text-white">KWIZERISE</span>
              <span className="text-gradient">ZERANO</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl lg:max-w-none animate-slide-up px-2 sm:px-0" style={{ animationDelay: '0.2s' }}>
              Software Developer specializing in Backend Development with expertise in Golang, Python, Node.js, and cloud technologies. Building scalable, secure, and efficient systems.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 sm:gap-4 mb-8 sm:mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.querySelector('#about')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-6 sm:px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 w-full sm:w-auto text-center"
              >
                About Me
              </a>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <a
                href="https://github.com/kwizerisezerano/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/kwizerisezerano-xxx-127163363/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://x.com/Kwizerisezeran1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 transition-colors duration-200"
                aria-label="X (Twitter)"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://www.facebook.com/kwizerisezerano.tabitha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://www.instagram.com/tabithakwizerisezerano/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="mailto:tabitakwizerisezerano@gmail.com"
                className="text-primary-400 hover:text-primary-300 transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="flex justify-center lg:justify-end order-first lg:order-last mb-8 lg:mb-0">
            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-3xl scale-110" />
              {/* Image Container */}
              <div className="relative w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden glass border-2 border-primary-500/20">
                {/* Profile Image */}
                <img 
                  src="/profile.jpg" 
                  alt="KWIZERISEZERANO Profile"
                  className="w-full h-full object-cover object-[50%_30%] scale-125"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-primary-400 transition-colors duration-200 animate-pulse-slow"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  )
}
