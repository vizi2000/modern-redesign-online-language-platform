import Head from 'next/head'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm.jsx'
import FAQ from '@/components/FAQ.jsx'
import { ArrowLeft, Mail } from 'lucide-react'

const ContactPage = () => {
  const pageTitle = "Kontakt - Akademia Poliglotki"
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 bg-gradient-to-br from-blue-50 via-white to-slate-50">
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
              <Mail className="w-12 h-12 text-blue-600 mr-3" />
              <h1 className="text-5xl font-bold text-slate-800">
                <span className="bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent">Kontakt</span>
              </h1>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Masz pytania? Chcesz dowiedzieć się więcej? 
              Skontaktuj się z nami - odpowiemy na wszystkie Twoje wątpliwości.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section First */}
      <FAQ />

      {/* Contact Form */}
      <ContactForm />
    </div>
  )
}

export default ContactPage