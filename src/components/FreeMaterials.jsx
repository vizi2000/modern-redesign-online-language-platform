import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Download, 
  FileText, 
  BookOpen, 
  Headphones, 
  Video, 
  Star,
  Mail,
  Lock,
  CheckCircle,
  ArrowRight,
  Gift,
  Users,
  Clock,
  Award
} from 'lucide-react'

const FreeMaterials = () => {
  const [downloadedMaterials, setDownloadedMaterials] = useState(new Set())
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  const materials = [
    {
      id: 1,
      title: '1000 najważniejszych słów - Angielski',
      description: 'Lista najczęściej używanych słów w języku angielskim z przykładami użycia',
      type: 'PDF',
      size: '2.3 MB',
      icon: <FileText className="w-8 h-8" />,
      language: 'Angielski',
      level: 'A1-B2',
      downloads: 2847,
      rating: 4.8,
      preview: 'Zawiera słowa podzielone na kategorie tematyczne: dom, praca, podróże...',
      benefits: [
        'Słowa uporządkowane według częstości użycia',
        'Przykłady zdań dla każdego słowa',
        'Transkrypcja fonetyczna',
        'Polskie tłumaczenia'
      ]
    },
    {
      id: 2,
      title: 'Przewodnik po czasach angielskich',
      description: 'Kompletny przewodnik po wszystkich czasach w języku angielskim z ćwiczeniami',
      type: 'PDF',
      size: '4.1 MB',
      icon: <BookOpen className="w-8 h-8" />,
      language: 'Angielski',
      level: 'A2-C1',
      downloads: 1923,
      rating: 4.9,
      preview: 'Present Simple, Past Perfect, Future Continuous - wszystko jasno wytłumaczone',
      benefits: [
        '16 czasów angielskich z przykładami',
        '50 ćwiczeń praktycznych',
        'Tabele porównawcze',
        'Wskazówki kiedy używać każdego czasu'
      ]
    },
    {
      id: 3,
      title: 'Rozmówki francuskie - PDF + Audio',
      description: 'Podstawowe zwroty francuskie z nagraniami native speakera',
      type: 'PDF + MP3',
      size: '15.7 MB',
      icon: <Headphones className="w-8 h-8" />,
      language: 'Francuski',
      level: 'A1-A2',
      downloads: 1456,
      rating: 4.7,
      preview: 'Bonjour, comment allez-vous? - naucz się podstawowych zwrotów',
      benefits: [
        '200+ przydatnych zwrotów',
        'Nagrania native speakera',
        'Wymowa zapisana fonetycznie',
        'Sytuacje: restauracja, hotel, sklep'
      ]
    },
    {
      id: 4,
      title: 'Niemiecki od podstaw - Starter Pack',
      description: 'Pakiet startowy do nauki niemieckiego: alfabet, liczby, podstawowe słowa',
      type: 'PDF',
      size: '3.2 MB',
      icon: <Award className="w-8 h-8" />,
      language: 'Niemiecki',
      level: 'A1',
      downloads: 1089,
      rating: 4.6,
      preview: 'Guten Tag! Wie heißen Sie? - pierwsze kroki w niemieckim',
      benefits: [
        'Alfabet niemiecki z wymową',
        'Liczby od 1 do 1000',
        '300 podstawowych słów',
        'Pierwsze rozmowy'
      ]
    },
    {
      id: 5,
      title: 'Hiszpańskie czasowniki nieregularne',
      description: 'Lista 100 najważniejszych czasowników nieregularnych w hiszpańskim',
      type: 'PDF',
      size: '1.8 MB',
      icon: <FileText className="w-8 h-8" />,
      language: 'Hiszpański',
      level: 'A2-B2',
      downloads: 987,
      rating: 4.8,
      preview: 'Ser, estar, tener, hacer - opanuj nieregularne czasowniki',
      benefits: [
        '100 czasowników z odmianą',
        'Przykłady użycia',
        'Grupowanie według podobieństw',
        'Ćwiczenia do zapamiętania'
      ]
    },
    {
      id: 6,
      title: 'Włoska wymowa - Video Guide',
      description: 'Przewodnik wideo po włoskiej wymowie z ćwiczeniami',
      type: 'MP4',
      size: '45.3 MB',
      icon: <Video className="w-8 h-8" />,
      language: 'Włoski',
      level: 'A1-B1',
      downloads: 756,
      rating: 4.9,
      preview: 'Ciao bella! Naucz się pięknej włoskiej wymowy',
      benefits: [
        '30-minutowy kurs wideo',
        'Ćwiczenia artykulacyjne',
        'Najczęstsze błędy Polaków',
        'Porady od native speakera'
      ]
    }
  ]

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    if (email.includes('@')) {
      setEmailSubmitted(true)
      // Here you would integrate with EmailJS or your email service
      console.log('Email submitted:', email)
    }
  }

  const handleDownload = (materialId, materialTitle) => {
    if (!emailSubmitted) {
      alert('Najpierw podaj swój email, aby otrzymać dostęp do materiałów!')
      return
    }
    
    setDownloadedMaterials(prev => new Set(prev).add(materialId))
    
    // Track download event for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'file_download', {
        event_category: 'lead_magnet',
        event_label: materialTitle,
        value: 1
      })
    }
    
    // Simulate download (in real app, this would be actual file download)
    console.log(`Downloading: ${materialTitle}`)
    alert(`Pobieranie rozpoczęte: ${materialTitle}`)
  }

  const totalDownloads = materials.reduce((sum, material) => sum + material.downloads, 0)

  return (
    <section id="materialy" className="py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Gift className="w-12 h-12 text-blue-600 mr-3" />
            <h2 className="text-4xl font-bold text-slate-800">
              Darmowe materiały do nauki
            </h2>
          </div>
          <p className="text-xl text-slate-600 mb-6 max-w-3xl mx-auto">
            Rozpocznij swoją przygodę z językami obcymi dzięki naszym darmowym materiałom. 
            Sprawdzone treści, które pomogą Ci w nauce!
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{totalDownloads.toLocaleString()}</div>
              <div className="text-slate-600">Pobrań</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{materials.length}</div>
              <div className="text-slate-600">Materiałów</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">5</div>
              <div className="text-slate-600">Języków</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-slate-600">Darmowe</div>
            </div>
          </div>
        </div>

        {/* Email Collection Form */}
        {!emailSubmitted ? (
          <div className="max-w-md mx-auto mb-12">
            <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <Lock className="w-12 h-12 mx-auto mb-4 text-blue-100" />
                <h3 className="text-2xl font-bold mb-4">
                  Odbierz darmowe materiały!
                </h3>
                <p className="text-blue-100 mb-6">
                  Podaj swój email, aby otrzymać natychmiastowy dostęp do wszystkich materiałów
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Twój adres email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                  <Button 
                    type="submit"
                    className="w-full bg-white text-blue-600 hover:bg-blue-50 py-3 font-semibold"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Odbierz materiały za darmo
                  </Button>
                </form>
                <p className="text-xs text-blue-200 mt-4">
                  * Materiały zostaną wysłane na podany email. Możesz się wypisać w każdym momencie.
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-md mx-auto mb-12">
            <Card className="bg-green-500 text-white border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">
                  Dostęp odblokoowany! 🎉
                </h3>
                <p className="text-green-100">
                  Teraz możesz pobierać wszystkie materiały. Sprawdź też swoją skrzynkę email!
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Materials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {materials.map((material) => {
            const isDownloaded = downloadedMaterials.has(material.id)
            
            return (
              <Card key={material.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden">
                <div className="relative">
                  {/* Header with icon and badges */}
                  <div className="bg-gradient-to-br from-slate-100 to-blue-100 p-6 text-center relative">
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-blue-500 text-white">
                        {material.type}
                      </Badge>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                      {material.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      {material.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {material.description}
                    </p>
                  </div>
                  
                  <CardContent className="p-6">
                    {/* Material Info */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center">
                          <Award className="w-4 h-4 mr-1" />
                          {material.level}
                        </div>
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-1" />
                          {material.size}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        {material.language}
                      </Badge>
                    </div>
                    
                    {/* Preview */}
                    <div className="mb-4">
                      <p className="text-slate-600 text-sm italic mb-3">
                        "{material.preview}"
                      </p>
                    </div>
                    
                    {/* Benefits */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-800 mb-2">Co znajdziesz w materiale:</h4>
                      <ul className="space-y-1">
                        {material.benefits.slice(0, 2).map((benefit, index) => (
                          <li key={index} className="text-sm text-slate-600 flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between mb-6 text-sm text-slate-500">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {material.downloads} pobrań
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {material.rating}
                      </div>
                    </div>
                    
                    {/* Download Button */}
                    <Button 
                      onClick={() => handleDownload(material.id, material.title)}
                      disabled={!emailSubmitted}
                      className={`w-full transition-all duration-300 ${
                        isDownloaded 
                          ? 'bg-green-500 hover:bg-green-600 text-white' 
                          : emailSubmitted 
                            ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                            : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {isDownloaded ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Pobrano
                        </>
                      ) : emailSubmitted ? (
                        <>
                          <Download className="w-5 h-5 mr-2" />
                          Pobierz teraz
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5 mr-2" />
                          Podaj email aby pobrać
                        </>
                      )}
                    </Button>
                  </CardContent>
                  
                  {isDownloaded && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full p-1">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white border-0 shadow-xl max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold mb-4">
                Chcesz więcej? Zapisz się na lekcje!
              </h3>
              <p className="text-blue-100 mb-6 text-lg">
                Te materiały to dopiero początek! Dołącz do naszych lekcji online 
                i przyspiesz swoją naukę języka z doświadczonym lektorem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => document.getElementById('rezerwacja')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 font-semibold"
                >
                  Umów bezpłatną lekcję próbną
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 font-semibold"
                >
                  Zobacz wszystkie kursy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default FreeMaterials