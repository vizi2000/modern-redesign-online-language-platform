import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router' // Import useRouter
import { Button } from '@/components/ui/button.jsx'
import Chatbot from '@/components/Chatbot.jsx'
import StickyMobileCTA from '@/components/StickyMobileCTA.jsx'
import NewsletterWidget from '@/components/NewsletterWidget.jsx'

import { 
  ChevronDown,
  Menu,
  X,
  BookOpen,
  HelpCircle
} from 'lucide-react'

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const router = useRouter() // Initialize useRouter

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [router.pathname]) // Use router.pathname

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-slate-200/50' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2" aria-label="Akademia Poliglotki - Strona główna">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">
                Akademia Poliglotki
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Strona główna
              </Link>
              <div className="relative group">
                <Link href="/kursy" className="text-slate-700 hover:text-blue-600 transition-colors flex items-center font-medium">
                  Kursy <ChevronDown className="w-4 h-4 ml-1" />
                </Link>
                {/* Dropdown menu */}
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link href="/materialy" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                      Darmowe materiały
                    </Link>
                    <Link href="/test-poziomu" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                      Test poziomu
                    </Link>
                    <Link href="/cennik" className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                      Cennik
                    </Link>
                  </div>
                </div>
              </div>
              <Link href="/blog" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Blog
              </Link>
              <Link href="/dopasowanie" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Dopasowanie
              </Link>
              <Link href="/kontakt" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                Kontakt
              </Link>
              <Link href="/rezerwacja">
                <Button className="bg-gradient-to-r from-slate-700 to-blue-600 hover:from-slate-800 hover:to-blue-700 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm">
                  Umów lekcję próbną
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-200/50">
              <nav className="flex flex-col space-y-4 pt-4">
                <Link href="/" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                  Strona główna
                </Link>
                <Link href="/kursy" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                  Kursy
                </Link>
                <Link href="/blog" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                  Blog
                </Link>
                  <Link href="/dopasowanie" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                    Dopasowanie
                  </Link>
                <Link href="/kontakt" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">
                  Kontakt
                </Link>
                <div className="border-t border-slate-200 pt-4 mt-4">
                  <p className="text-xs text-slate-500 mb-2">Dodatkowe</p>
                  <Link href="/materialy" className="text-slate-600 hover:text-blue-600 transition-colors text-sm block py-1">
                    Darmowe materiały
                  </Link>
                  <Link href="/test-poziomu" className="text-slate-600 hover:text-blue-600 transition-colors text-sm block py-1">
                    Test poziomu
                  </Link>
                  <Link href="/cennik" className="text-slate-600 hover:text-blue-600 transition-colors text-sm block py-1">
                    Cennik
                  </Link>
                </div>
                <Link href="/rezerwacja">
                  <Button className="bg-gradient-to-r from-slate-700 to-blue-600 text-white w-full mt-4">
                    Umów lekcję próbną
                  </Button>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">Akademia Poliglotki</span>
              </div>
              <p className="text-gray-400">Języki obce online, wygodnie, bez stresu</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Oferta językowa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/kursy" className="hover:text-white transition-colors">Język angielski</Link></li>
                <li><Link href="/kursy" className="hover:text-white transition-colors">Język francuski</Link></li>
                <li><Link href="/kursy" className="hover:text-white transition-colors">Język niemiecki</Link></li>
                <li><Link href="/kursy" className="hover:text-white transition-colors">Język hiszpański</Link></li>
                <li><Link href="/kursy" className="hover:text-white transition-colors">Język włoski</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Przejdź do</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">Strona główna</Link></li>
                <li><Link href="/kursy" className="hover:text-white transition-colors">Kursy</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/dopasowanie" className="hover:text-white transition-colors">Dopasowanie</Link></li>
                <li><Link href="/materialy" className="hover:text-white transition-colors">Materiały</Link></li>
                <li><Link href="/kontakt" className="hover:text-white transition-colors">Kontakt</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Kontakt</h3>
              <div className="space-y-2 text-gray-400 mb-6">
                <p>📧 <a href="mailto:kontakt@akademiapoliglotki.pl" className="hover:text-white transition-colors">kontakt@akademiapoliglotki.pl</a></p>
                <p>📱 <a href="tel:+48123456789" className="hover:text-white transition-colors">+48 123 456 789</a></p>
                <p>🌐 <a href="https://www.akademiapoliglotki.pl" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">www.akademiapoliglotki.pl</a></p>
              </div>
              <NewsletterWidget variant="footer" />
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Akademia Poliglotki. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
      
      {/* AI Chatbot */}
      <Chatbot />
      
      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />
    </div>
  )
}

export default Layout