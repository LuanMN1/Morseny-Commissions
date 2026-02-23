import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import './Hero.css'

export default function Hero() {
  const { language } = useLanguage()
  const t = translations[language].hero

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <p className="hero-tag">{t.tag}</p>
        <h1 className="hero-title">
          {t.title} <em>{t.titleEm}</em>
        </h1>
        <p className="hero-desc">{t.desc}</p>
        <a href="#personagens-anchor" className="hero-cta">
          {t.cta}
        </a>
      </div>
      <div className="hero-visual">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>
    </section>
  )
}
