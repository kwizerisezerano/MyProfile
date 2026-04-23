'use client'

import { useEffect, useRef, useState } from 'react'

const skillCategories = [
  {
    name: 'Backend Development',
    skills: [
      { name: 'Golang', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'PHP', level: 80 },
      { name: 'Node.js', level: 85 },
      { name: 'Fiber', level: 85 },
    ],
  },
  {
    name: 'Databases',
    skills: [
      { name: 'PostgreSQL', level: 90 },
      { name: 'MySQL', level: 85 },
      { name: 'Redis', level: 75 },
      { name: 'MongoDB', level: 70 },
    ],
  },
  {
    name: 'DevOps & Tools',
    skills: [
      { name: 'Docker', level: 80 },
      { name: 'Git', level: 90 },
      { name: 'Linux', level: 75 },
      { name: 'CI/CD', level: 70 },
    ],
  },
  {
    name: 'Technical Expertise',
    skills: [
      { name: 'React', level: 88 },
      { name: 'Next.js', level: 85 },
      { name: 'Nuxt.js', level: 75 },
      { name: 'Vue.js', level: 75 },
      { name: 'TypeScript', level: 80 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'State Management', level: 82 },
      { name: 'Flutter', level: 70 },
      { name: 'Node.js', level: 85 },
      { name: 'MongoDB', level: 78 },
      { name: 'API Integration', level: 92 },
      { name: 'UI/UX Design', level: 75 },
      { name: 'Git & Version Control', level: 90 },
    ],
  },
]

const jobTitles = [
  'Back End Developer',
  'Software Developer',
  'Application Developer',
  'Senior Software Development Engineer',
  'Software Test Engineer',
]

export default function Skills() {
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
      id="skills"
      ref={sectionRef}
      className="py-20 sm:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto rounded-full mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Expertise across multiple technologies and frameworks, with a focus on backend development and scalable system architecture.
          </p>
        </div>

        {/* Job Titles */}
        <div className={`flex flex-wrap justify-center gap-3 mb-16 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {jobTitles.map((title) => (
            <span
              key={title}
              className="px-4 py-2 rounded-full glass text-sm text-primary-300 border border-primary-500/20"
            >
              {title}
            </span>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.name}
              className={`glass rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${(categoryIndex + 1) * 100}ms` }}
            >
              <h3 className="text-xl font-semibold text-white mb-6">{category.name}</h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 text-sm">{skill.name}</span>
                      <span className="text-primary-400 text-sm font-medium">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-700 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${(categoryIndex + 1) * 100 + 200}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Top Skills */}
        <div className={`mt-16 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-center text-xl font-semibold text-white mb-8">Top Skills</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              'Back-End Web Development',
              'Back-end Operations',
              'Web Application Development',
              'Creative Problem Solving',
              'Problem Analysis',
            ].map((skill, index) => (
              <div
                key={skill}
                className="glass rounded-xl p-5 text-center hover:bg-primary-600/10 transition-all duration-300 group"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-500/30 transition-colors">
                  <span className="text-primary-400 font-bold text-lg">{index + 1}</span>
                </div>
                <span className="text-white font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
