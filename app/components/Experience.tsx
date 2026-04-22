'use client'

import { useEffect, useRef, useState } from 'react'
import { Briefcase, GraduationCap, MapPin, Building2 } from 'lucide-react'

const experiences = [
  // Work Experience
  {
    type: 'work',
    title: 'Back-End Developer',
    company: 'Qonics Inc',
    location: 'Current Role',
    period: 'Present',
    description: 'Building efficient, secure, and scalable backend systems. Focus on web development, system analysis, and delivering high-quality solutions to support business goals.',
    skills: ['Golang', 'Docker', 'PostgreSQL', 'Redis', 'System Design'],
  },
  
  // Education (Most Recent First)
  {
    type: 'study',
    title: 'Bachelor of Science in IT',
    company: 'University of Kigali',
    location: 'Sep 2025 – Sep 2027',
    period: 'In Progress',
    description: 'Pursuing a Bachelor of Science with Honours in Information Technology, focusing on advanced computing concepts and modern software development practices.',
    skills: ['Software Engineering', 'Database Systems', 'Network Security'],
  },
  {
    type: 'study',
    title: 'Advanced Diploma in IT',
    company: 'RP Tumba',
    location: 'Jan 2021 – May 2025',
    period: 'First Class',
    description: 'Completed Advanced Diploma in Information Technology with First Class honors, gaining comprehensive knowledge in IT systems, programming, and technical problem-solving.',
    skills: ['Programming', 'IT Systems', 'Database Management', 'Networking'],
  },
  {
    type: 'study',
    title: 'Diploma A2 in Software Development',
    company: 'Lycée Sainte Alexandre Sauli de Muhura',
    location: 'Jan 2017 – Jul 2019',
    period: 'Grade: A',
    description: 'Completed Diploma A2 in Software Development with strong foundations in programming, networking, and database management. Developed practical coding skills, problem-solving abilities, and system analysis expertise through hands-on projects and team activities.',
    skills: ['Software Development', 'Networking', 'Database', 'Teamwork'],
  },
  
  // Teaching Experience
  {
    type: 'education',
    title: 'Teacher - Coding & Networking',
    company: 'Lycee Saint Alexandre Sauli de Muhura',
    location: 'Muhura',
    period: '',
    description: 'Taught coding aligned with networking, equipping students with practical skills for real-world technology challenges.',
    skills: ['Teaching', 'Networking', 'Programming Basics', 'Mentoring'],
  },
  {
    type: 'education',
    title: 'Teacher - Coding & Networking',
    company: 'Bright Academy TSS',
    location: '',
    period: '',
    description: 'Delivered comprehensive coding education integrated with networking concepts, preparing students for technology careers.',
    skills: ['Education', 'Networking', 'Code Teaching', 'Curriculum Design'],
  },
]

export default function Experience() {
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
      id="experience"
      ref={sectionRef}
      className="py-20 sm:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Experience & <span className="text-gradient">Education</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto rounded-full mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional journey spanning industry experience and educational contributions.
          </p>
        </div>

        {/* Work, Teaching & Education Sections */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch">
            {/* Work & Teaching Column */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-primary-400" />
                Work & Teaching
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
                        {exp.type === 'work' ? 'Professional' : 'Teaching'}
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
                Education
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
                        Education
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
