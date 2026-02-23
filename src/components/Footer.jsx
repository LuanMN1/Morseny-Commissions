import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import './Footer.css'

export default function Footer() {
  const { language } = useLanguage()
  const t = translations[language].footer

  return (
    <footer id="contato" className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">Morseny Commissions</span>
          <p>{t.brandDesc}</p>
        </div>
        <div className="footer-links">
          <p className="footer-label">{t.contactLabel}</p>
          <p>{t.contactDesc}</p>
          <ul>
            <li><a href="https://www.instagram.com/qiunng_/" target="_blank" rel="noopener noreferrer">{t.instagram}</a></li>
            <li><a href="https://x.com/veeikin_?s=20" target="_blank" rel="noopener noreferrer">{t.twitter}</a></li>
          </ul>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} Morseny Commissions. {t.copy}
        </p>
      </div>
    </footer>
  )
}
