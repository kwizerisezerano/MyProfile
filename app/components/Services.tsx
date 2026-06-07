'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Smartphone,
  Globe,
  Palette,
  Code2,
  Shield,
  Database,
  Bug,
  Layers,
} from 'lucide-react'
import { useLanguage } from './LanguageProvider'

export default function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  const services = [
    {
      icon: Smartphone,
      title: t('services.list.android.title'),
      description: t('services.list.android.description'),
    },
    {
      icon: Code2,
      title: t('services.list.application.title'),
      description: t('services.list.application.description'),
    },
    {
      icon: Palette,
      title: t('services.list.web_design.title'),
      description: t('services.list.web_design.description'),
    },
    {
      icon: Globe,
      title: t('services.list.web_dev.title'),
      description: t('services.list.web_dev.description'),
    },
    {
      icon: Layers,
      title: t('services.list.ux.title'),
      description: t('services.list.ux.description'),
    },
    {
      icon: Bug,
      title: t('services.list.testing.title'),
      description: t('services.list.testing.description'),
    },
    {
      icon: Smartphone,
      title: t('services.list.mobile.title'),
      description: t('services.list.mobile.description'),
    },
    {
      icon: Shield,
      title: t('services.list.security.title'),
      description: t('services.list.security.description'),
    },
    {
      icon: Database,
      title: t('services.list.database.title'),
      description: t('services.list.database.description'),
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
      id="services"
      ref={sectionRef}
      className="py-20 sm:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('services.title')} <span className="text-gradient">{t('services.title_highlight')}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto rounded-full mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`glass rounded-xl p-6 group hover:bg-dark-700/50 transition-all duration-300 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-7 h-7 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              const element = document.querySelector('#contact')
              if (element) element.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
          >
            {t('services.cta')}
          </a>
        </div>
      </div>
    </section>
  )
}
