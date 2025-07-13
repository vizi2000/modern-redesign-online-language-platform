import Head from 'next/head'
import Link from 'next/link'
import FreeMaterials from '@/components/FreeMaterials.jsx'
import { ArrowLeft, Gift } from 'lucide-react'

const MaterialsPage = () => {
  const pageTitle = "Darmowe materiały do nauki języków - Akademia Poliglotki"
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <div className="flex items-center mb-8">
            <Link href="/" className="flex items-center text-slate-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Powrót do strony głównej
            </Link>
          </div>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Gift className="w-12 h-12 text-green-600 mr-3" />
              <h1 className="text-5xl font-bold text-slate-800">
                Darmowe <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">materiały</span>
              </h1>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Pobierz wartościowe materiały do nauki języków całkowicie za darmo. 
              Przewodniki, słowniczki i ćwiczenia stworzone przez ekspertów.
            </p>
          </div>
        </div>
      </section>

      {/* Materials Content */}
      <FreeMaterials />
    </div>
  )
}

export default MaterialsPage