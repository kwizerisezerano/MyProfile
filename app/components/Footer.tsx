'use client'

import React from 'react'
import { Code2, Heart, Github, Linkedin, Mail, ArrowUp, X, Facebook, Instagram } from 'lucide-react'
import { useLanguage } from './LanguageProvider'

const currentYear = new Date().getFullYear()

export default function Footer() {
  const { t } = useLanguage()

  const footerLinks = [
    { name: t('navigation.home'), href: '#home' },
    { name: t('navigation.about'), href: '#about' },
    { name: t('navigation.experience'), href: '#experience' },
    { name: t('navigation.projects'), href: '#projects' },
    { name: t('navigation.contact'), href: '#contact' },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/kwizerisezerano/', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/kwizerisezerano-xxx-127163363/', label: 'LinkedIn' },
    { icon: X, href: 'https://x.com/Kwizerisezeran1', label: 'X (Twitter)' },
    { icon: Facebook, href: 'https://www.facebook.com/kwizerisezerano.tabitha', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/tabithakwizerisezerano/', label: 'Instagram' },
    { icon: Mail, href: 'mailto:tabitakwizerisezerano@gmail.com', label: 'Email' },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="footer" className="py-12 border-t border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <a 
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="text-2xl font-bold text-white mb-4 block"
            >
              {t('navigation.home_name')}
            </a>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              {t('footer.description')}
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
            <h4 className="text-white font-semibold mb-4">{t('footer.quick_links')}</h4>
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

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.connect')}</h4>
            <p className="text-sm text-gray-400 mb-4">
              {t('footer.connect_desc')}
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              {t('footer.get_in_touch')}
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 flex items-center gap-1">
            {t('footer.copyright').replace('{year}', currentYear.toString()).split('Heart').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && <Heart className="w-4 h-4 text-primary-400 fill-current" />}
              </React.Fragment>
            ))}
          </p>
          
          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200"
          >
            {t('footer.back_to_top')}
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
