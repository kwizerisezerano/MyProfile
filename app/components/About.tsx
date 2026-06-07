'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Code, GraduationCap, Briefcase, Lightbulb, Users } from 'lucide-react'
import { useLanguage } from './LanguageProvider'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  const highlights = [
    {
      icon: Code,
      title: t('about.highlights.backend.title'),
      description: t('about.highlights.backend.description'),
    },
    {
      icon: Lightbulb,
      title: t('about.highlights.problem_solving.title'),
      description: t('about.highlights.problem_solving.description'),
    },
    {
      icon: Users,
      title: t('about.highlights.mentoring.title'),
      description: t('about.highlights.mentoring.description'),
    },
    {
      icon: Briefcase,
      title: t('about.highlights.experience.title'),
      description: t('about.highlights.experience.description'),
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
      id="about"
      ref={sectionRef}
      className="py-20 sm:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('about.title')} <span className="text-gradient">{t('about.title_highlight')}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* About Text */}
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="glass rounded-2xl p-8">
              <p className="text-gray-300 leading-relaxed mb-6">
                {t('about.subtitle')}
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                {t('about.description1').split('Back-End Developer at Qonics Inc').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && <span className="text-primary-400 font-medium">Back-End Developer at Qonics Inc</span>}
                  </React.Fragment>
                ))}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {t('about.description2').split('Lycee Saint Alexandre Sauli de Muhura').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && <span className="text-primary-400 font-medium">Lycee Saint Alexandre Sauli de Muhura</span>}
                  </React.Fragment>
                ))}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary-400">{t('about.stats.years.value')}</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">{t('about.stats.years.label')}</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary-400">{t('about.stats.projects.value')}</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">{t('about.stats.projects.label')}</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary-400">{t('about.stats.taught.value')}</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">{t('about.stats.taught.label')}</div>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className={`grid sm:grid-cols-2 gap-4 h-full transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="glass rounded-xl p-6 hover:bg-dark-700/50 transition-all duration-300 group h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
