import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import './ArtCard.css'

export default function ArtCard({ image, title, ratio = '1' }) {
  const [loaded, setLoaded] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const { language } = useLanguage()
  const t = translations[language].artCard

  useEffect(() => {
    if (!expanded) return
    const onEscape = (e) => { if (e.key === 'Escape') setExpanded(false) }
    document.addEventListener('keydown', onEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onEscape)
      document.body.style.overflow = ''
    }
  }, [expanded])

  return (
    <>
      <article className="art-card" data-ratio={ratio}>
        <div className="art-card-frame">
          {image ? (
            <>
              <img
                src={image}
                alt={title || t.illustration}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className={loaded ? 'loaded' : ''}
              />
              {title && <span className="art-card-title">{title}</span>}
              <button
                type="button"
                className="art-card-expand"
                onClick={() => setExpanded(true)}
                aria-label={t.expandImage}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
                </svg>
              </button>
            </>
          ) : (
            <div className="art-card-placeholder">
              <svg className="placeholder-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 8v32M8 24h32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>{t.addArt}</span>
            </div>
          )}
        </div>
      </article>

      {expanded && image && (
        <div
          className="art-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Imagem em tamanho maior"
          onClick={() => setExpanded(false)}
        >
          <button
            type="button"
            className="art-lightbox-close"
            onClick={() => setExpanded(false)}
            aria-label={t.close}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="art-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={image} alt={title || t.illustration} />
          </div>
        </div>
      )}
    </>
  )
}
