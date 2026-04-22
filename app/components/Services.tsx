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

const services = [
  {
    icon: Smartphone,
    title: 'Android Development',
    description: 'Building native Android applications with modern frameworks and best practices for optimal performance.',
  },
  {
    icon: Code2,
    title: 'Application Development',
    description: 'Custom software solutions tailored to your business needs, from concept to deployment.',
  },
  {
    icon: Palette,
    title: 'Web Design',
    description: 'Creating visually appealing and user-friendly website designs that capture your brand identity.',
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Full-stack web development with focus on scalable backend systems and responsive frontends.',
  },
  {
    icon: Layers,
    title: 'User Experience Design',
    description: 'Designing intuitive user interfaces and experiences that drive engagement and satisfaction.',
  },
  {
    icon: Bug,
    title: 'Software Testing',
    description: 'Comprehensive testing services ensuring quality, reliability, and performance of your applications.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Cross-platform and native mobile applications for iOS and Android devices.',
  },
  {
    icon: Shield,
    title: 'Information Security',
    description: 'Implementing security best practices to protect your applications and data from threats.',
  },
  {
    icon: Database,
    title: 'Database Development',
    description: 'Designing and optimizing database architectures for performance, scalability, and reliability.',
  },
]

export default function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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
            Services <span className="text-gradient">Offered</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto rounded-full mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive software development services tailored to meet your business needs and drive innovation.
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
            Discuss Your Project
          </a>
        </div>
      </div>
    </section>
  )
}
