import { useState } from 'react'
import { Link } from 'react-router-dom'
import Pricing from '@/components/Pricing.jsx'
import PaymentGateway from '@/components/PaymentGateway.jsx'
import { ArrowLeft, CreditCard } from 'lucide-react'

const PricingPage = () => {
  const pageTitle = "Cennik i płatności - Akademia Poliglotki"
  
  // Set page title
  useState(() => {
    document.title = pageTitle
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 bg-gradient-to-br from-green-50 via-white to-blue-50">
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
              <CreditCard className="w-12 h-12 text-green-600 mr-3" />
              <h1 className="text-5xl font-bold text-slate-800">
                Cennik i <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">płatności</span>
              </h1>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Przejrzyste ceny bez ukrytych kosztów. 
              Wybierz pakiet dopasowany do swoich potrzeb i budżetu.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Content */}
      <Pricing />

      {/* Payment Gateway */}
      <PaymentGateway />
    </div>
  )
}

export default PricingPage