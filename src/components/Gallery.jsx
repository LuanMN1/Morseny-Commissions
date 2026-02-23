import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import { categories } from '../data/categories'
import ArtCard from './ArtCard'
import './Gallery.css'

// Slots de exemplo por categoria (sem imagem = placeholder). Depois é só adicionar URLs em artItems.
const artItems = {
  personagens: [
    { image: '/artes/eviart1.png', title: '', ratio: '1' },
    { image: '/artes/eviart4.png', title: '', ratio: '1' },
  ],
  outros: [
    { image: '/artes/eviart2.png', title: '', ratio: '1' },
    { image: '/artes/eviart3.png', title: '', ratio: '1' },
  ],
}

export default function Gallery() {
  const { language } = useLanguage()
  const t = translations[language].category

  return (
    <main className="gallery-main">
      {categories.map((cat, index) => {
        const headerOnRight = index % 2 === 0 // personagens → direita, outros → esquerda
        const ct = t[cat.id]
        return (
          <section
            key={cat.id}
            id={cat.slug}
            className={`gallery-section ${headerOnRight ? 'gallery-section--content-right' : 'gallery-section--content-left'}`}
          >
            <div className="section-spacer" aria-hidden="true" />
            <div className="section-content">
              <div id={`${cat.slug}-anchor`} className="section-header section-anchor">
                <h2 className="section-title">{ct?.title ?? cat.title}</h2>
                {(ct?.subtitle ?? cat.subtitle) && (
                  <p className="section-subtitle">{ct?.subtitle ?? cat.subtitle}</p>
                )}
              </div>
              <div className="gallery-grid gallery-grid--2x2">
                {(artItems[cat.id] || []).map((item, i) => (
                  <ArtCard
                    key={`${cat.id}-${i}`}
                    image={item.image}
                    title={item.title}
                    ratio={item.ratio}
                  />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </main>
  )
}
