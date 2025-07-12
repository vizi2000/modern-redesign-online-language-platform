import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  BookOpen, 
  Clock, 
  User, 
  ArrowRight, 
  Search,
  Filter,
  Calendar,
  Eye,
  Heart,
  Share2,
  MessageCircle,
  Star
} from 'lucide-react'

const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: 'Wszystkie', count: 12 },
    { id: 'tips', name: 'Porady', count: 5 },
    { id: 'grammar', name: 'Gramatyka', count: 3 },
    { id: 'culture', name: 'Kultura', count: 2 },
    { id: 'technology', name: 'Technologie', count: 2 }
  ]

  const blogPosts = [
    {
      id: 1,
      title: '10 skutecznych sposobów na naukę słówek',
      excerpt: 'Poznaj sprawdzone metody, które pomogą Ci szybko i efektywnie zapamiętywać nowe słowa w języku obcym.',
      content: `Nauka słówek nie musi być nudna! Oto 10 sprawdzonych metod, które pomogą Ci szybko poszerzać słownictwo:

1. **Metoda flashcards** - Klasyczne fiszki, ale w wersji cyfrowej. Aplikacje jak Anki czy Quizlet pozwalają na powtarzanie w optymalnych odstępach czasu.

2. **Kontekst to wszystko** - Zamiast uczyć się izolowanych słów, umieszczaj je w zdaniach i sytuacjach.

3. **Słownik obrazkowy** - Wizualizuj nowe słowa. Mózg lepiej zapamiętuje informacje połączone z obrazami.

4. **Metoda skojarzeń** - Łącz nowe słowa z już znanymi lub z obrazami mentalnymi.

5. **Aktywne używanie** - Natychmiast używaj nowych słów w rozmowach i ćwiczeniach.

6. **Grupowanie tematyczne** - Ucz się słów w grupach tematycznych (jedzenie, podróże, praca).

7. **Mnemoniki** - Twórz zabawne skojarzenia i rymowanki.

8. **Powtarzanie interwalowe** - Powtarzaj materiał w określonych odstępach: 1 dzień, 3 dni, tydzień, miesiąc.

9. **Immersja językowa** - Otacz się językiem: filmy, muzyka, podcasty.

10. **Gry słowne** - Krzyżówki, Scrabble, aplikacje gamifikujące naukę.

Pamiętaj: konsystencja jest kluczem do sukcesu!`,
      author: 'Klaudia Komisarek',
      date: '2025-07-10',
      readTime: '5 min',
      category: 'tips',
      image: '/blog/vocabulary-learning.jpg',
      views: 1247,
      likes: 89,
      comments: 12,
      featured: true
    },
    {
      id: 2,
      title: 'Dlaczego gramatyka angielska nie jest taka straszna?',
      excerpt: 'Rozprawiamy się z mitami o trudności gramatyki angielskiej i pokazujemy, jak uczyć się jej przyjemnie.',
      content: `Gramatyka angielska ma opinię bardzo trudnej, ale czy słusznie? Sprawdźmy faktycznie!

**Mit 1: Angielska gramatyka jest najbardziej skomplikowana**
Prawda: Angielski ma stosunkowo prostą gramatykę w porównaniu do polskiego czy niemieckiego.

**Mit 2: Trzeba znać wszystkie czasy na pamięć**
Prawda: W codziennej komunikacji używamy głównie 3-4 czasów.

**Praktyczne podejście do gramatyki:**

1. **Zrozumienie przed zapamiętywaniem** - Zamiast kuć na pamięć, zrozum logikę języka.

2. **Nauka w kontekście** - Gramatyka ma sens tylko w użyciu.

3. **Od prostego do złożonego** - Zacznij od podstaw i stopniowo dodawaj elementy.

4. **Błędy to część procesu** - Nie bój się pomyłek, to naturalna droga do opanowania języka.

5. **Praktyka przez zabawę** - Gry, quizy, aplikacje interaktywne.

**Najważniejsze zasady angielskiej gramatyki:**
- Szykowiec podmiotu przed orzeczeniem
- Używanie czasowników posiłkowych
- Prosta odmiana czasowników

Pamiętaj: płynność jest ważniejsza od perfekcji!`,
      author: 'Klaudia Komisarek',
      date: '2025-07-08',
      readTime: '7 min',
      category: 'grammar',
      image: '/blog/english-grammar.jpg',
      views: 892,
      likes: 67,
      comments: 8,
      featured: false
    },
    {
      id: 3,
      title: 'Francuski czy hiszpański? Który język wybrać?',
      excerpt: 'Pomożemy Ci podjąć decyzję, który z tych popularnych języków romantycznych będzie lepszy dla Ciebie.',
      content: `Stoisz przed wyborem między francuskim a hiszpańskim? To doskonały problem! Oba języki mają swoje zalety.

**Francuski - język miłości i dyplomacji**

Zalety:
- Język międzynarodowy (ONZ, UE)
- Bogata kultura i literatura
- Otwiera drzwi do kariery w luksusie i modzie
- Przydatny w Afryce i Kanadzie

Trudności:
- Skomplikowana wymowa
- Wiele wyjątków gramatycznych
- Liaison i élision

**Hiszpański - język przyszłości**

Zalety:
- Drugi najczęściej używany język na świecie
- Prosta wymowa dla Polaków
- Szybki wzrost gospodarczy krajów hiszpańskojęzycznych
- Łatwiejsza gramatyka

Trudności:
- Różnice regionalne w słownictwie
- Czasy przeszłe
- Subjuntivo

**Jak wybrać?**

1. **Cele zawodowe** - Hiszpański dla biznesu, francuski dla dyplomacji
2. **Zainteresowania kulturowe** - Literatura francuska vs. kultura latynoska
3. **Łatwość nauki** - Hiszpański jest prostszy dla początkujących
4. **Możliwości praktyki** - Gdzie będziesz używać języka?

**Nasza rekomendacja:**
Jeśli wahasz się, zacznij od hiszpańskiego - szybciej osiągniesz poziom komunikatywny, co zmotywuje Cię do dalszej nauki!`,
      author: 'Klaudia Komisarek',
      date: '2025-07-05',
      readTime: '6 min',
      category: 'tips',
      image: '/blog/french-vs-spanish.jpg',
      views: 1156,
      likes: 94,
      comments: 15,
      featured: true
    },
    {
      id: 4,
      title: 'Aplikacje do nauki języków - ranking 2025',
      excerpt: 'Przegląd najlepszych aplikacji mobilnych do nauki języków obcych z naszymi ocenami i rekomendacjami.',
      content: `Które aplikacje naprawdę pomagają w nauce języków? Przetestowaliśmy najpopularniejsze!

**1. Duolingo - 9/10**
- Gamifikacja nauki
- Darmowy z reklamami
- Dobry na początek, słaby na zaawansowanym poziomie

**2. Babbel - 8.5/10**
- Praktyczne rozmówki
- Płatny, ale przemyślany system
- Skup na komunikacji

**3. Busuu - 8/10**
- Interakcja z native speakerami
- Plan nauki dopasowany do poziomu
- Droższy, ale skuteczny

**4. Memrise - 7.5/10**
- Doskonały do słówek
- Filmy z native speakerami
- Słaby w gramatyce

**5. HelloTalk - 7/10**
- Rozmowy z rodzimymi użytkownikami
- Darmowy exchange językowy
- Wymaga odwagi do rozmów

**Nasze rekomendacje:**
- **Początkujący**: Duolingo + Babbel
- **Średnio zaawansowani**: Busuu + HelloTalk  
- **Zaawansowani**: HelloTalk + podcasty

**Pamiętaj:** Żadna aplikacja nie zastąpi lekcji z lektorem!`,
      author: 'Klaudia Komisarek',
      date: '2025-07-03',
      readTime: '8 min',
      category: 'technology',
      image: '/blog/language-apps.jpg',
      views: 2134,
      likes: 156,
      comments: 23,
      featured: false
    },
    {
      id: 5,
      title: 'Kultura niemiecka przez język - co warto wiedzieć?',
      excerpt: 'Poznaj niemiecką kulturę i mentalność przez pryzmat języka. Odkryj, jak język odzwierciedla sposób myślenia.',
      content: `Niemiecki to nie tylko gramatyka i słówka - to okno na fascynującą kulturę!

**Język odzwierciedla mentalność**

1. **Precyzja w języku = precyzja w życiu**
   - Długie złożenia słowne wyrażają dokładnie to, co trzeba
   - Schadenfreude, Gemütlichkeit, Fernweh - słowa bez odpowiedników

2. **Struktura zdania = struktura myślenia**
   - czasownik na końcu = przemyślane wypowiedzi
   - Porządek w języku = porządek w działaniu

**Kulturowe aspekty języka niemieckiego:**

**Sie vs. Du** - hierarchia i szacunek
- Sie dla nieznajomych i starszych
- Du dla rodziny i przyjaciół
- Przejście na "Du" to rytuał

**Punktualność w języku**
- Pünktlichkeit ist eine Tugend
- Niemcy mają dokładne wyrażenia na różne rodzaje spóźnień

**Praca i życie prywatne**
- Feierabend - święty czas po pracy
- Work-life balance w języku

**Praktyczne wskazówki:**
1. Ucz się języka przez kulturę - filmy, muzyka, literatura
2. Rozumiej kontekst kulturowy wyrażeń
3. Obserwuj, jak Niemcy używają języka w różnych sytuacjach

**Ciekawe słowa niemieckie:**
- Verschlimmbessern - popsuć starając się naprawić
- Torschlusspanik - panika przed zamknięciem drzwi (o czasie)
- Backpfeifengesicht - twarz prosząca się o policzek

Nauka niemieckiego to podróż przez kulturę!`,
      author: 'Klaudia Komisarek',
      date: '2025-07-01',
      readTime: '9 min',
      category: 'culture',
      image: '/blog/german-culture.jpg',
      views: 743,
      likes: 52,
      comments: 7,
      featured: false
    },
    {
      id: 6,
      title: 'Motywacja w nauce języków - jak jej nie stracić?',
      excerpt: 'Strategie utrzymania motywacji podczas długotrwałej nauki języka obcego. Praktyczne porady od doświadczonych uczniów.',
      content: `Każdy, kto uczył się języka obcego, zna to uczucie - początkowy entuzjazm powoli wygasa...

**Dlaczego tracimy motywację?**

1. **Plateau effect** - brak widocznych postępów
2. **Przesadne oczekiwania** - chcemy zbyt dużo, zbyt szybko
3. **Brak celów** - nie wiemy, po co się uczymy
4. **Monotonia** - te same ćwiczenia w kółko

**Strategie na utrzymanie motywacji:**

**1. Ustaw realistyczne cele**
- Cele SMART: Specific, Measurable, Achievable, Relevant, Time-bound
- Małe kroki zamiast wielkich skoków
- Celebruj małe zwycięstwa

**2. Znajdź swój "dlaczego"**
- Podróże? Kariera? Pasja?
- Wizualizuj korzyści z nauki
- Znajdź osobistą motywację

**3. Różnorodność metod**
- Filmy, muzyka, gry, rozmowy
- Zmiana rutyny co 2-3 tygodnie
- Eksperymentuj z nowymi formami

**4. Progress tracking**
- Dziennik nauki
- Aplikacje do śledzenia czasu
- Regularne testy sprawdzające

**5. Społeczność**
- Grupy uczących się
- Tandem językowy
- Social media w języku docelowym

**6. Nagrody za postępy**
- System rewards
- Ulubione aktywności po sesji nauki
- Większe nagrody za większe cele

**Kryzys motywacji? To normalne!**
- Każdy przez to przechodzi
- Czasem warto zrobić przerwę
- Zmień podejście, nie rezygnuj

**Pamiętaj:** Motywacja jest jak ogień - trzeba ją regularnie podkarmać!`,
      author: 'Klaudia Komisarek',
      date: '2025-06-28',
      readTime: '10 min',
      category: 'tips',
      image: '/blog/motivation.jpg',
      views: 1489,
      likes: 127,
      comments: 19,
      featured: true
    }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <section id="blog" className="py-16 px-4 bg-slate-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Blog o nauce języków
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Praktyczne porady, ciekawostki kulturowe i motywacja do nauki
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Szukaj artykułów..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-500" />
            Polecane artykuły
          </h3>
          <div className="grid lg:grid-cols-3 gap-6">
            {featuredPosts.slice(0, 3).map((post) => (
              <Card key={post.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-t-lg flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white opacity-50" />
                  </div>
                  <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
                    Polecane
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('pl-PL')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-3 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {post.views}
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments}
                      </div>
                    </div>
                    <Badge variant="outline">
                      {categories.find(cat => cat.id === post.category)?.name}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Posts */}
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Wszystkie artykuły ({filteredPosts.length})
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-full h-40 bg-gradient-to-br from-slate-600 to-blue-600 rounded-t-lg flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-white opacity-50" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('pl-PL')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-800 mb-3 hover:text-blue-600 transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-4 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {post.views}
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Czytaj więcej
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Nie przegap nowych artykułów!
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Zapisz się do newslettera i otrzymuj najnowsze porady o nauce języków, ciekawostki kulturowe i motywację prosto do swojej skrzynki.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Twój adres email"
              className="flex-1 px-4 py-3 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <Button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 font-semibold">
              Zapisz się
            </Button>
          </div>
          <p className="text-xs text-blue-200 mt-4">
            Możesz się wypisać w każdym momencie. Szanujemy Twoją prywatność.
          </p>
        </div>
      </div>
    </section>
  )
}

export default BlogSection