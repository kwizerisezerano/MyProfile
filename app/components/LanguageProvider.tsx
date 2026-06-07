'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import en from '../locales/en.json'
import fr from '../locales/fr.json'
import rw from '../locales/rw.json'
import sw from '../locales/sw.json'
import es from '../locales/es.json'
import hi from '../locales/hi.json'

type Locale = 'en' | 'fr' | 'rw' | 'sw' | 'es' | 'hi'

const dictionaries = {
  en,
  fr,
  rw,
  sw,
  es,
  hi,
}

type Dictionary = typeof en

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  dict: Dictionary
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale
    if (savedLocale && Object.keys(dictionaries).includes(savedLocale)) {
      setLocale(savedLocale)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('locale', locale)
      document.documentElement.lang = locale
    }
  }, [locale, mounted])

  const t = (path: string) => {
    const keys = path.split('.')
    let result: any = dictionaries[locale]
    
    for (const key of keys) {
      if (result[key] === undefined) {
        // Fallback to English
        let fallback: any = dictionaries['en']
        for (const fKey of keys) {
          if (fallback[fKey] === undefined) return path
          fallback = fallback[fKey]
        }
        return fallback
      }
      result = result[key]
    }
    
    return result
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dict: dictionaries[locale] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
