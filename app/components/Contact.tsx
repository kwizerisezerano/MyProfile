'use client'

import { useEffect, useRef, useState } from 'react'
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useLanguage } from './LanguageProvider'

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { theme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'

  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.labels.email'),
      value: 'tabitakwizerisezerano@gmail.com',
      href: 'mailto:tabitakwizerisezerano@gmail.com',
    },
    {
      icon: Phone,
      label: t('contact.labels.phone'),
      value: '+250 790 989 830',
      href: 'https://wa.me/250790989830?text=Hi%20KWIZERISEZERANO%2C%20I%20visited%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project%20with%20you.',
    },
    {
        icon: MapPin,
        label: t('contact.labels.location'),
        value: t('contact.location_value'),
        href: 'https://www.google.com/maps/place/KWIZERISEZERANO/@-1.9395561,30.130194,1086m/data=!3m1!1e3!4m14!1m7!3m6!1s0x19dca75a688649f1:0x42ab5f708ad476c4!2sKWIZERISEZERANO!8m2!3d-1.9395615!4d30.1327689!16s%2Fg%2F11zfmdxw3v!3m5!1s0x19dca75a688649f1:0x42ab5f708ad476c4!8m2!3d-1.9395615!4d30.1327689!16s%2Fg%2F11zfmdxw3v?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D',
      },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 sm:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Get in touch header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary-400" />
            </div>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('contact.title')} <span className="text-primary-400">{t('contact.title_highlight')}</span>
            </h2>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className={`p-6 rounded-xl border transition-all duration-200 group ${isDark ? 'bg-dark-800 border-dark-700 hover:border-primary-500/30' : 'bg-white border-gray-200 hover:border-primary-500/50 shadow-sm'}`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${isDark ? 'bg-dark-700 group-hover:bg-primary-500/20' : 'bg-primary-50 group-hover:bg-primary-100'}`}>
                  <item.icon className="w-5 h-5 text-primary-400" />
                </div>
                <div className={`text-xs uppercase tracking-wider mb-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{item.label}</div>
                <div className={`font-medium text-sm break-words ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.value}</div>
              </a>
            ))}
          </div>

          {/* WhatsApp Button - Same style in both modes: primary-500 bg, white text */}
          <a
            href="https://wa.me/250790989830?text=Hi%20KWIZERISEZERANO%2C%20I%20visited%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 font-medium rounded-lg transition-colors duration-200 bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/25"
          >
            <MessageCircle className="w-5 h-5" />
            {t('contact.whatsapp')}
          </a>
        </div>
      </div>
    </section>
  )
}
