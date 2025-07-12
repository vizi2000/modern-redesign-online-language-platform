import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { loadStripe } from '@stripe/stripe-js'
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Lock, 
  Star,
  ArrowRight,
  Calendar,
  Users,
  Trophy
} from 'lucide-react'

// Initialize Stripe (in production, use environment variable)
const stripePromise = loadStripe('pk_test_51234567890_your_stripe_publishable_key')

const PaymentGateway = () => {
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [paymentError, setPaymentError] = useState(null)

  const packages = [
    {
      id: 'single',
      name: 'Pojedyncza lekcja',
      price: 199,
      originalPrice: null,
      savings: null,
      duration: '60 minut',
      lessons: 1,
      validFor: '1 miesiąc',
      description: 'Idealne na początek',
      features: [
        'Lekcja z doświadczonym lektorem',
        'Materiały do nauki',
        'Spersonalizowane ćwiczenia',
        'Raport z postępów'
      ],
      popular: false,
      color: 'from-slate-600 to-gray-700'
    },
    {
      id: 'package-4',
      name: 'Pakiet 4 lekcji',
      price: 720,
      originalPrice: 796,
      savings: 76,
      duration: '60 minut każda',
      lessons: 4,
      validFor: '2 miesiące',
      description: 'Najlepszy stosunek jakości do ceny',
      features: [
        'Wszystko z pakietu pojedynczego',
        'Plan nauki na 4 tygodnie',
        'Wsparcie między lekcjami',
        'Test postępów',
        'Oszczędność 76 zł'
      ],
      popular: true,
      color: 'from-blue-600 to-indigo-700'
    },
    {
      id: 'package-8',
      name: 'Pakiet 8 lekcji',
      price: 1360,
      originalPrice: 1592,
      savings: 232,
      duration: '60 minut każda',
      lessons: 8,
      validFor: '3 miesiące',
      description: 'Dla poważnie nastawionych',
      features: [
        'Wszystko z poprzednich pakietów',
        'Kompleksowy program nauki',
        'Miesięczne testy poziomowania',
        'Dostęp do materiałów premium',
        'Certyfikat po ukończeniu',
        'Oszczędność 232 zł'
      ],
      popular: false,
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'unlimited',
      name: 'Nieograniczony dostęp',
      price: 2499,
      originalPrice: null,
      savings: null,
      duration: 'Bez ograniczeń',
      lessons: '∞',
      validFor: '6 miesięcy',
      description: 'Maksymalne tempo nauki',
      features: [
        'Nieograniczona liczba lekcji',
        'Priorytetowe terminy',
        'Dedykowany mentor',
        'Dostęp do wszystkich kursów',
        'Indywidualny program nauki',
        'Gwarancja postępów',
        'Materiały w 5 językach'
      ],
      popular: false,
      color: 'from-orange-500 to-red-600',
      premium: true
    }
  ]

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg)
    setPaymentError(null)
  }

  const handlePayment = async () => {
    if (!selectedPackage) return
    
    setIsProcessing(true)
    setPaymentError(null)

    try {
      // Simulate Stripe checkout process
      // In production, this would create a checkout session on your backend
      
      const checkoutData = {
        packageId: selectedPackage.id,
        amount: selectedPackage.price * 100, // Stripe uses cents
        currency: 'pln',
        description: selectedPackage.name,
        metadata: {
          lessons: selectedPackage.lessons,
          validFor: selectedPackage.validFor
        }
      }

      // Simulate API call to create Stripe session
      console.log('Creating Stripe checkout session:', checkoutData)
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In production, redirect to Stripe Checkout:
      // const stripe = await stripePromise
      // const { error } = await stripe.redirectToCheckout({
      //   sessionId: 'session_id_from_backend'
      // })
      
      // For demo, simulate successful payment
      setPaymentComplete(true)
      
    } catch (error) {
      console.error('Payment error:', error)
      setPaymentError('Wystąpił błąd podczas przetwarzania płatności. Spróbuj ponownie.')
    } finally {
      setIsProcessing(false)
    }
  }

  const resetPayment = () => {
    setSelectedPackage(null)
    setPaymentComplete(false)
    setPaymentError(null)
    setIsProcessing(false)
  }

  // Payment Success Screen
  if (paymentComplete) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-100 min-h-screen">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Płatność zakończona pomyślnie!
            </h2>
            <p className="text-slate-600">
              Dziękujemy za zakup. Szczegóły zostały wysłane na Twój email.
            </p>
          </div>

          <Card className="bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-xl mb-6">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Szczegóły zakupu
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Pakiet</h4>
                  <p className="text-slate-600">{selectedPackage.name}</p>
                  <p className="text-sm text-slate-500">{selectedPackage.lessons} lekcji</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Kwota</h4>
                  <p className="text-2xl font-bold text-green-600">{selectedPackage.price} zł</p>
                  {selectedPackage.savings && (
                    <p className="text-sm text-green-500">Oszczędzasz {selectedPackage.savings} zł</p>
                  )}
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Ważność</h4>
                  <p className="text-slate-600">{selectedPackage.validFor}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Status</h4>
                  <Badge className="bg-green-500 text-white">Opłacone</Badge>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-800 mb-2">Następne kroki:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Skontaktujemy się z Tobą w ciągu 24h</li>
                  <li>• Ustalimy terminy pierwszych lekcji</li>
                  <li>• Otrzymasz dostęp do platformy uczenia</li>
                  <li>• Wyślemy materiały do nauki</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={() => document.getElementById('rezerwacja')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 mr-4"
            >
              Zarezerwuj pierwszą lekcję
            </Button>
            <Button
              onClick={resetPayment}
              variant="outline"
              className="border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              Kup kolejny pakiet
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="platnosci" className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Wybierz swój pakiet lekcji
          </h2>
          <p className="text-xl text-slate-600 mb-6">
            Bezpieczne płatności, gwarancja najwyższej jakości
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-slate-500">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2 text-green-500" />
              Bezpieczne płatności
            </div>
            <div className="flex items-center">
              <Lock className="w-4 h-4 mr-2 text-blue-500" />
              Szyfrowanie SSL
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              30 dni gwarancji
            </div>
          </div>
        </div>

        {/* Package Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`relative bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                selectedPackage?.id === pkg.id ? 'ring-2 ring-blue-500' : ''
              } ${pkg.popular ? 'ring-2 ring-orange-500' : ''}`}
              onClick={() => handlePackageSelect(pkg)}
            >
              {pkg.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white">
                  Najpopularniejszy
                </Badge>
              )}
              {pkg.premium && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  Premium
                </Badge>
              )}
              
              <CardContent className="p-6">
                <div className={`w-full h-2 bg-gradient-to-r ${pkg.color} rounded-full mb-4`}></div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {pkg.name}
                </h3>
                
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-slate-800">{pkg.price}</span>
                    <span className="text-slate-600 ml-1">zł</span>
                  </div>
                  {pkg.originalPrice && (
                    <div className="flex items-center mt-1">
                      <span className="text-lg text-slate-400 line-through mr-2">
                        {pkg.originalPrice} zł
                      </span>
                      <Badge className="bg-green-500 text-white text-xs">
                        -{pkg.savings} zł
                      </Badge>
                    </div>
                  )}
                  <p className="text-sm text-slate-500 mt-1">{pkg.description}</p>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                    <span>{pkg.lessons} lekcji × {pkg.duration}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-2 text-slate-400" />
                    <span>Ważne przez {pkg.validFor}</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6 text-sm">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${selectedPackage?.id === pkg.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {selectedPackage?.id === pkg.id ? 'Wybrany pakiet' : 'Wybierz pakiet'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Section */}
        {selectedPackage && (
          <Card className="bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-xl max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  Podsumowanie zamówienia
                </h3>
                <p className="text-slate-600">
                  Krok 1 z 2 - Sprawdź szczegóły przed płatnością
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-slate-800">{selectedPackage.name}</h4>
                    <p className="text-sm text-slate-600">{selectedPackage.lessons} lekcji × {selectedPackage.duration}</p>
                    <p className="text-sm text-slate-500">Ważne przez {selectedPackage.validFor}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-800">{selectedPackage.price} zł</div>
                    {selectedPackage.savings && (
                      <div className="text-sm text-green-600">Oszczędzasz {selectedPackage.savings} zł</div>
                    )}
                  </div>
                </div>
              </div>

              {paymentError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center text-red-800">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {paymentError}
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-1" />
                    Visa, Mastercard
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    BLIK, Przelewy24
                  </div>
                  <div className="flex items-center">
                    <Lock className="w-4 h-4 mr-1" />
                    SSL 256-bit
                  </div>
                </div>
                
                <p className="text-xs text-center text-slate-400">
                  Płatności obsługiwane przez Stripe. Twoje dane są w pełni bezpieczne.
                </p>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={() => setSelectedPackage(null)}
                  variant="outline"
                  className="flex-1 border-slate-300 text-slate-600 hover:bg-slate-50"
                >
                  Zmień pakiet
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Przetwarzanie...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Przejdź do płatności
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Info */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-500 mb-4">
            🔒 Wszystkie płatności są bezpieczne i szyfrowane
          </p>
          <div className="flex justify-center space-x-6 text-xs text-slate-400">
            <span>30 dni gwarancji zwrotu</span>
            <span>•</span>
            <span>Certyfikat SSL</span>
            <span>•</span>
            <span>PCI DSS Compliant</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PaymentGateway