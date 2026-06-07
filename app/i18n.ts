import 'server-only'

const dictionaries = {
  en: () => import('./locales/en.json').then((module) => module.default),
  fr: () => import('./locales/fr.json').then((module) => module.default),
  rw: () => import('./locales/rw.json').then((module) => module.default),
  sw: () => import('./locales/sw.json').then((module) => module.default),
  es: () => import('./locales/es.json').then((module) => module.default),
  hi: () => import('./locales/hi.json').then((module) => module.default),
}

export const getDictionary = async (locale: keyof typeof dictionaries) => {
  return dictionaries[locale]()
}
