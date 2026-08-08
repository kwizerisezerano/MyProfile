'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Code2, Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useLanguage } from './LanguageProvider'
import LanguageSwitcher from './LanguageSwitcher'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'navigation.home', href: '/' },
  { name: 'navigation.about', href: '/about' },
  { name: 'navigation.skills', href: '/skills' },
  { name: 'navigation.services', href: '/services' },
  { name: 'navigation.projects', href: '/projects' },
  { name: 'navigation.experience', href: '/experience' },
  { name: 'navigation.contributions', href: '/contributions' },
  { name: 'navigation.contact', href: '/contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme, mounted } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
            <Code2 className="w-8 h-8 text-primary-400" />
            <span className="hidden sm:block">KWIZERISEZERANO</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              item.name === 'navigation.contact' ? (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-lg shadow-primary-500/25"
                >
                  {t(item.name)}
                </Link>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`transition-colors duration-200 text-sm font-medium ${
                    pathname === item.href
                      ? 'text-primary-400'
                      : isDark ? 'text-gray-300 hover:text-primary-400' : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  {t(item.name)}
                </Link>
              )
            ))}

            <div className="h-6 w-px bg-dark-700" />
            <LanguageSwitcher />

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${isDark ? 'glass hover:bg-primary-500/20' : 'bg-white border border-gray-200 hover:bg-primary-50 shadow-sm'}`}
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-primary-400" />
                ) : (
                  <Moon className="w-5 h-5 text-primary-600" />
                )
              ) : (
                <Sun className="w-5 h-5 text-primary-400" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${isDark ? 'glass hover:bg-primary-500/20' : 'bg-white border border-gray-200 hover:bg-primary-50 shadow-sm'}`}
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-primary-400" />
                ) : (
                  <Moon className="w-5 h-5 text-primary-600" />
                )
              ) : (
                <Sun className="w-5 h-5 text-primary-400" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            className={`md:hidden mt-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-xl ${
              isDark
                ? 'bg-dark-900/95 border-dark-700'
                : 'bg-white/95 border-gray-200 shadow-gray-300/70'
            }`}
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                item.name === 'navigation.contact' ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="transition-colors duration-200 rounded-lg px-2 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/25"
                  >
                    {t(item.name)}
                  </Link>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`transition-colors duration-200 rounded-lg px-2 py-2 text-sm font-medium ${
                      pathname === item.href
                        ? 'text-primary-400'
                        : isDark ? 'text-gray-300 hover:text-primary-400' : 'text-gray-600 hover:text-primary-600'
                    }`}
                  >
                    {t(item.name)}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
