import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import './Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef(null)
  const { language, setLanguage } = useLanguage()
  const t = translations[language]

  const scrollTo = (id) => {
    const anchorId = ['personagens', 'outros'].includes(id) ? `${id}-anchor` : id
    const el = document.getElementById(anchorId)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  useEffect(() => {
    const close = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  return (
    <header className="header">
      <div className="header-inner">
        <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('hero') }} className="logo">
          <span className="logo-text">Morseny Commissions</span>
        </a>
        <div className="header-right">
          <div className="lang-dropdown" ref={langRef}>
            <button
              type="button"
              className="lang-trigger"
              onClick={() => setLangOpen(!langOpen)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label={t.lang.label}
            >
              <span className="lang-trigger-text">{language === 'pt' ? t.lang.pt : t.lang.en}</span>
              <svg className="lang-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {langOpen && (
              <ul className="lang-menu" role="listbox">
                <li role="option">
                  <button
                    type="button"
                    className={language === 'pt' ? 'active' : ''}
                    onClick={() => { setLanguage('pt'); setLangOpen(false) }}
                  >
                    {t.lang.pt}
                  </button>
                </li>
                <li role="option">
                  <button
                    type="button"
                    className={language === 'en' ? 'active' : ''}
                    onClick={() => { setLanguage('en'); setLangOpen(false) }}
                  >
                    {t.lang.en}
                  </button>
                </li>
              </ul>
            )}
          </div>
          <button
            type="button"
            className="menu-toggle"
            aria-label={language === 'pt' ? 'Abrir menu' : 'Open menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={menuOpen ? 'open' : ''} />
            <span className={menuOpen ? 'open' : ''} />
            <span className={menuOpen ? 'open' : ''} />
          </button>
          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <button type="button" onClick={() => scrollTo('personagens')}>{t.nav.personagens}</button>
            <button type="button" onClick={() => scrollTo('outros')}>{t.nav.outros}</button>
            <button type="button" onClick={() => scrollTo('contato')}>{t.nav.contato}</button>
          </nav>
        </div>
      </div>
    </header>
  )
}
