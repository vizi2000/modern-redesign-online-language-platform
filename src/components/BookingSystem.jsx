import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Calendar, Clock, User, Mail, Phone, CheckCircle, AlertCircle, CalendarDays, Video } from 'lucide-react'

const BookingSystem = () => {
  const [step, setStep] = useState(1) // 1: select service, 2: select date/time, 3: details, 4: confirmation
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    language: '',
    level: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)

  const services = [
    {
      id: 'free-trial',
      name: 'Bezpłatna lekcja próbna',
      duration: '60 minut',
      price: 'Gratis',
      description: 'Poznaj naszą metodę i sprawdź swój poziom',
      icon: '🎁',
      popular: true
    },
    {
      id: 'consultation',
      name: 'Konsultacja językowa',
      duration: '30 minut',
      price: 'Gratis',
      description: 'Omówimy Twoje cele i plan nauki',
      icon: '💬',
      popular: false
    },
    {
      id: 'level-test',
      name: 'Test poziomu + analiza',
      duration: '45 minut',
      price: '99 zł',
      description: 'Szczegółowy test z rekomendacjami',
      icon: '📊',
      popular: false
    },
    {
      id: 'regular-lesson',
      name: 'Lekcja indywidualna',
      duration: '60 minut',
      price: '199 zł',
      description: 'Standardowa lekcja z doświadczonym lektorem',
      icon: '📚',
      popular: false
    }
  ]

  const languages = [
    'Angielski', 'Francuski', 'Niemiecki', 'Hiszpański', 'Włoski'
  ]

  const levels = [
    'Początkujący (A1)', 'Podstawowy (A2)', 'Średniozaawansowany (B1)', 
    'Zaawansowany (B2)', 'Biegły (C1)', 'Ojczysty (C2)', 'Nie wiem'
  ]

  // Generate available dates (next 14 days, excluding weekends for demo)
  const generateAvailableDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      // Skip weekends for demo (in real app, this would come from API)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date)
      }
    }
    return dates
  }

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = []
    const startHour = 8
    const endHour = 20
    
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`)
      slots.push(`${hour.toString().padStart(2, '0')}:30`)
    }
    return slots
  }

  const availableDates = generateAvailableDates()
  const timeSlots = generateTimeSlots()

  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setStep(2)
  }

  const handleDateTimeSelect = () => {
    if (selectedDate && selectedTime) {
      setStep(3)
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call to booking system
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In real app, this would send to booking API
      console.log('Booking data:', {
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
        ...formData
      })
      
      setBookingComplete(true)
      setStep(4)
    } catch (error) {
      console.error('Booking error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('pl-PL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const resetBooking = () => {
    setStep(1)
    setSelectedService(null)
    setSelectedDate('')
    setSelectedTime('')
    setFormData({
      name: '',
      email: '',
      phone: '',
      language: '',
      level: '',
      message: ''
    })
    setBookingComplete(false)
  }

  // Step 1: Service Selection
  if (step === 1) {
    return (
      <section id="rezerwacja" className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Zarezerwuj swoją lekcję
            </h2>
            <p className="text-xl text-slate-600">
              Wybierz rodzaj spotkania i umów się na dogodny termin
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {services.map((service) => (
              <Card 
                key={service.id}
                className={`relative bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                  service.popular ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handleServiceSelect(service)}
              >
                {service.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                    Najpopularniejsze
                  </Badge>
                )}
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {service.name}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-600">{service.duration}</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-3">
                    {service.price}
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    {service.description}
                  </p>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                    Wybierz
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-slate-600 mb-4">
              Masz pytania? Skontaktuj się z nami bezpośrednio
            </p>
            <div className="flex justify-center space-x-4">
              <a href="tel:+48123456789" className="flex items-center text-blue-600 hover:text-blue-700">
                <Phone className="w-4 h-4 mr-2" />
                +48 123 456 789
              </a>
              <a href="mailto:kontakt@akademiapoliglotki.pl" className="flex items-center text-blue-600 hover:text-blue-700">
                <Mail className="w-4 h-4 mr-2" />
                kontakt@akademiapoliglotki.pl
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Step 2: Date and Time Selection
  if (step === 2) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Wybierz termin
            </h2>
            <p className="text-slate-600">
              {selectedService.name} - {selectedService.duration}
            </p>
          </div>

          <Card className="bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-xl mb-6">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <CalendarDays className="w-5 h-5 mr-2" />
                Dostępne daty
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                {availableDates.map((date, index) => {
                  const dateStr = date.toISOString().split('T')[0]
                  const isSelected = selectedDate === dateStr
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`p-3 rounded-lg border-2 text-sm transition-all duration-200 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-medium">
                        {date.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' })}
                      </div>
                      <div className="text-xs text-slate-500">
                        {date.toLocaleDateString('pl-PL', { weekday: 'short' })}
                      </div>
                    </button>
                  )
                })}
              </div>

              {selectedDate && (
                <>
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Dostępne godziny - {formatDate(selectedDate)}
                  </h3>
                  
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
                    {timeSlots.map((time) => {
                      const isSelected = selectedTime === time
                      
                      return (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-lg border-2 text-sm transition-all duration-200 ${
                            isSelected
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              onClick={() => setStep(1)}
              variant="outline"
              className="border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              Wróć do wyboru usługi
            </Button>
            <Button
              onClick={handleDateTimeSelect}
              disabled={!selectedDate || !selectedTime}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50"
            >
              Dalej - dane kontaktowe
            </Button>
          </div>
        </div>
      </section>
    )
  }

  // Step 3: Contact Details
  if (step === 3) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Dane kontaktowe
            </h2>
            <p className="text-slate-600">
              Ostatni krok - wypełnij formularz, a my skontaktujemy się z Tobą
            </p>
          </div>

          <Card className="bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-xl mb-6">
            <CardContent className="p-8">
              {/* Booking Summary */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-slate-800 mb-2">Podsumowanie rezerwacji:</h3>
                <div className="text-sm text-slate-600">
                  <p><strong>Usługa:</strong> {selectedService.name}</p>
                  <p><strong>Data:</strong> {formatDate(selectedDate)}</p>
                  <p><strong>Godzina:</strong> {selectedTime}</p>
                  <p><strong>Czas trwania:</strong> {selectedService.duration}</p>
                  <p><strong>Cena:</strong> {selectedService.price}</p>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Imię i nazwisko *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Jan Kowalski"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="jan@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+48 123 456 789"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Język
                    </label>
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Wybierz język</option>
                      {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Obecny poziom
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Wybierz poziom</option>
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Dodatkowe informacje
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Opisz swoje cele nauki, preferencje lub zadaj pytanie..."
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    variant="outline"
                    className="border-slate-300 text-slate-600 hover:bg-slate-50"
                  >
                    Wróć do kalendarza
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Rezerwuję...
                      </div>
                    ) : (
                      'Zarezerwuj lekcję'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  // Step 4: Confirmation
  if (step === 4) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-emerald-100 min-h-screen">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Rezerwacja potwierdzona!
            </h2>
            <p className="text-slate-600">
              Dziękujemy za zaufanie. Szczegóły zostały wysłane na Twój email.
            </p>
          </div>

          <Card className="bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-xl mb-6">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Szczegóły rezerwacji
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Usługa</h4>
                  <p className="text-slate-600">{selectedService.name}</p>
                  <p className="text-sm text-slate-500">{selectedService.duration}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Termin</h4>
                  <p className="text-slate-600">{formatDate(selectedDate)}</p>
                  <p className="text-sm text-slate-500">{selectedTime}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Uczestnik</h4>
                  <p className="text-slate-600">{formData.name}</p>
                  <p className="text-sm text-slate-500">{formData.email}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Cena</h4>
                  <p className="text-2xl font-bold text-green-600">{selectedService.price}</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                  <Video className="w-4 h-4 mr-2" />
                  Następne kroki:
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Otrzymasz email z potwierdzeniem i linkiem do spotkania</li>
                  <li>• 24h przed lekcją wyślemy przypomnienie</li>
                  <li>• Lekcja odbędzie się przez Zoom/Google Meet</li>
                  <li>• W razie pytań zadzwoń: +48 123 456 789</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={resetBooking}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 mr-4"
            >
              Zarezerwuj kolejną lekcję
            </Button>
            <Button
              onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              className="border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              Skontaktuj się z nami
            </Button>
          </div>
        </div>
      </section>
    )
  }
}

export default BookingSystem