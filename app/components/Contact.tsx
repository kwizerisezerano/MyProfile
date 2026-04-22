'use client'

import { useEffect, useRef, useState } from 'react'
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'tabitakwizerisezerano@gmail.com',
    href: 'mailto:tabitakwizerisezerano@gmail.com',
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '0790989830',
    href: 'https://wa.me/250790989830',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Available Worldwide',
    href: '#',
  },
]

const socialLinks = [
  { icon: Github, href: 'https://github.com/kwizerisezerano/', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/kwizerisezerano-xxx-127163363/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/Kwizerisezeran1', label: 'X (Twitter)' },
  { icon: Facebook, href: 'https://www.facebook.com/kwizerisezerano.tabitha', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/tabithakwizerisezerano/', label: 'Instagram' },
]

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
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

  const createEmailMessage = (name: string, email: string, message: string) => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    
    return `
PORTFOLIO CONTACT MESSAGE
========================

From: ${name}
Email: ${email}
Date: ${currentDate}

MESSAGE:
-------
${message}

---
This message was sent from your portfolio website
Reply to this email or contact: ${email}
© 2024 KWIZERISEZERANO Portfolio
    `
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Create meaningful email message
    const emailContent = createEmailMessage(formData.name, formData.email, formData.message)
    
    // Simple mailto - works everywhere without server issues
    const subject = `Portfolio Contact: ${formData.name}`
    const mailtoLink = `mailto:tabitakwizerisezerano@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`
    
    // Open email client
    window.open(mailtoLink, '_blank')
    
    // Show success and clear form
    setSubmitStatus('success')
    setFormData({ name: '', email: '', message: '' })
    setIsSubmitting(false)
    
    setTimeout(() => setSubmitStatus('idle'), 3000)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 sm:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto rounded-full mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="glass rounded-2xl p-8 h-full">
              <h3 className="text-2xl font-semibold text-white mb-6">Let's Connect</h3>
              <p className="text-gray-400 mb-8">
                I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!
              </p>

              {/* Contact Details */}
              <div className="space-y-4 mb-8">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl bg-dark-700/50 hover:bg-dark-700 transition-colors duration-200 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors duration-200">
                      <item.icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">{item.label}</div>
                      <div className="text-white font-medium">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <div className="text-sm text-gray-400 mb-4">Follow me on</div>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-dark-700/50 hover:bg-primary-500/20 flex items-center justify-center text-gray-400 hover:text-primary-400 transition-all duration-200"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-dark-700/50 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-dark-700/50 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-dark-700/50 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-600/50 text-white rounded-lg font-medium transition-all duration-200"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                    Failed to send message. Please try again or email me directly at tabitakwizerisezerano@gmail.com
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
