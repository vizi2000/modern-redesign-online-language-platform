import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, X, Bot, User } from 'lucide-react'
import { Button } from './ui/button.jsx'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Cześć! 👋 Jestem PoliglotkAI - Twoim osobistym asystentem do nauki języków obcych!\n\n🧠 Wykorzystuję zaawansowaną sztuczną inteligencję (Dolphin Mistral), aby pomóc Ci:\n• 📚 W nauce gramatyki i słownictwa\n• 💬 W praktycznych konwersacjach\n• 🎯 W doborze odpowiedniego kursu\n• 🌍 W odkrywaniu kultur\n\nMogę rozmawiać po polsku i w wielu innych językach. Jak mogę Ci dziś pomóc?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [showNotification, setShowNotification] = useState(true)
  const messagesEndRef = useRef(null)

  const suggestedQuestions = [
    "Jak zacząć naukę angielskiego?",
    "Ile kosztują lekcje?",
    "Czy oferujecie bezpłatną lekcję próbną?",
    "Jakie są godziny lekcji?",
    "Jak sprawdzić mój poziom języka?",
    "Czy lekcje są indywidualne?",
    "Jakie materiały otrzymam?"
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (messageText = null) => {
    const textToSend = messageText || inputText
    if (!textToSend.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)
    setShowSuggestions(false)

    try {
      // Use OpenRouter API with Dolphin Mistral model
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Akademia Poliglotki'
        },
        body: JSON.stringify({
          model: 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free',
          messages: [
            {
              role: 'system',
              content: 'Jesteś PoliglotkAI - zaawansowanym asystentem językowym AI dla Akademii Poliglotki. Wykorzystujesz model Dolphin Mistral do pomocy w nauce języków obcych. Twoje główne zadania to: 1) Pomoc w nauce gramatyki i słownictwa, 2) Konwersacje w różnych językach, 3) Tłumaczenia i wyjaśnienia językowe, 4) Motywowanie do nauki, 5) Informacje o kursach. Odpowiadaj głównie po polsku, ale płynnie przełączaj się na inne języki gdy użytkownik tego potrzebuje. Bądź przyjazny, entuzjastyczny i pomocny. Używaj emoji dla lepszej komunikacji. Przedstawiaj się jako PoliglotkAI.'
            },
            {
              role: 'user',
              content: textToSend
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0
        })
      })

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status}`)
      }

      const data = await response.json()
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.choices[0].message.content,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error:', error)
      
      // Enhanced fallback responses when AI is not available
      const fallbackResponses = {
        "ile kosztują lekcje": "💰 **Cennik lekcji indywidualnych:**\n• Pojedyncza lekcja: 199 zł/60 min\n• Pakiet 4 lekcji: 720 zł (180 zł/lekcja)\n• Pakiet 8 lekcji: 1360 zł (170 zł/lekcja)\n• **Pierwsza lekcja próbna GRATIS!** 🎁",
        
        "jak zacząć": "🚀 **Jak rozpocząć naukę:**\n1. Umów bezpłatną lekcję próbną\n2. Zrobimy test poziomu języka\n3. Ustalimy cel i plan nauki\n4. Rozpoczniemy regularną naukę\n\n[Kliknij tutaj aby umówić konsultację](#kontakt)",
        
        "godziny": "⏰ **Godziny dostępności:**\n• Pon-Pt: 8:00-20:00\n• Sobota: 9:00-15:00\n• Niedziela: na umówienie\n\nLekcje 7 dni w tygodniu według Twoich potrzeb!",
        
        "test poziomu": "📊 **Test poziomu języka:**\nMamy darmowy 5-minutowy test dla 5 języków (angielski, francuski, niemiecki, hiszpański, włoski). Test ocenia poziom A1-C2 i daje rekomendacje kursów.\n\n[Zrób test teraz](#test-poziomowania)",
        
        "języki": "🌍 **Dostępne języki:**\n• 🇬🇧 Angielski\n• 🇫🇷 Francuski  \n• 🇩🇪 Niemiecki\n• 🇪🇸 Hiszpański\n• 🇮🇹 Włoski\n\nWszystkie poziomy od A1 do C2!",
        
        "bezpłatna lekcja": "🎁 **Bezpłatna lekcja próbna:**\n• 60 minut z doświadczonym lektorem\n• Test poziomu i analiza potrzeb\n• Indywidualny plan nauki\n• Bez zobowiązań\n\n[Umów się teraz](#kontakt)",
        
        "materiały": "📚 **Materiały do nauki:**\n• Interaktywne podręczniki online\n• Nagrania audio z native speakerami\n• Ćwiczenia gramatyczne\n• Gry edukacyjne\n• Dostęp 24/7 do platformy",
        
        "metody": "🎯 **Metody nauczania:**\n• Komunikacyjna metoda nauki\n• Praktyczne konwersacje\n• Gramatyka w kontekście\n• Multimedia i technologie\n• Dostosowanie do stylu uczenia",
        
        "poziom": "📊 **Test poziomu:**\nPrzeprowadzamy bezpłatny test poziomowania przed rozpoczęciem kursu. Pomaga dobrać odpowiedni program nauki!\n\n[Zrób test online](#test-poziomowania)",
        
        "bezpłatna": "🎁 **Bezpłatna lekcja próbna:**\nTak! Pierwsza lekcja (60 min) jest zawsze bezpłatna. Świetna okazja żeby sprawdzić naszą metodę!\n\n[Umów się teraz](#kontakt)",
        
        "indywidualne": "👥 **Lekcje indywidualne:**\nWszystkie lekcje prowadzone indywidualnie - dostosowujemy tempo i metodę do Twoich potrzeb!",
        
        "kontakt": "📞 **Kontakt:**\n• Email: kontakt@akademiapoliglotki.pl\n• Telefon: +48 123 456 789\n• Formularz kontaktowy na stronie\n\n[Napisz do nas](#kontakt)",
        
        "default": "🤖 **PoliglotkAI (tryb offline)**\n\nCześć! Jestem PoliglotkAI, ale aktualnie działam w trybie offline. Mogę odpowiedzieć na najczęstsze pytania:\n\n📌 **Popularne tematy:**\n• 💰 Ile kosztują lekcje?\n• 🚀 Jak zacząć naukę?\n• ⏰ Jakie są godziny lekcji?\n• 🎁 Czy oferujecie bezpłatną lekcję?\n• 📊 Jak sprawdzić poziom języka?\n\nZadaj pytanie używając słów kluczowych lub skontaktuj się bezpośrednio:\n📧 kontakt@akademiapoliglotki.pl\n📞 +48 123 456 789"
      }
      
      // Smart response matching
      const findBestResponse = (query) => {
        const lowerQuery = query.toLowerCase()
        
        // Exact keyword matching
        for (const [key, response] of Object.entries(fallbackResponses)) {
          if (key !== 'default' && lowerQuery.includes(key)) {
            return response
          }
        }
        
        // Fuzzy matching for common variations
        if (lowerQuery.includes('cena') || lowerQuery.includes('koszt') || lowerQuery.includes('ile') || lowerQuery.includes('płacić')) {
          return fallbackResponses["ile kosztują lekcje"]
        }
        if (lowerQuery.includes('zaczać') || lowerQuery.includes('rozpocząć') || lowerQuery.includes('start')) {
          return fallbackResponses["jak zacząć"]
        }
        if (lowerQuery.includes('godzin') || lowerQuery.includes('czas') || lowerQuery.includes('kiedy')) {
          return fallbackResponses["godziny"]
        }
        if (lowerQuery.includes('język') || lowerQuery.includes('course') || lowerQuery.includes('kurs')) {
          return fallbackResponses["języki"]
        }
        if (lowerQuery.includes('darmowa') || lowerQuery.includes('gratis') || lowerQuery.includes('bezpłat')) {
          return fallbackResponses["bezpłatna lekcja"]
        }
        if (lowerQuery.includes('test') || lowerQuery.includes('poziom') || lowerQuery.includes('sprawdz')) {
          return fallbackResponses["test poziomu"]
        }
        if (lowerQuery.includes('materiał') || lowerQuery.includes('podręcznik') || lowerQuery.includes('książka')) {
          return fallbackResponses["materiały"]
        }
        if (lowerQuery.includes('metod') || lowerQuery.includes('jak uczysz') || lowerQuery.includes('sposób')) {
          return fallbackResponses["metody"]
        }
        if (lowerQuery.includes('indywidu') || lowerQuery.includes('1:1') || lowerQuery.includes('grupowe')) {
          return fallbackResponses["indywidualne"]
        }
        if (lowerQuery.includes('kontakt') || lowerQuery.includes('napisać') || lowerQuery.includes('email') || lowerQuery.includes('telefon')) {
          return fallbackResponses["kontakt"]
        }
        
        return fallbackResponses["default"]
      }
      
      const responseText = findBestResponse(textToSend)
      
      const botMessage = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chatbot Toggle Button with Notification */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && showNotification && (
          <div className="absolute -top-16 -left-40 bg-white rounded-lg shadow-lg p-3 animate-slideIn">
            <button
              onClick={() => setShowNotification(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 flex items-center justify-center text-xs"
            >
              ×
            </button>
            <p className="text-sm font-medium text-gray-800">
              Masz pytanie? <span className="text-blue-600">PoliglotkAI</span> pomoże! 🤖
            </p>
          </div>
        )}
        <Button
          onClick={() => {
            setIsOpen(!isOpen)
            setShowNotification(false)
          }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-slate-700 to-blue-600 hover:from-slate-800 hover:to-blue-700 text-white shadow-lg transition-all duration-300 transform hover:scale-110 relative"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
          )}
        </Button>
      </div>

      {/* Chatbot Window - Enhanced and Bigger */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 md:w-[450px] h-[600px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 z-50 flex flex-col overflow-hidden animate-slideIn">
          {/* Header with PoliglotkAI branding */}
          <div className="bg-gradient-to-r from-slate-700 to-blue-600 text-white p-5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="w-8 h-8 animate-pulse" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <span className="font-bold text-lg">PoliglotkAI</span>
                <p className="text-xs text-white/80">Twój inteligentny asystent językowy</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages with enhanced styling */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-slate-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div className={`flex items-start space-x-3 max-w-[85%]`}>
                  {message.sender === 'bot' && (
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-2xl shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-slate-700 to-blue-600 text-white ml-12'
                        : 'bg-white text-slate-800 border border-slate-200'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <p className="text-xs font-semibold text-blue-600 mb-1">PoliglotkAI</p>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                    <p className="text-xs opacity-60 mt-2">
                      {message.timestamp.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md">
                        <User className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Enhanced Suggested Questions */}
            {showSuggestions && messages.length === 1 && (
              <div className="space-y-3 animate-fadeIn">
                <p className="text-sm font-medium text-slate-600 text-center">💡 Co Cię interesuje?</p>
                <div className="grid grid-cols-2 gap-2">
                  {suggestedQuestions.slice(0, 6).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => sendMessage(question)}
                      className="p-3 text-xs bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-slate-700 rounded-xl transition-all duration-200 border border-blue-200 hover:border-blue-300 hover:shadow-md transform hover:scale-105"
                    >
                      <span className="block font-medium">{question}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* Enhanced typing indicator */}
            {isLoading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                      <Bot className="w-6 h-6 text-white animate-pulse" />
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                    <p className="text-xs font-semibold text-blue-600 mb-1">PoliglotkAI pisze...</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input Area */}
          <div className="p-5 border-t border-slate-200/50 bg-gradient-to-b from-white to-slate-50">
            {/* Quick Actions */}
            <div className="flex space-x-2 mb-3">
              <button
                onClick={() => sendMessage("🇬🇧 Przetłumacz na angielski")}
                className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors"
              >
                🇬🇧 EN
              </button>
              <button
                onClick={() => sendMessage("🇫🇷 Przetłumacz na francuski")}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              >
                🇫🇷 FR
              </button>
              <button
                onClick={() => sendMessage("🇩🇪 Przetłumacz na niemiecki")}
                className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200 transition-colors"
              >
                🇩🇪 DE
              </button>
              <button
                onClick={() => sendMessage("📝 Sprawdź gramatykę")}
                className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
              >
                📝 Gramatyka
              </button>
            </div>
            <div className="flex space-x-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Napisz wiadomość do PoliglotkAI..."
                className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                disabled={isLoading}
                rows="2"
              />
              <Button
                onClick={() => sendMessage()}
                disabled={!inputText.trim() || isLoading}
                className="bg-gradient-to-r from-slate-700 to-blue-600 hover:from-slate-800 hover:to-blue-700 text-white px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              Powered by Dolphin Mistral AI • Wpisz w dowolnym języku
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot