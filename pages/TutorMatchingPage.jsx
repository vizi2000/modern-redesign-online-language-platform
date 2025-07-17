import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { ArrowLeft, Users } from 'lucide-react'

const TutorMatchingPage = () => {
  const pageTitle = 'Dopasuj korepetytora - Akademia Poliglotki'
  const [studentId, setStudentId] = useState('')
  const [tutors, setTutors] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/match-tutors?studentId=${encodeURIComponent(studentId)}`)
      if (!res.ok) throw new Error('Network response was not ok')
      const data = await res.json()
      setTutors(data.tutors || [])
    } catch (err) {
      console.error(err)
      setError('Wystąpił błąd podczas pobierania danych')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {/* Hero */}
      <section className="pt-24 pb-8 px-4 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center mb-8">
            <Link href="/" className="flex items-center text-slate-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Powrót do strony głównej
            </Link>
          </div>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-12 h-12 text-purple-600 mr-3" />
              <h1 className="text-5xl font-bold text-slate-800">
                Dopasuj <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">korepetytora</span>
              </h1>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Wprowadź ID ucznia, aby znaleźć najlepiej dopasowanych lektorów.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex items-center space-x-2">
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="ID ucznia"
              className="flex-1 border border-slate-300 rounded-lg px-4 py-2"
              required
            />
            <Button type="submit" disabled={loading} className="px-6">
              {loading ? 'Szukam...' : 'Szukaj'}
            </Button>
          </form>
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </div>
      </section>

      {/* Results */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl grid gap-6">
          {tutors.map((tutor) => (
            <Card key={tutor.id} className="bg-white shadow-md">
              <CardContent>
                <h3 className="text-xl font-semibold text-slate-800 mb-1">{tutor.name}</h3>
                <p className="text-slate-600 mb-2">{tutor.qualification}</p>
                <p className="text-slate-500">Dopasowanie: <span className="font-medium">{tutor.score}%</span></p>
              </CardContent>
            </Card>
          ))}
          {!loading && tutors.length === 0 && (
            <p className="text-center text-slate-600">Brak wyników do wyświetlenia.</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default TutorMatchingPage
