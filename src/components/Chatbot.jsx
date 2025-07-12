import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, X, Bot, User } from 'lucide-react'
import { Button } from './ui/button.jsx'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Cześć! 👋 Jestem Twoim asystentem językowym. Mogę pomóc Ci z nauką języków, odpowiedzieć na pytania o kursy lub po prostu porozmawiać w różnych językach. Jak mogę Ci pomóc?",
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
      // Use nginx proxy for Ollama API calls to handle CORS
      const ollamaUrl = '/api/ollama/generate'
      
      const response = await fetch(ollamaUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3:8b',
          prompt: `Jesteś pomocnym asystentem językowym dla Akademii Poliglotki - szkoły języków online. Pomagasz uczniom w nauce języków obcych, odpowiadasz na pytania o kursy, metody nauki i motywujesz do nauki. Odpowiadaj w języku polskim, ale możesz również używać innych języków jeśli użytkownik o to poprosi. Bądź przyjazny, pomocny i zachęcający.

Wiadomość użytkownika: ${textToSend}

Odpowiedź:`,
          stream: false,
          options: {
            temperature: 0.7,
            max_tokens: 500
          }
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error:', error)
      
      // Fallback responses when AI is not available
      const fallbackResponses = {
        "ile kosztują lekcje": "Standardowa cena lekcji indywidualnej to 199 zł za 60 minut. Pierwsza lekcja próbna jest bezpłatna! 💰",
        "jak zacząć": "Aby zacząć naukę, umów się na bezpłatną lekcję próbną. Sprawdzimy Twój poziom i dobierzemy odpowiedni program! 🚀",
        "godziny": "Lekcje dostępne są od poniedziałku do piątku w godzinach 8:00-20:00. Terminy dostosowujemy do Twoich potrzeb! ⏰",
        "poziom": "Przed rozpoczęciem kursu przeprowadzamy bezpłatny test poziomowania. To pomoże nam dobrać odpowiedni program nauki! 📊",
        "bezpłatna": "Tak! Pierwsza lekcja próbna jest zawsze bezpłatna. To świetna okazja, żeby sprawdzić naszą metodę nauczania! 🎁",
        "indywidualne": "Wszystkie nasze lekcje są prowadzone indywidualnie, dzięki czemu możemy dostosować tempo i metodę do Twoich potrzeb! 👥",
        "materiały": "Po każdej lekcji otrzymujesz spersonalizowane materiały: notatki, ćwiczenia, listy słówek i zadania domowe! 📚"
      }
      
      const userTextLower = textToSend.toLowerCase()
      let responseText = "Przepraszam, asystent AI jest obecnie niedostępny. "
      
      // Try to find a relevant fallback response
      for (const [keyword, response] of Object.entries(fallbackResponses)) {
        if (userTextLower.includes(keyword)) {
          responseText = response + "\n\nDla więcej informacji skontaktuj się z nami: kontakt@akademiapoliglotki.pl";
          break;
        }
      }
      
      if (responseText === "Przepraszam, asystent AI jest obecnie niedostępny. ") {
        responseText += "Skontaktuj się z nami bezpośrednio: kontakt@akademiapoliglotki.pl lub telefon +48 123 456 789. Odpowiemy na wszystkie Twoje pytania! 📞";
      }
      
      const errorMessage = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
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