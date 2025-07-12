import { useState } from 'react'
import { Link } from 'react-router-dom'
import LanguageLevelTest from '@/components/LanguageLevelTest.jsx'
import { ArrowLeft, Award } from 'lucide-react'

const TestPage = () => {
  const pageTitle = "Test poziomu języka - Akademia Poliglotki"
  
  // Set page title
  useState(() => {
    document.title = pageTitle
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <div className="flex items-center mb-8">
            <Link to="/" className="flex items-center text-slate-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Powrót do strony głównej
            </Link>
          </div>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Award className="w-12 h-12 text-blue-600 mr-3" />
              <h1 className="text-5xl font-bold text-slate-800">
                Test <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">poziomu</span>
              </h1>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Sprawdź swój aktualny poziom znajomości języka. 
              Bezpłatny test CEFR dla 5 języków z natychmiastowymi wynikami.
            </p>
          </div>
        </div>
      </section>

      {/* Test Content */}
      <LanguageLevelTest />
    </div>
  )
}

export default TestPage