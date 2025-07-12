import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const StructuredData = () => {
  const location = useLocation()

  useEffect(() => {
    // Remove existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]')
    existingScripts.forEach(script => {
      if (script.getAttribute('data-page-specific')) {
        script.remove()
      }
    })

    // Add page-specific structured data
    const structuredData = getStructuredDataForPage(location.pathname)
    if (structuredData) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-page-specific', 'true')
      script.textContent = JSON.stringify(structuredData)
      document.head.appendChild(script)
    }
  }, [location.pathname])

  return null
}

const getStructuredDataForPage = (pathname) => {
  const baseOrganization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Akademia Poliglotki",
    "alternateName": "Academy of Polyglots",
    "url": "https://akademiapoliglotki.pl",
    "logo": "https://akademiapoliglotki.pl/logo.png",
    "description": "Platforma do nauki języków obcych online z doświadczonym lektorem",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PL",
      "addressRegion": "Poland"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+48-123-456-789",
      "contactType": "customer service",
      "email": "kontakt@akademiapoliglotki.pl",
      "availableLanguage": ["Polish", "English", "French", "German", "Spanish", "Italian"]
    },
    "sameAs": [
      "https://facebook.com/akademiapoliglotki",
      "https://instagram.com/akademiapoliglotki"
    ]
  }

  switch (pathname) {
    case '/':
      return {
        ...baseOrganization,
        "offers": [
          {
            "@type": "Offer",
            "name": "Bezpłatna lekcja próbna",
            "description": "60-minutowa lekcja z doświadczonym lektorem",
            "price": "0",
            "priceCurrency": "PLN"
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Kursy językowe",
          "itemListElement": [
            {
              "@type": "Course",
              "name": "Kurs angielskiego",
              "description": "Interaktywny kurs języka angielskiego online",
              "provider": baseOrganization
            },
            {
              "@type": "Course",
              "name": "Kurs francuskiego", 
              "description": "Interaktywny kurs języka francuskiego online",
              "provider": baseOrganization
            },
            {
              "@type": "Course",
              "name": "Kurs niemieckiego",
              "description": "Interaktywny kurs języka niemieckiego online", 
              "provider": baseOrganization
            },
            {
              "@type": "Course",
              "name": "Kurs hiszpańskiego",
              "description": "Interaktywny kurs języka hiszpańskiego online",
              "provider": baseOrganization
            },
            {
              "@type": "Course", 
              "name": "Kurs włoskiego",
              "description": "Interaktywny kurs języka włoskiego online",
              "provider": baseOrganization
            }
          ]
        }
      }

    case '/kursy':
      return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Kursy językowe - Akademia Poliglotki",
        "description": "Kompletna oferta kursów językowych online",
        "numberOfItems": 5,
        "itemListElement": [
          {
            "@type": "Course",
            "position": 1,
            "name": "Kurs języka angielskiego",
            "description": "Kompleksowy kurs angielskiego dla wszystkich poziomów",
            "provider": baseOrganization,
            "courseMode": "online",
            "inLanguage": "pl",
            "teaches": "en",
            "offers": {
              "@type": "Offer",
              "price": "199",
              "priceCurrency": "PLN",
              "availability": "https://schema.org/InStock"
            }
          },
          {
            "@type": "Course", 
            "position": 2,
            "name": "Kurs języka francuskiego",
            "description": "Kompleksowy kurs francuskiego dla wszystkich poziomów",
            "provider": baseOrganization,
            "courseMode": "online",
            "inLanguage": "pl",
            "teaches": "fr",
            "offers": {
              "@type": "Offer",
              "price": "199",
              "priceCurrency": "PLN", 
              "availability": "https://schema.org/InStock"
            }
          },
          {
            "@type": "Course",
            "position": 3, 
            "name": "Kurs języka niemieckiego",
            "description": "Kompleksowy kurs niemieckiego dla wszystkich poziomów",
            "provider": baseOrganization,
            "courseMode": "online",
            "inLanguage": "pl", 
            "teaches": "de",
            "offers": {
              "@type": "Offer",
              "price": "199",
              "priceCurrency": "PLN",
              "availability": "https://schema.org/InStock"
            }
          },
          {
            "@type": "Course",
            "position": 4,
            "name": "Kurs języka hiszpańskiego", 
            "description": "Kompleksowy kurs hiszpańskiego dla wszystkich poziomów",
            "provider": baseOrganization,
            "courseMode": "online",
            "inLanguage": "pl",
            "teaches": "es", 
            "offers": {
              "@type": "Offer",
              "price": "199",
              "priceCurrency": "PLN",
              "availability": "https://schema.org/InStock"
            }
          },
          {
            "@type": "Course",
            "position": 5,
            "name": "Kurs języka włoskiego",
            "description": "Kompleksowy kurs włoskiego dla wszystkich poziomów", 
            "provider": baseOrganization,
            "courseMode": "online",
            "inLanguage": "pl",
            "teaches": "it",
            "offers": {
              "@type": "Offer", 
              "price": "199",
              "priceCurrency": "PLN",
              "availability": "https://schema.org/InStock"
            }
          }
        ]
      }

    case '/blog':
      return {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Blog o nauce języków - Akademia Poliglotki",
        "description": "Praktyczne porady, ciekawostki kulturowe i motywacja do nauki języków obcych",
        "url": "https://akademiapoliglotki.pl/blog",
        "publisher": baseOrganization,
        "inLanguage": "pl",
        "about": [
          {
            "@type": "Thing",
            "name": "Nauka języków obcych"
          },
          {
            "@type": "Thing", 
            "name": "Motywacja do nauki"
          },
          {
            "@type": "Thing",
            "name": "Metody nauczania"
          }
        ]
      }

    case '/materialy':
      return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Darmowe materiały do nauki języków",
        "description": "Kolekcja darmowych materiałów edukacyjnych do nauki języków obcych", 
        "numberOfItems": 6,
        "itemListElement": [
          {
            "@type": "DigitalDocument",
            "position": 1,
            "name": "1000 najważniejszych słów - Angielski",
            "description": "Lista najczęściej używanych słów w języku angielskim z przykładami użycia",
            "encodingFormat": "application/pdf",
            "fileSize": "2.3MB",
            "isAccessibleForFree": true,
            "publisher": baseOrganization
          },
          {
            "@type": "DigitalDocument", 
            "position": 2,
            "name": "Przewodnik po czasach angielskich",
            "description": "Kompletny przewodnik po wszystkich czasach w języku angielskim z ćwiczeniami",
            "encodingFormat": "application/pdf",
            "fileSize": "4.1MB", 
            "isAccessibleForFree": true,
            "publisher": baseOrganization
          }
        ]
      }

    case '/test-poziomu':
      return {
        "@context": "https://schema.org",
        "@type": "EducationalOccupationalProgram",
        "name": "Test poziomu języka - CEFR",
        "description": "Bezpłatny test sprawdzający poziom znajomości języka według standardów CEFR",
        "provider": baseOrganization,
        "occupationalCategory": "Language Learning",
        "educationalCredentialAwarded": "CEFR Level Assessment",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "PLN"
        }
      }

    case '/cennik':
      return {
        "@context": "https://schema.org",
        "@type": "ItemList", 
        "name": "Cennik kursów językowych",
        "description": "Przejrzyste ceny pakietów językowych bez ukrytych kosztów",
        "itemListElement": [
          {
            "@type": "Offer",
            "position": 1,
            "name": "Pakiet Starter", 
            "description": "4 lekcje indywidualne po 60 minut",
            "price": "750",
            "priceCurrency": "PLN",
            "seller": baseOrganization,
            "availability": "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            "position": 2,
            "name": "Pakiet Standard",
            "description": "8 lekcji indywidualnych po 60 minut",
            "price": "1400", 
            "priceCurrency": "PLN",
            "seller": baseOrganization,
            "availability": "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            "position": 3,
            "name": "Pakiet Premium",
            "description": "16 lekcji indywidualnych po 60 minut", 
            "price": "2499",
            "priceCurrency": "PLN",
            "seller": baseOrganization,
            "availability": "https://schema.org/InStock"
          }
        ]
      }

    case '/kontakt':
      return {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Kontakt - Akademia Poliglotki",
        "description": "Skontaktuj się z nami - odpowiemy na wszystkie pytania o nauce języków",
        "mainEntity": baseOrganization
      }

    default:
      return baseOrganization
  }
}

export default StructuredData