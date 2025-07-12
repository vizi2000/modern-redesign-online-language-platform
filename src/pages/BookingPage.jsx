import { useState } from 'react'
import { Link } from 'react-router-dom'
import BookingSystem from '@/components/BookingSystem.jsx'
import { ArrowLeft, Calendar } from 'lucide-react'

const BookingPage = () => {
  const pageTitle = "Rezerwacja lekcji - Akademia Poliglotki"
  
  // Set page title
  useState(() => {
    document.title = pageTitle
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 bg-gradient-to-br from-orange-50 via-white to-red-50">
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
              <Calendar className="w-12 h-12 text-orange-600 mr-3" />
              <h1 className="text-5xl font-bold text-slate-800">
                Rezerwacja <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">lekcji</span>
              </h1>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Umów się na bezpłatną lekcję próbną lub wybierz inną opcję. 
              Elastyczne terminy dopasowane do Twojego grafiku.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Content */}
      <BookingSystem />
    </div>
  )
}

export default BookingPage