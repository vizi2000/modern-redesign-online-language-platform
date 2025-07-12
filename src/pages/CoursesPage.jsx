import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import WorkingCourses from '@/components/WorkingCourses.jsx'
import Pricing from '@/components/Pricing.jsx'
import { ArrowLeft, BookOpen, Star, Users, Clock } from 'lucide-react'

const CoursesPage = () => {
  const pageTitle = "Kursy językowe - Akademia Poliglotki"
  
  // Set page title
  useState(() => {
    document.title = pageTitle
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <div className="flex items-center mb-8">
            <Link to="/" className="flex items-center text-slate-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Powrót do strony głównej
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-slate-800 mb-4">
              Kursy <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">językowe</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Wybierz spośród 5 języków i rozpocznij swoją przygodę z nauką. 
              Każdy kurs dopasowany do Twojego poziomu i potrzeb.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white/80 backdrop-blur-xl rounded-lg p-6 text-center border border-slate-200/50 shadow-lg">
              <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">5</div>
              <div className="text-slate-600">Języków</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xl rounded-lg p-6 text-center border border-slate-200/50 shadow-lg">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">500+</div>
              <div className="text-slate-600">Uczniów</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xl rounded-lg p-6 text-center border border-slate-200/50 shadow-lg">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">4.9/5</div>
              <div className="text-slate-600">Ocena</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xl rounded-lg p-6 text-center border border-slate-200/50 shadow-lg">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">60 min</div>
              <div className="text-slate-600">Lekcja</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <WorkingCourses />

      {/* Pricing Section */}
      <Pricing />

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Gotowy, aby rozpocząć naukę?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Umów bezpłatną lekcję próbną i przekonaj się, jak skuteczne są nasze metody
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/rezerwacja">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 font-semibold"
              >
                Umów bezpłatną lekcję
              </Button>
            </Link>
            <Link to="/test-poziomu">
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 font-semibold"
              >
                Sprawdź swój poziom
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CoursesPage