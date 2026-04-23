'use client'

import { Code2, Heart, Github, Linkedin, Mail, ArrowUp, Twitter, Facebook, Instagram } from 'lucide-react'

const currentYear = new Date().getFullYear()

const footerLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Services', href: '#services' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#footer' },
]

const socialLinks = [
  { icon: Github, href: 'https://github.com/kwizerisezerano/', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/kwizerisezerano-xxx-127163363/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/Kwizerisezeran1', label: 'X (Twitter)' },
  { icon: Facebook, href: 'https://www.facebook.com/kwizerisezerano.tabitha', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/tabithakwizerisezerano/', label: 'Instagram' },
  { icon: Mail, href: 'mailto:tabitakwizerisezerano@gmail.com', label: 'Email' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="footer" className="py-12 border-t border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <Code2 className="w-8 h-8 text-primary-400" />
              KWIZERISEZERANO
            </a>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              Software Developer specializing in Backend Development with expertise in Golang, Python, Node.js, and cloud technologies. Building scalable, secure, and efficient systems.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-dark-700/50 hover:bg-primary-500/30 flex items-center justify-center text-primary-400 hover:text-primary-300 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.querySelector(link.href)
                      if (element) element.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Back End Developer</li>
              <li>Qonics Inc</li>
              <li>
                <a href="https://wa.me/250790989830" className="hover:text-primary-400 transition-colors duration-200">
                  WhatsApp: 0790989830
                </a>
              </li>
              <li>
                <a href="mailto:tabitakwizerisezerano@gmail.com" className="hover:text-primary-400 transition-colors duration-200">
                  tabitakwizerisezerano@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 flex items-center gap-1">
            © {currentYear} KWIZERISEZERANO. Made with{' '}
            <Heart className="w-4 h-4 text-primary-400 fill-current" /> and code.
          </p>
          
          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200"
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
