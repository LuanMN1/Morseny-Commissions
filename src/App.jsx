import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Footer from './components/Footer'

export default function App() {
  return (
    <LanguageProvider>
      <Header />
      <Hero />
      <div className="section-separator" aria-hidden="true">
        <img src="/separador/separador.png" alt="" />
      </div>
      <Gallery />
      <Footer />
    </LanguageProvider>
  )
}
