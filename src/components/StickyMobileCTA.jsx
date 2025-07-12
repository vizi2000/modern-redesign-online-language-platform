import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Calendar, X, Phone } from 'lucide-react'

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after user scrolls past hero section (about 800px)
      const shouldShow = window.scrollY > 800
      setIsVisible(shouldShow)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBooking = () => {
    document.getElementById('rezerwacja')?.scrollIntoView({ behavior: 'smooth' })
    // Track CTA click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'conversion',
        event_label: 'sticky_mobile_cta',
        cta_type: 'booking',
        cta_location: 'sticky_mobile'
      })
    }
  }

  const handleCall = () => {
    window.location.href = 'tel:+48123456789'
    // Track call click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'phone_call', {
        event_category: 'conversion',
        event_label: 'sticky_mobile_cta'
      })
    }
  }

  if (!isVisible) return null

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-lg">
      {!isMinimized ? (
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Umów bezpłatną lekcję!</h3>
              <p className="text-xs text-slate-600">60 minut • Bez zobowiązań</p>
            </div>
            <button 
              onClick={() => setIsMinimized(true)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleBooking}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 font-semibold"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Rezerwuj online
            </Button>
            
            <Button 
              onClick={handleCall}
              variant="outline"
              className="px-4 py-3 border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              <Phone className="w-4 h-4" />
            </Button>
          </div>
          
          <p className="text-xs text-slate-500 mt-2 text-center">
            ⭐ 98% zadowolonych uczniów • 500+ opinii
          </p>
        </div>
      ) : (
        <div className="p-2">
          <Button 
            onClick={() => setIsMinimized(false)}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 text-sm font-semibold"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Bezpłatna lekcja próbna
          </Button>
        </div>
      )}
    </div>
  )
}

export default StickyMobileCTA