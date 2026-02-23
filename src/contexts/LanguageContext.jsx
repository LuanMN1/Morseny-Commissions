import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'evii-art-lang'

const LanguageContext = createContext({ language: 'pt', setLanguage: () => {} })

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'pt'
    } catch {
      return 'pt'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language)
      document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR'
    } catch {}
  }, [language])

  const setLanguage = (lang) => setLanguageState(lang)

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
