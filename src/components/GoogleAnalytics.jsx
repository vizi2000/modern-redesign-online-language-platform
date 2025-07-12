import { useEffect } from 'react'

// Google Analytics 4 configuration
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX' // Replace with actual measurement ID

const GoogleAnalytics = () => {
  useEffect(() => {
    // Load Google Analytics 4 script
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script1)

    // Initialize gtag
    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true,
        // Enhanced ecommerce and conversion tracking
        custom_map: {
          'custom_parameter_1': 'language_preference',
          'custom_parameter_2': 'user_level'
        }
      });
    `
    document.head.appendChild(script2)

    // Make gtag available globally for tracking events
    window.gtag = window.gtag || function() {
      (window.dataLayer = window.dataLayer || []).push(arguments)
    }

    return () => {
      // Cleanup scripts on unmount
      document.head.removeChild(script1)
      document.head.removeChild(script2)
    }
  }, [])

  return null // This component doesn't render anything
}

// Utility functions for tracking events
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      ...parameters
    })
  }
}

// Specific tracking functions for business events
export const trackFormSubmission = (formType, formData = {}) => {
  trackEvent('form_submit', {
    event_category: 'lead_generation',
    event_label: formType,
    form_type: formType,
    language: formData.language || 'not_specified',
    level: formData.level || 'not_specified',
    custom_parameter_1: formData.language,
    custom_parameter_2: formData.level
  })
}

export const trackTestCompletion = (language, level, score) => {
  trackEvent('test_complete', {
    event_category: 'assessment',
    event_label: `${language}_${level}`,
    value: score,
    language: language,
    level_achieved: level,
    test_score: score,
    custom_parameter_1: language,
    custom_parameter_2: level
  })
}

export const trackBookingStart = (serviceType) => {
  trackEvent('booking_start', {
    event_category: 'conversion',
    event_label: serviceType,
    service_type: serviceType
  })
}

export const trackBookingComplete = (serviceType, bookingData = {}) => {
  trackEvent('booking_complete', {
    event_category: 'conversion',
    event_label: serviceType,
    value: 1,
    service_type: serviceType,
    language: bookingData.language || 'not_specified',
    date_selected: bookingData.date || '',
    custom_parameter_1: bookingData.language
  })
}

export const trackPaymentStart = (packageType, amount) => {
  trackEvent('begin_checkout', {
    event_category: 'ecommerce',
    event_label: packageType,
    value: amount,
    currency: 'PLN',
    package_type: packageType,
    items: [{
      item_id: packageType,
      item_name: packageType,
      currency: 'PLN',
      price: amount,
      quantity: 1
    }]
  })
}

export const trackPaymentComplete = (packageType, amount, transactionId) => {
  trackEvent('purchase', {
    event_category: 'ecommerce',
    event_label: packageType,
    transaction_id: transactionId,
    value: amount,
    currency: 'PLN',
    package_type: packageType,
    items: [{
      item_id: packageType,
      item_name: packageType,
      currency: 'PLN',
      price: amount,
      quantity: 1
    }]
  })
}

export const trackChatbotInteraction = (query, responseType) => {
  trackEvent('chatbot_interaction', {
    event_category: 'engagement',
    event_label: responseType, // 'ai_response' or 'fallback_response'
    query_length: query.length,
    response_type: responseType
  })
}

export const trackNavigation = (sectionName) => {
  trackEvent('section_view', {
    event_category: 'navigation',
    event_label: sectionName,
    section_name: sectionName
  })
}

export const trackCTAClick = (ctaType, location) => {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: `${ctaType}_${location}`,
    cta_type: ctaType,
    cta_location: location
  })
}

export const trackFileDownload = (fileName, fileType) => {
  trackEvent('file_download', {
    event_category: 'engagement',
    event_label: fileName,
    file_name: fileName,
    file_type: fileType
  })
}

export const trackVideoPlay = (videoTitle, videoLocation) => {
  trackEvent('video_play', {
    event_category: 'engagement',
    event_label: videoTitle,
    video_title: videoTitle,
    video_location: videoLocation
  })
}

export const trackUserEngagement = (engagementType, duration = 0) => {
  trackEvent('engagement', {
    event_category: 'user_behavior',
    event_label: engagementType,
    engagement_time_msec: duration,
    engagement_type: engagementType
  })
}

export default GoogleAnalytics