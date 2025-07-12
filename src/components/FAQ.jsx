import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { ChevronDown, ChevronUp, Search, MessageCircle, Clock, CreditCard, BookOpen, Users, Award } from 'lucide-react'

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Wszystkie', icon: MessageCircle },
    { id: 'courses', name: 'Kursy', icon: BookOpen },
    { id: 'payments', name: 'Płatności', icon: CreditCard },
    { id: 'technology', name: 'Technologia', icon: Clock },
    { id: 'methods', name: 'Metodologia', icon: Award },
    { id: 'general', name: 'Ogólne', icon: Users }
  ]

  const faqData = [
    {
      id: 1,
      category: 'courses',
      question: 'Jakie języki mogę się uczyć w Akademii Poliglotki?',
      answer: 'Oferujemy kursy pięciu języków: angielskiego, francuskiego, niemieckiego, hiszpańskiego i włoskiego. Wszystkie kursy są dostępne na każdym poziomie zaawansowania - od całkowitych początkujących (A1) do zaawansowanych (C2).',
      popular: true
    },
    {
      id: 2,
      category: 'courses',
      question: 'Jak długo trwa jeden kurs?',
      answer: 'Długość kursu zależy od Twoich celów i dostępności. Standardowy kurs to 20-30 lekcji, co przy regularnych zajęciach (2-3 razy w tygodniu) zajmuje około 3-4 miesięcy. Możesz jednak uczyć się w swoim tempie.',
      popular: true
    },
    {
      id: 3,
      category: 'payments',
      question: 'Ile kosztują lekcje?',
      answer: 'Standardowa cena lekcji indywidualnej to 199 zł za 60 minut. Oferujemy także pakiety 5, 10 i 20 lekcji z progresywnymi rabatami. Pierwsza lekcja próbna jest zawsze bezpłatna.',
      popular: true
    },
    {
      id: 4,
      category: 'payments',
      question: 'Jakie formy płatności akceptujecie?',
      answer: 'Akceptujemy płatności przelewem bankowym, kartą płatniczą (Visa, Mastercard), BLIK oraz PayPal. Możliwe są również płatności ratalne przy pakietach 10+ lekcji.',
      popular: false
    },
    {
      id: 5,
      category: 'technology',
      question: 'Czego potrzebuję do lekcji online?',
      answer: 'Potrzebujesz jedynie komputera/tabletu z dostępem do internetu, kamery i mikrofonu. Używamy platform Zoom lub Google Meet - nie musisz niczego instalować. Wszystkie materiały dostarczamy elektronicznie.',
      popular: true
    },
    {
      id: 6,
      category: 'technology',
      question: 'Co jeśli mam problemy techniczne podczas lekcji?',
      answer: 'Nasza nauczycielka pomoże Ci rozwiązać podstawowe problemy techniczne. W przypadku dłuższych problemów lekcja zostanie przełożona bez dodatkowych kosztów. Oferujemy także test techniczny przed pierwszą lekcją.',
      popular: false
    },
    {
      id: 7,
      category: 'methods',
      question: 'Jaka jest metodologia nauczania w Akademii Poliglotki?',
      answer: 'Stosujemy komunikacyjne podejście do nauki języków z naciskiem na praktyczne używanie języka. Lekcje są interaktywne, z dużą ilością konwersacji, ale nie pomijamy gramatyki. Dostosowujemy metody do Twojego stylu nauki.',
      popular: true
    },
    {
      id: 8,
      category: 'methods',
      question: 'Czy otrzymam materiały do nauki?',
      answer: 'Tak! Po każdej lekcji otrzymujesz spersonalizowane materiały: notatki z lekcji, ćwiczenia, listy słówek i zadania domowe. Korzystamy z najlepszych podręczników i tworzymy własne materiały.',
      popular: false
    },
    {
      id: 9,
      category: 'general',
      question: 'Czy mogę zmienić termin lekcji?',
      answer: 'Tak, możesz zmienić termin lekcji z 24-godzinnym wyprzedzeniem bez dodatkowych kosztów. Odwołania w krótszym czasie są możliwe w wyjątkowych sytuacjach.',
      popular: false
    },
    {
      id: 10,
      category: 'general',
      question: 'Czy prowadzicie lekcje dla dzieci?',
      answer: 'Obecnie specjalizujemy się w nauczaniu dorosłych (16+). Dla młodzieży 16-18 lat oferujemy specjalne programy przygotowawcze do egzaminów maturalnych i międzynarodowych.',
      popular: false
    },
    {
      id: 11,
      category: 'courses',
      question: 'Jak sprawdzicie mój poziom języka?',
      answer: 'Przed rozpoczęciem kursu przeprowadzamy bezpłatny test poziomowania, który obejmuje sprawdzenie umiejętności mówienia, słuchania, czytania i pisania. Na tej podstawie dobieramy odpowiedni program nauki.',
      popular: true
    },
    {
      id: 12,
      category: 'general',
      question: 'Czy wystawiacie certyfikaty ukończenia kursu?',
      answer: 'Tak, po ukończeniu kursu otrzymujesz certyfikat potwierdzający Twój poziom i liczbę godzin nauki. Certyfikat może być przydatny przy aplikacjach do pracy lub na studia.',
      popular: false
    },
    {
      id: 13,
      category: 'courses',
      question: 'Czy oferujecie kursy biznesowe?',
      answer: 'Tak! Mamy specjalne programy biznesowe dla każdego z oferowanych języków. Skupiamy się na terminologii branżowej, prowadzeniu prezentacji, negocjacjach i komunikacji w środowisku międzynarodowym.',
      popular: false
    },
    {
      id: 14,
      category: 'methods',
      question: 'Czy lekcje są dostosowane do moich potrzeb?',
      answer: 'Absolutnie! Każdy program jest indywidualnie dostosowany do Twoich celów, poziomu, zainteresowań i stylu nauki. Przed rozpoczęciem kursu omawiamy Twoje oczekiwania i tworzymy spersonalizowany plan.',
      popular: true
    },
    {
      id: 15,
      category: 'payments',
      question: 'Czy oferujecie zwrot pieniędzy?',
      answer: 'Jeśli nie jesteś zadowolony po pierwszej płatnej lekcji, zwracamy 100% kosztów. Dla pakietów oferujemy proporcjonalny zwrot za niewykorzystane lekcje przy rezygnacji z ważnych powodów.',
      popular: false
    }
  ]

  const filteredFAQ = faqData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const popularFAQ = faqData.filter(item => item.popular)

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-16 px-4 bg-slate-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Najczęściej zadawane pytania
          </h2>
          <p className="text-xl text-slate-600">
            Znajdź odpowiedzi na najważniejsze pytania dotyczące nauki języków w Akademii Poliglotki
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Szukaj w FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 border border-slate-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Popular Questions (only show when no search/filter) */}
        {searchTerm === '' && selectedCategory === 'all' && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
              Najpopularniejsze pytania
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {popularFAQ.map((item, index) => (
                <Card 
                  key={`popular-${item.id}`}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => toggleAnswer(`popular-${item.id}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 mb-2 pr-4">
                          {item.question}
                        </h4>
                        {activeIndex === `popular-${item.id}` && (
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {item.answer}
                          </p>
                        )}
                      </div>
                      <div className="ml-2">
                        {activeIndex === `popular-${item.id}` ? (
                          <ChevronUp className="w-5 h-5 text-blue-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Questions */}
        <div>
          {searchTerm !== '' || selectedCategory !== 'all' ? (
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Wyniki wyszukiwania ({filteredFAQ.length})
            </h3>
          ) : (
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
              Wszystkie pytania i odpowiedzi
            </h3>
          )}
          
          <div className="space-y-4">
            {filteredFAQ.length > 0 ? (
              filteredFAQ.map((item, index) => (
                <Card 
                  key={item.id}
                  className="bg-white/80 backdrop-blur-xl border border-slate-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => toggleAnswer(item.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {item.popular && (
                            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                              Popularne
                            </span>
                          )}
                          <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">
                            {categories.find(cat => cat.id === item.category)?.name}
                          </span>
                        </div>
                        <h4 className="font-semibold text-slate-800 mb-2 pr-4">
                          {item.question}
                        </h4>
                        {activeIndex === item.id && (
                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <p className="text-slate-600 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {activeIndex === item.id ? (
                          <ChevronUp className="w-5 h-5 text-blue-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50">
                <CardContent className="p-8 text-center">
                  <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-slate-800 mb-2">
                    Brak wyników
                  </h4>
                  <p className="text-slate-600">
                    Nie znaleźliśmy pytań pasujących do Twojego wyszukiwania.
                    <br />
                    Spróbuj innych słów kluczowych lub skontaktuj się z nami bezpośrednio.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* AI Assistant CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-slate-700 to-blue-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Nie znalazłeś odpowiedzi na swoje pytanie?
              </h3>
              <p className="text-blue-100 mb-6">
                Porozmawiaj z naszym asystentem AI lub skontaktuj się z nami bezpośrednio!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    // Scroll to chatbot and open it
                    const chatbotButton = document.querySelector('.fixed.bottom-6.right-6 button');
                    if (chatbotButton) {
                      chatbotButton.click();
                    }
                  }}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all inline-flex items-center justify-center transform hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Zapytaj asystenta AI
                </button>
                <a
                  href="#kontakt"
                  className="bg-white text-slate-800 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors inline-flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Zadaj pytanie
                </a>
                <a
                  href="mailto:kontakt@akademiapoliglotki.pl"
                  className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                >
                  Wyślij email
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default FAQ