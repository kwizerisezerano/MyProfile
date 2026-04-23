'use client'

import { useState } from 'react'
import { ExternalLink, Github, ArrowUpRight, Star, Store, BarChart3 } from 'lucide-react'
import { useTheme } from './ThemeProvider'

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  link: string
  github?: string
  featured: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Leazi',
    description: 'Next-Generation Property Management SaaS Platform',
    longDescription: 'Leazi is the next-generation property management SaaS platform that revolutionizes how you manage properties, tenants, and financial operations. Built with cutting-edge microservices architecture, Leazi offers unmatched scalability, security, and performance for property management professionals worldwide.',
    image: '/images/projects/leazi.jpg',
    tags: ['SaaS', 'Microservices', 'React', 'Node.js', 'MongoDB'],
    link: 'https://leazi.io/',
    featured: true
  },
  {
    id: 2,
    title: 'GECO Rwanda',
    description: 'Leading Epilepsy Care Since 2010',
    longDescription: 'GECO RWANDA is dedicated to providing comprehensive epilepsy care, fighting stigma, and building inclusive communities across Rwanda. Transforming lives through compassionate care since 2010.',
    image: '/images/projects/gecorwanda.jpg',
    tags: ['Healthcare', 'React', 'Next.js', 'Non-profit'],
    link: 'https://www.gecorwanda.com/',
    featured: true
  },
  {
    id: 3,
    title: 'Tontine MIS (TMIS)',
    description: 'Tontine Management Information System',
    longDescription: 'A comprehensive Tontine Management Information System built with Nuxt.js framework. Streamlines tontine operations, member management, and financial tracking for community savings groups.',
    image: '/images/projects/tmis.jpg',
    tags: ['Nuxt.js', 'Vue.js', 'TypeScript', 'PostgreSQL'],
    link: '#',
    github: '#',
    featured: true
  },
  {
    id: 4,
    title: 'Menya-Tech',
    description: 'Technology & Innovation Education Platform',
    longDescription: 'A comprehensive learning platform for technology and innovation education, supporting Software Development (SOD), Networking, Multimedia, University modules, and Technical Diploma programs.',
    image: '/images/projects/menyatech.jpg',
    tags: ['Education', 'LMS', 'React', 'Node.js', 'MongoDB'],
    link: '#',
    featured: true
  },
  {
    id: 5,
    title: 'Market Spot MIS',
    description: 'Market Management Information System',
    longDescription: 'Smart market management system for tracking vendors, stalls, payments, and market operations efficiently.',
    image: '/images/projects/marketspot.jpg',
    tags: ['MIS', 'React', 'Node.js', 'MySQL'],
    link: '#',
    featured: false
  },
  {
    id: 6,
    title: 'Smart Market MIS',
    description: 'Intelligent Market Management Solution',
    longDescription: 'Feature-rich market management system with analytics, vendor portal, and automated reporting capabilities.',
    image: '/images/projects/smartmarket.jpg',
    tags: ['MIS', 'Analytics', 'React', 'Firebase'],
    link: '#',
    featured: false
  }
]

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const featuredProjects = projects.filter(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  return (
    <section id="projects" className={`py-20 ${isDark ? 'bg-dark-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto rounded-full mb-6" />
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Showcasing my work on innovative platforms that solve real-world problems 
            and deliver exceptional user experiences.
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden border transition-all duration-300 ${isDark ? 'bg-dark-800 border-dark-700 hover:border-primary-500/50' : 'bg-white border-gray-200 hover:border-primary-500/50 shadow-lg'}`}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Project Image */}
              <div className={`relative min-h-[200px] max-h-[300px] overflow-hidden ${isDark ? 'bg-dark-800' : 'bg-gray-100'}`}>
                {/* Actual Project Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto max-h-[300px] object-contain mx-auto group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to gradient if image fails to load
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = parent.querySelector('.image-fallback');
                      if (fallback) fallback.classList.remove('hidden');
                    }
                  }}
                />
                {/* Fallback Gradient (shown if image fails) */}
                <div 
                  className="image-fallback hidden absolute inset-0 w-full h-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, 
                      hsl(${150 + project.id * 30}, 60%, 30%) 0%, 
                      hsl(${180 + project.id * 20}, 50%, 25%) 100%)`
                  }}
                >
                  <div className="text-center">
                    <div 
                      className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center shadow-xl"
                      style={{
                        background: `linear-gradient(135deg, 
                          hsl(${120 + project.id * 40}, 70%, 50%) 0%, 
                          hsl(${160 + project.id * 30}, 60%, 40%) 100%)`
                      }}
                    >
                      <span className="text-4xl font-bold text-white">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pb-14">
                <div className="flex items-start justify-between mb-3">
                  <h3 className={`text-xl font-bold group-hover:text-primary-400 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg transition-all ${isDark ? 'bg-dark-700 hover:bg-primary-500/20 text-primary-400 hover:text-primary-300' : 'bg-gray-100 hover:bg-primary-100 text-primary-600 hover:text-primary-700'}`}
                        aria-label="View GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg transition-all ${isDark ? 'bg-dark-700 hover:bg-primary-500/20 text-primary-400 hover:text-primary-300' : 'bg-gray-100 hover:bg-primary-100 text-primary-600 hover:text-primary-700'}`}
                      aria-label="Visit Website"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <p className={`text-sm font-medium mb-2 ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
                  {project.description}
                </p>

                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {project.longDescription}
                </p>
              </div>
              
              {/* Featured Badge - Bottom Right */}
              <div className="absolute bottom-4 right-4">
                <div className="bg-primary-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <Star className="w-3 h-3 text-white" />
                  Featured
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div className="mt-12">
            <h3 className={`text-2xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Other <span className="text-gradient">Projects</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((project) => {
                // Get icon based on project
                const ProjectIcon = project.id === 5 ? Store : project.id === 6 ? BarChart3 : ArrowUpRight;
                
                return (
                <div
                  key={project.id}
                  className={`group flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 ${isDark ? 'bg-dark-800 border-dark-700 hover:border-primary-500/30' : 'bg-white border-gray-200 hover:border-primary-500/50 shadow-sm'}`}
                >
                  <div className={`w-16 h-16 flex items-center justify-center flex-shrink-0 ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
                    <ProjectIcon className="w-8 h-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-semibold group-hover:text-primary-400 transition-colors truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {project.title}
                      </h4>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`transition-colors ${isDark ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'}`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                    <p className={`text-sm font-medium mb-1 ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
                      {project.description}
                    </p>
                    <p className={`text-sm line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {project.longDescription}
                    </p>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA Buttons - Same style in both modes: primary-500 bg, white text */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-medium transition-all duration-300 shadow-lg shadow-primary-500/25"
          >
            Discuss Project
          </a>
          <a
            href="https://github.com/kwizerisezerano"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-medium transition-all duration-300 shadow-lg shadow-primary-500/25"
          >
            <Github className="w-5 h-5" />
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
