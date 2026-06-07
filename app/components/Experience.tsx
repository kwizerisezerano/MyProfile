'use client'

import { useEffect, useRef, useState } from 'react'
import { Briefcase, GraduationCap, MapPin, Building2 } from 'lucide-react'
import { useLanguage } from './LanguageProvider'

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  const experiences = [
    // Work Experience
    {
      type: 'work',
      title: t('experience.items.qonics.title'),
      company: t('experience.items.qonics.company'),
      location: t('experience.items.qonics.location'),
      period: t('experience.items.qonics.period'),
      description: t('experience.items.qonics.description'),
      skills: [t('experience.skill_tags.golang'), t('experience.skill_tags.docker'), t('experience.skill_tags.postgresql'), t('experience.skill_tags.redis')],
    },
    
    // Education (Most Recent First)
    {
      type: 'study',
      title: t('experience.items.ukigali.title'),
      company: t('experience.items.ukigali.company'),
      location: t('experience.items.ukigali.location'),
      period: t('experience.items.ukigali.period'),
      description: t('experience.items.ukigali.description'),
      skills: [t('experience.skill_tags.software_engineering'), t('experience.skill_tags.database_systems'), t('experience.skill_tags.network_security')],
    },
    {
      type: 'study',
      title: t('experience.items.tumba.title'),
      company: t('experience.items.tumba.company'),
      location: t('experience.items.tumba.location'),
      period: t('experience.items.tumba.period'),
      description: t('experience.items.tumba.description'),
      skills: [t('experience.skill_tags.programming'), t('experience.skill_tags.it_systems'), t('experience.skill_tags.database_management'), t('experience.skill_tags.networking')],
    },
    {
      type: 'study',
      title: t('experience.items.muhura_study.title'),
      company: t('experience.items.muhura_study.company'),
      location: t('experience.items.muhura_study.location'),
      period: t('experience.items.muhura_study.period'),
      description: t('experience.items.muhura_study.description'),
      skills: [t('experience.skill_tags.software_development'), t('experience.skill_tags.networking'), t('experience.skill_tags.database'), t('experience.skill_tags.teamwork')],
    },
    
    // Teaching Experience
    {
      type: 'education',
      title: t('experience.items.muhura_teach.title'),
      company: t('experience.items.muhura_teach.company'),
      location: t('experience.items.muhura_teach.location'),
      period: t('experience.items.muhura_teach.period'),
      description: t('experience.items.muhura_teach.description'),
      skills: [t('experience.skill_tags.teaching'), t('experience.skill_tags.networking'), t('experience.skill_tags.programming_basics')],
    },
    {
      type: 'education',
      title: t('experience.items.bright.title'),
      company: t('experience.items.bright.company'),
      location: t('experience.items.bright.location'),
      period: t('experience.items.bright.period'),
      description: t('experience.items.bright.description'),
      skills: [t('experience.skill_tags.education'), t('experience.skill_tags.networking'), t('experience.skill_tags.code_teaching')],
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
      id="experience"
      ref={sectionRef}
      className="py-20 sm:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('experience.title')} <span className="text-gradient">{t('experience.title_highlight')}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto rounded-full mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </div>

        {/* Work, Teaching & Education Sections */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch">
            {/* Work & Teaching Column */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-primary-400" />
                {t('experience.sections.work')}
              </h3>
              <div className="flex-1 flex flex-col gap-6">
                {experiences.filter(exp => exp.type === 'work' || exp.type === 'education').map((exp, index) => (
                  <div
                    key={index}
                    className={`glass rounded-xl p-5 sm:p-6 hover:bg-dark-700/50 transition-all duration-700 h-full flex flex-col ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center">
                        {exp.type === 'work' ? (
                          <Briefcase className="w-4 h-4 text-primary-400" />
                        ) : (
                          <GraduationCap className="w-4 h-4 text-primary-400" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-primary-400 uppercase tracking-wider">
                        {exp.type === 'work' ? t('experience.types.work') : t('experience.types.teaching')}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-semibold text-white mb-2">{exp.title}</h4>

                    {/* Company/Institution */}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {exp.company}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                      )}
                      {exp.period && (
                        <span className="px-2 py-1 text-xs rounded-full bg-primary-500/20 text-primary-300">
                          {exp.period}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Column */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-primary-400" />
                {t('experience.sections.education')}
              </h3>
              <div className="flex-1 flex flex-col gap-6">
                {experiences.filter(exp => exp.type === 'study').map((exp, index) => (
                  <div
                    key={index}
                    className={`glass rounded-xl p-5 sm:p-6 hover:bg-dark-700/50 transition-all duration-700 h-full flex flex-col ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-primary-400" />
                      </div>
                      <span className="text-sm font-medium text-primary-400 uppercase tracking-wider">
                        {t('experience.types.study')}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-semibold text-white mb-2">{exp.title}</h4>

                    {/* Institution */}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {exp.company}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </span>
                      )}
                      {exp.period && (
                        <span className="px-2 py-1 text-xs rounded-full bg-primary-500/20 text-primary-300">
                          {exp.period}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
