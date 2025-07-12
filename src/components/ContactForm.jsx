import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    language: '',
    level: '',
    message: '',
    preferredContact: 'email'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', null
  const [errors, setErrors] = useState({})

  const languages = [
    'Angielski', 'Francuski', 'Niemiecki', 'Hiszpański', 'Włoski'
  ]

  const levels = [
    'Początkujący (A1)', 'Podstawowy (A2)', 'Średniozaawansowany (B1)', 
    'Zaawansowany (B2)', 'Biegły (C1)', 'Ojczysty (C2)', 'Nie wiem'
  ]

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Imię jest wymagane'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email nie jest prawidłowy'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Wiadomość jest wymagana'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {
      // EmailJS configuration
      const serviceID = 'service_akademia_poliglotki'
      const templateID = 'template_contact_form'
      const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY'
      
      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Nie podano',
        language: formData.language || 'Nie wybrano',
        level: formData.level || 'Nie wybrano',
        preferred_contact: formData.preferredContact === 'email' ? 'Email' : 'Telefon',
        message: formData.message,
        to_email: 'kontakt@akademiapoliglotki.pl'
      }
      
      // Send email via EmailJS
      await emailjs.send(serviceID, templateID, templateParams, publicKey)
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        language: '',
        level: '',
        message: '',
        preferredContact: 'email'
      })
    } catch (error) {
      console.error('EmailJS Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="kontakt" className="py-16 px-4 bg-white/60 backdrop-blur-xl">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Skontaktuj się z nami
          </h2>
          <p className="text-xl text-slate-600">
            Masz pytania? Chcesz umówić się na bezpłatną konsultację? Napisz do nas!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">
                  Informacje kontaktowe
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Email</p>
                      <p className="text-slate-600">kontakt@akademiapoliglotki.pl</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Telefon</p>
                      <p className="text-slate-600">+48 123 456 789</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Lokalizacja</p>
                      <p className="text-slate-600">Lekcje online z dowolnego miejsca</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="bg-gradient-to-br from-slate-700 to-blue-600 text-white shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Godziny dostępności</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Poniedziałek - Piątek</span>
                    <span className="font-semibold">8:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sobota</span>
                    <span className="font-semibold">9:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Niedziela</span>
                    <span className="font-semibold">Na umówienie</span>
                  </div>
                </div>
                <p className="text-blue-100 text-sm mt-4">
                  * Lekcje dostępne 7 dni w tygodniu według indywidualnych ustaleń
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                Wyślij wiadomość
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Imię i nazwisko *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.name ? 'border-red-300 bg-red-50' : 'border-slate-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      placeholder="Jan Kowalski"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email ? 'border-red-300 bg-red-50' : 'border-slate-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      placeholder="jan@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="+48 123 456 789"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-slate-700 mb-2">
                      Interesujący język
                    </label>
                    <select
                      id="language"
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">Wybierz język</option>
                      {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-slate-700 mb-2">
                    Obecny poziom
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Wybierz poziom</option>
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Preferowany sposób kontaktu
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-slate-700">Email</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-slate-700">Telefon</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Wiadomość *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.message ? 'border-red-300 bg-red-50' : 'border-slate-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none`}
                    placeholder="Opisz swoje cele nauki, preferencje lub zadaj pytanie..."
                  />
                  {errors.message && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Status Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center text-green-800">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Dziękujemy! Twoja wiadomość została wysłana. Odpowiemy w ciągu 24 godzin.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-800">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Wystąpił błąd. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio.
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-slate-700 to-blue-600 hover:from-slate-800 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Wysyłanie...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send className="w-5 h-5 mr-2" />
                      Wyślij wiadomość
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ContactForm