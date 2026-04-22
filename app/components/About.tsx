'use client'

import { useEffect, useRef, useState } from 'react'
import { Code, GraduationCap, Briefcase, Lightbulb, Users } from 'lucide-react'

const highlights = [
  {
    icon: Code,
    title: 'Back-End Development',
    description: 'Building efficient, secure, and scalable systems using modern frameworks and databases',
  },
  {
    icon: Lightbulb,
    title: 'Problem Analysis',
    description: 'Strong debugging skills and creative problem-solving abilities',
  },
  {
    icon: Users,
    title: 'Teaching & Mentoring',
    description: 'Sharing knowledge in coding and networking at academic institutions',
  },
  {
    icon: Briefcase,
    title: 'Industry Experience',
    description: 'Working with both academic institutions and industry projects',
  },
]

export default function About() {
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
      id="about"
      ref={sectionRef}
      className="py-20 sm:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* About Text */}
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="glass rounded-2xl p-8">
              <p className="text-gray-300 leading-relaxed mb-6">
                I am a passionate <span className="text-primary-400 font-medium">Software Developer</span> with hands-on experience in Back-End Development, problem-solving, and teaching coding. My technical expertise spans across multiple technologies including Golang, Python, PHP, Docker, Redis, PostgreSQL, MySQL, JavaScript, HTML, and CSS.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Currently, I am working as a <span className="text-primary-400 font-medium">Back-End Developer at Qonics Inc</span>, where I focus on building efficient, secure, and scalable systems. My role involves backend web development, system analysis, and delivering high-quality solutions to support business goals.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Alongside development, I also enjoy sharing knowledge. As a Teacher at <span className="text-primary-400 font-medium">Lycee Saint Alexandre Sauli de Muhura</span> and <span className="text-primary-400 font-medium">Bright Academy TSS</span>, I taught coding aligned with networking, equipping students with practical skills to prepare them for real-world challenges in technology.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary-400">5+</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Years Experience</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary-400">20+</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Projects Completed</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary-400">2</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">Institutions Taught</div>
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
