import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { 
  Check, 
  X, 
  Star, 
  Clock, 
  Users, 
  MessageCircle, 
  BookOpen, 
  Award,
  Zap,
  Gift,
  CreditCard,
  Shield,
  Calendar,
  Phone,
  Video,
  FileText,
  Headphones
} from 'lucide-react'

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium')
  const [billingType, setBillingType] = useState('single') // 'single' or 'package'

  const singleLessons = {
    trial: {
      name: 'Lekcja próbna',
      price: 0,
      originalPrice: 199,
      duration: '60 min',
      description: 'Idealna na start - poznaj moją metodę',
      features: [
        'Test poziomu języka',
        'Indywidualny plan nauki',
        'Materiały do pierwszej lekcji',
        'Feedback i rekomendacje'
      ],
      popular: false,
      color: 'from-green-500 to-emerald-600'
    },
    standard: {
      name: 'Lekcja standardowa',
      price: 199,
      duration: '60 min',
      description: 'Najchętniej wybierana opcja',
      features: [
        'Lekcja 1 na 1 z nauczycielem',
        'Spersonalizowane materiały',
        'Zadanie domowe',
        'Nagranie z lekcji (na życzenie)',
        'Support między lekcjami'
      ],
      popular: true,
      color: 'from-blue-500 to-indigo-600'
    },
    intensive: {
      name: 'Lekcja intensywna',
      price: 299,
      duration: '90 min',
      description: 'Dla ambitnych i zdeterminowanych',
      features: [
        'Przedłużona lekcja 90 minut',
        'Dodatkowe ćwiczenia praktyczne',
        'Praca nad pronunciacją',
        'Symulacja sytuacji biznesowych',
        'Dodatkowe materiały premium'
      ],
      popular: false,
      color: 'from-purple-500 to-pink-600'
    }
  }

  const packages = {
    basic: {
      name: 'Pakiet Starter',
      lessons: 5,
      price: 895,
      originalPrice: 995,
      savings: 100,
      duration: '5 x 60 min',
      description: 'Dobry start do regularnej nauki',
      features: [
        '5 lekcji indywidualnych',
        'Elastyczne terminarz',
        'Materiały do każdej lekcji',
        'Podstawowy feedback',
        'Email support'
      ],
      popular: false,
      color: 'from-slate-500 to-gray-600',
      pricePerLesson: 179
    },
    premium: {
      name: 'Pakiet Premium',
      lessons: 10,
      price: 1699,
      originalPrice: 1990,
      savings: 291,
      duration: '10 x 60 min',
      description: 'Najlepszy stosunek jakości do ceny',
      features: [
        '10 lekcji indywidualnych',
        'Priorytetowe rezerwacje',
        'Zaawansowane materiały',
        'Szczegółowy feedback po każdej lekcji',
        'WhatsApp support 24/7',
        'Bezpłatne przełożenia (48h notice)',
        'Progress tracking',
        'Certyfikat ukończenia'
      ],
      popular: true,
      color: 'from-blue-500 to-indigo-600',
      pricePerLesson: 169
    },
    vip: {
      name: 'Pakiet VIP',
      lessons: 20,
      price: 3199,
      originalPrice: 3980,
      savings: 781,
      duration: '20 x 60 min',
      description: 'Dla najbardziej wymagających',
      features: [
        '20 lekcji indywidualnych',
        'Dostępność nauczyciela w trybie premium',
        'Spersonalizowane materiały autorskie',
        'Cotygodniowe progress reporty',
        'Dedykowany WhatsApp dla pilnych pytań',
        'Bezpłatne przełożenia (24h notice)',
        'Dostęp do biblioteki zasobów premium',
        'Mock interviews / prezentacje',
        'Certyfikat ukończenia + LinkedIn badge',
        'Rabat 10% na kolejny pakiet'
      ],
      popular: false,
      color: 'from-purple-500 to-pink-600',
      pricePerLesson: 159
    }
  }

  const paymentMethods = [
    { name: 'Przelew bankowy', icon: <CreditCard className="w-5 h-5" />, discount: '0%' },
    { name: 'Karta płatnicza', icon: <CreditCard className="w-5 h-5" />, discount: '0%' },
    { name: 'BLIK', icon: <Phone className="w-5 h-5" />, discount: '0%' },
    { name: 'PayPal', icon: <Shield className="w-5 h-5" />, discount: '0%' },
    { name: 'Płatność ratalna (2x)', icon: <Calendar className="w-5 h-5" />, discount: '+2%' }
  ]

  const guarantees = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Gwarancja satysfakcji',
      description: 'Jeśli nie jesteś zadowolony po pierwszej płatnej lekcji, zwracamy 100% kosztów'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Elastyczne przełożenia',
      description: 'Możliwość przełożenia lekcji z 24-godzinnym wyprzedzeniem bez dodatkowych kosztów'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Certyfikat ukończenia',
      description: 'Po zakończeniu kursu otrzymujesz certyfikat potwierdzający Twój poziom'
    }
  ]

  const addons = [
    {
      name: 'Dodatkowe materiały PDF',
      price: 29,
      description: 'Pakiet 50+ ćwiczeń i tekstów do samodzielnej nauki'
    },
    {
      name: 'Konwersacje przez telefon',
      price: 99,
      description: 'Cotygodniowe 30-minutowe rozmowy telefoniczne'
    },
    {
      name: 'Korekcja emaili/dokumentów',
      price: 149,
      description: 'Miesięczny pakiet korekty do 10 dokumentów'
    }
  ]

  const currentPlans = billingType === 'single' ? singleLessons : packages

  return (
    <section id="cennik" className="py-16 px-4 bg-slate-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Przejrzyste ceny, bez ukrytych kosztów
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Wybierz opcję idealną dla siebie - od pojedynczych lekcji po kompleksowe pakiety
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex bg-white rounded-lg border border-slate-200 p-1 shadow-lg">
            <button
              onClick={() => setBillingType('single')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                billingType === 'single'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              Pojedyncze lekcje
            </button>
            <button
              onClick={() => setBillingType('package')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                billingType === 'package'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              Pakiety lekcji
              <Badge className="ml-2 bg-green-100 text-green-800 text-xs">OSZCZĘDZAJ</Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {Object.entries(currentPlans).map(([key, plan]) => (
            <Card 
              key={key}
              className={`relative bg-white/80 backdrop-blur-xl border shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                plan.popular ? 'border-blue-500 shadow-blue-200' : 'border-slate-200/50'
              } ${selectedPlan === key ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
              onClick={() => setSelectedPlan(key)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 text-sm font-bold">
                    <Star className="w-4 h-4 mr-1" />
                    NAJPOPULARNIEJSZY
                  </Badge>
                </div>
              )}

              <CardContent className="p-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">{plan.name}</h3>
                  <p className="text-slate-600 mb-4">{plan.description}</p>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-4xl font-bold text-slate-800">{plan.price}</span>
                      <span className="text-slate-600">zł</span>
                    </div>
                    {plan.originalPrice && plan.originalPrice > plan.price && (
                      <div className="flex items-center justify-center space-x-2 mt-1">
                        <span className="text-lg text-slate-400 line-through">{plan.originalPrice} zł</span>
                        {plan.savings && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            -{plan.savings} zł
                          </Badge>
                        )}
                      </div>
                    )}
                    <p className="text-slate-500 text-sm mt-1">{plan.duration}</p>
                    {plan.pricePerLesson && (
                      <p className="text-blue-600 font-medium text-sm mt-1">
                        {plan.pricePerLesson} zł za lekcję
                      </p>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full bg-gradient-to-r ${plan.color} text-white hover:shadow-lg transition-all duration-300 py-3`}
                >
                  {plan.price === 0 ? 'Zarezerwuj za darmo' : 'Wybierz pakiet'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Package Comparison Table (only for packages) */}
        {billingType === 'package' && (
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-slate-800 mb-8 text-center">
              Porównanie pakietów
            </h3>
            
            <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left p-6 font-semibold text-slate-800">Funkcja</th>
                      <th className="text-center p-6 font-semibold text-slate-800">Starter</th>
                      <th className="text-center p-6 font-semibold text-blue-600 bg-blue-50">Premium</th>
                      <th className="text-center p-6 font-semibold text-purple-600">VIP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-slate-200">
                      <td className="p-4 font-medium text-slate-700">Liczba lekcji</td>
                      <td className="p-4 text-center">5</td>
                      <td className="p-4 text-center bg-blue-50/50">10</td>
                      <td className="p-4 text-center">20</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="p-4 font-medium text-slate-700">Cena za lekcję</td>
                      <td className="p-4 text-center">179 zł</td>
                      <td className="p-4 text-center bg-blue-50/50 font-semibold text-blue-600">169 zł</td>
                      <td className="p-4 text-center font-semibold text-purple-600">159 zł</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="p-4 font-medium text-slate-700">Priorytetowe rezerwacje</td>
                      <td className="p-4 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                      <td className="p-4 text-center bg-blue-50/50"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                      <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="p-4 font-medium text-slate-700">WhatsApp support</td>
                      <td className="p-4 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                      <td className="p-4 text-center bg-blue-50/50"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                      <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="p-4 font-medium text-slate-700">Progress tracking</td>
                      <td className="p-4 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                      <td className="p-4 text-center bg-blue-50/50"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                      <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="p-4 font-medium text-slate-700">Mock interviews</td>
                      <td className="p-4 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                      <td className="p-4 text-center bg-blue-50/50"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                      <td className="p-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Add-ons Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Dodatkowe usługi
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {addons.map((addon, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h4 className="font-bold text-slate-800 mb-2">{addon.name}</h4>
                    <div className="text-2xl font-bold text-blue-600 mb-2">{addon.price} zł</div>
                    <p className="text-slate-600 text-sm mb-4">{addon.description}</p>
                    <Button variant="outline" className="w-full">
                      Dodaj do pakietu
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Metody płatności
          </h3>
          
          <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-5 gap-6">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      {method.icon}
                    </div>
                    <h4 className="font-medium text-slate-800 mb-1">{method.name}</h4>
                    <p className="text-slate-600 text-sm">{method.discount}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center text-green-800">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="font-medium">Bezpieczne płatności</span>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  Wszystkie transakcje są zabezpieczone szyfrowaniem SSL. Nie przechowujemy danych kart płatniczych.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Guarantees */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Nasze gwarancje
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {guarantees.map((guarantee, index) => (
              <Card key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="text-green-600 mb-4 flex justify-center">
                    {guarantee.icon}
                  </div>
                  <h4 className="font-bold text-slate-800 mb-3">{guarantee.title}</h4>
                  <p className="text-slate-600">{guarantee.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Quick Links */}
        <Card className="bg-gradient-to-r from-slate-700 to-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Masz pytania o cennik?</h3>
            <p className="text-blue-100 mb-6">
              Sprawdź najczęściej zadawane pytania lub skontaktuj się z nami bezpośrednio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-slate-800 hover:bg-slate-100">
                <MessageCircle className="w-5 h-5 mr-2" />
                Zobacz FAQ
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Bezpłatna konsultacja
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default Pricing