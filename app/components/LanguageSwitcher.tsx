'use client'

import { useLanguage } from './LanguageProvider'
import { useState, useRef, useEffect } from 'react'
import { useTheme } from './ThemeProvider'

const languages = [
  { code: 'en', name: 'English', country: 'us' },
  { code: 'fr', name: 'Français', country: 'fr' },
  { code: 'rw', name: 'Kinyarwanda', country: 'rw' },
  { code: 'sw', name: 'Kiswahili', country: 'tz' },
  { code: 'es', name: 'Español', country: 'es' },
  { code: 'hi', name: 'हिन्दी', country: 'in' },
] as const

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLang = languages.find((l) => l.code === locale) || languages[0]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all border ${
          isDark 
            ? 'bg-dark-800/50 border-dark-700 hover:border-primary-500/50 text-gray-300 hover:text-white' 
            : 'bg-white border-gray-200 hover:border-primary-500/50 text-gray-600 hover:text-primary-600 shadow-sm'
        }`}
        aria-label="Select Language"
      >
        <img 
          src={`https://flagcdn.com/w40/${currentLang.country}.png`} 
          alt=""
          className="w-5 h-3.5 object-cover rounded-sm shadow-sm"
        />
        <span className="text-sm font-medium uppercase">{currentLang.code}</span>
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-48 rounded-xl border shadow-xl z-[60] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 ${
          isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'
        }`}>
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code)
                  setIsOpen(false)
                }}
                className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors ${
                  locale === lang.code
                    ? 'bg-primary-500/10 text-primary-400'
                    : isDark 
                      ? 'text-gray-400 hover:bg-dark-700 hover:text-white' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                }`}
              >
                <img 
                  src={`https://flagcdn.com/w40/${lang.country}.png`} 
                  alt=""
                  className="w-5 h-3.5 object-cover rounded-sm shadow-sm"
                />
                <span className="flex-1 text-left">{lang.name}</span>
                {locale === lang.code && (
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
