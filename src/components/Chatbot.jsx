import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, X, Bot, User } from 'lucide-react'
import { Button } from './ui/button.jsx'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Cześć! 👋 Jestem Twoim asystentem językowym AI (Dolphin Mistral). Mogę pomóc Ci z nauką języków, odpowiedzieć na pytania o kursy lub po prostu porozmawiać w różnych językach. Jak mogę Ci pomóc?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
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
              content: 'Jesteś pomocnym asystentem językowym dla Akademii Poliglotki - szkoły języków online. Pomagasz uczniom w nauce języków obcych, odpowiadasz na pytania o kursy, metody nauki i motywujesz do nauki. Odpowiadaj w języku polskim, ale możesz również używać innych języków jeśli użytkownik o to poprosi. Bądź przyjazny, pomocny i zachęcający. Trzymaj odpowiedzi w rozsądnych granicach długości.'
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
        
        "default": "🤖 **Asystent AI Dolphin Mistral (tryb offline)**\n\nDziękuję za pytanie! Aktualnie połączenie z modelem AI jest niedostępne, działam w trybie podstawowym. Oto najczęściej zadawane pytania:\n\n• Ile kosztują lekcje?\n• Jak zacząć naukę?\n• Jakie są godziny lekcji?\n• Czy oferujecie bezpłatną lekcję?\n• Jak sprawdzić poziom języka?\n\nMożesz też skontaktować się bezpośrednio:\n📧 kontakt@akademiapoliglotki.pl\n📞 +48 123 456 789"
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
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-slate-700 to-blue-600 hover:from-slate-800 hover:to-blue-700 text-white shadow-lg transition-all duration-300 transform hover:scale-110"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-700 to-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">Asystent Językowy</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-slate-700 to-blue-600 text-white'
                      : 'bg-slate-100 text-slate-800 border border-slate-200'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && (
                      <Bot className="w-4 h-4 mt-0.5 text-slate-600" />
                    )}
                    {message.sender === 'user' && (
                      <User className="w-4 h-4 mt-0.5 text-white" />
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Suggested Questions */}
            {showSuggestions && messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-slate-500 text-center">Sugerowane pytania:</p>
                <div className="space-y-1">
                  {suggestedQuestions.slice(0, 5).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => sendMessage(question)}
                      className="w-full text-left p-2 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors border border-blue-200"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 border border-slate-200 p-3 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-slate-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200/50">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Napisz wiadomość..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputText.trim() || isLoading}
                className="bg-gradient-to-r from-slate-700 to-blue-600 hover:from-slate-800 hover:to-blue-700 text-white p-2 rounded-lg transition-all duration-300"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot