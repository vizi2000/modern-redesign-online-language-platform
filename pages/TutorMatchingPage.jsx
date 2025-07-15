import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, User } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

const TutorMatchingPage = () => {
  const [matches, setMatches] = useState([])

  const handleMatch = async () => {
    const sampleStudent = {
      name: 'Jan',
      current_level: 'A2',
      target_level: 'B2',
      learning_preferences: ['visual', 'grammar'],
      availability: ['Mon 18', 'Wed 18'],
      personality_traits: ['friendly'],
      learning_goals: ['travel'],
      budget_range: { min: 50, max: 100 }
    }
    const res = await fetch('/api/match-tutors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sampleStudent)
    })
    const data = await res.json()
    setMatches(data)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>Dopasowanie lektora - Akademia Poliglotki</title>
      </Head>
      <section className="pt-24 pb-8 px-4 bg-gradient-to-br from-green-50 via-white to-lime-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center mb-8">
            <Link href="/" className="flex items-center text-slate-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Powrót do strony głównej
            </Link>
          </div>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-green-600 mr-3" />
              <h1 className="text-5xl font-bold text-slate-800">
                Dopasowanie <span className="bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent">lektora</span>
              </h1>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Sprawdź, którzy tutorzy najlepiej pasują do Twoich potrzeb.
            </p>
            <Button onClick={handleMatch} className="mt-6 bg-gradient-to-r from-slate-700 to-blue-600 text-white">
              Znajdź tutora
            </Button>
          </div>
          {matches.length > 0 && (
            <div className="mt-10 space-y-4">
              {matches.map(m => (
                <div key={m.tutor.id} className="p-4 bg-white rounded-xl shadow">
                  <p className="font-semibold">{m.tutor.name}</p>
                  <p>Dopasowanie: {Math.round(m.match_score * 100)}%</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default TutorMatchingPage
