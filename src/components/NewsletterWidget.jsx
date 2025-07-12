import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Mail, CheckCircle } from 'lucide-react'

const NewsletterWidget = ({ variant = 'default', className = '' }) => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.includes('@')) return

    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Track newsletter signup
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'newsletter_signup', {
        event_category: 'engagement',
        event_label: `widget_${variant}`,
        value: 1
      })
    }

    setIsSubscribed(true)
    setIsLoading(false)
    setEmail('')
  }

  if (isSubscribed) {
    return (
      <div className={`p-4 bg-green-50 border border-green-200 rounded-lg ${className}`}>
        <div className="flex items-center text-green-700">
          <CheckCircle className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Dziękujemy za subskrypcję!</span>
        </div>
      </div>
    )
  }

  if (variant === 'footer') {
    return (
      <div className={className}>
        <h3 className="font-semibold mb-4 text-white">Newsletter</h3>
        <p className="text-gray-400 text-sm mb-4">
          Cotygodniowe porady o nauce języków
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Twój email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            required
          />
          <Button 
            type="submit"
            disabled={isLoading}
            size="sm"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Zapisz się
              </>
            )}
          </Button>
        </form>
      </div>
    )
  }

  if (variant === 'sidebar') {
    return (
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
        <h3 className="font-semibold text-blue-800 mb-2">
          📧 Zapisz się do newslettera
        </h3>
        <p className="text-blue-600 text-sm mb-4">
          Otrzymuj porady o nauce języków
        </p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="email"
            placeholder="Twój email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
            required
          />
          <Button 
            type="submit"
            disabled={isLoading}
            size="sm"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? '...' : 'Zapisz się'}
          </Button>
        </form>
      </div>
    )
  }

  // Default compact widget
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <input
        type="email"
        placeholder="Twój email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
        required
      />
      <Button 
        onClick={handleSubmit}
        disabled={isLoading || !email.includes('@')}
        size="sm"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg px-4"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        ) : (
          <Mail className="w-4 h-4" />
        )}
      </Button>
    </div>
  )
}

export default NewsletterWidget