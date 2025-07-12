# 💳 Stripe Payment Integration Guide

## Aktualny Status
✅ **Frontend gotowy** - PaymentGateway component z pełnym UI  
⚠️ **Backend wymagany** - Potrzebny endpoint do tworzenia Stripe sessions  
⚠️ **Klucze API** - Wymagana konfiguracja Stripe  

## Krok 1: Utworzenie konta Stripe

### Rejestracja
1. **Idź na**: https://stripe.com/
2. **Utwórz konto**: Wybierz "Start now"
3. **Weryfikacja**: Potwierdź email i dodaj informacje biznesowe
4. **Aktywacja**: Ukończ proces weryfikacji

### Pozyskanie kluczy API
```bash
# Dashboard → Developers → API keys
# Test keys (do rozwoju):
pk_test_51... # Publishable key (frontend)
sk_test_51... # Secret key (backend)

# Live keys (produkcja):
pk_live_51... # Publishable key 
sk_live_51... # Secret key
```

## Krok 2: Konfiguracja Frontend

### Aktualizacja klucza publicznego
```jsx
// src/components/PaymentGateway.jsx
const stripePromise = loadStripe('pk_test_51234567890_your_stripe_publishable_key')
//                                ↑ Zamień na swój rzeczywisty klucz
```

### Zmienne środowiskowe (zalecane)
```bash
# .env.local
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51...
```

```jsx
// src/components/PaymentGateway.jsx
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
```

## Krok 3: Backend Implementation

### Potrzebny endpoint: `/api/create-checkout-session`

```javascript
// backend/api/checkout.js (przykład Node.js/Express)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { packageId, amount, description } = req.body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'blik', 'p24'],
      currency: 'pln',
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'pln',
            product_data: {
              name: description,
              description: `Pakiet lekcji - ${description}`,
            },
            unit_amount: amount, // w groszach
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        packageId: packageId,
      },
    })

    res.json({ sessionId: session.id })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
```

### Aktualizacja PaymentGateway.jsx
```jsx
// src/components/PaymentGateway.jsx
const handlePayment = async () => {
  try {
    // Wywołanie backend endpoint
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        packageId: selectedPackage.id,
        amount: selectedPackage.price * 100,
        description: selectedPackage.name,
      }),
    })

    const { sessionId } = await response.json()

    // Przekierowanie do Stripe Checkout
    const stripe = await stripePromise
    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId,
    })

    if (error) {
      console.error('Stripe error:', error)
      setPaymentError(error.message)
    }
  } catch (error) {
    console.error('Payment error:', error)
    setPaymentError('Wystąpił błąd podczas przetwarzania płatności.')
  }
}
```

## Krok 4: Webhook Configuration

### Endpoint dla webhooks
```javascript
// backend/api/webhooks.js
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object
      console.log('Payment succeeded:', session.id)
      
      // Tutaj: Aktywuj pakiet lekcji dla użytkownika
      // 1. Pobierz packageId z session.metadata
      // 2. Utwórz rekord w bazie danych
      // 3. Wyślij email potwierdzający
      
      break
    case 'payment_intent.payment_failed':
      console.log('Payment failed:', event.data.object)
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  res.json({received: true})
})
```

### Konfiguracja w Stripe Dashboard
1. **Dashboard** → **Developers** → **Webhooks**
2. **Add endpoint**: `https://yourdomain.com/webhook`
3. **Wybierz events**: `checkout.session.completed`, `payment_intent.payment_failed`
4. **Skopiuj webhook secret** do zmiennych środowiskowych

## Krok 5: Testowanie

### Test cards (tryb testowy)
```
Successful payment: 4242 4242 4242 4242
Declined payment:   4000 0000 0000 0002
3D Secure:          4000 0025 0000 3155
```

### Test workflow
1. Wybierz pakiet na stronie
2. Kliknij "Przejdź do płatności"
3. Użyj testowej karty
4. Sprawdź webhook delivery w Dashboard

## Krok 6: Polskie metody płatności

### Konfiguracja BLIK i Przelewy24
```javascript
// W checkout session
payment_method_types: [
  'card',
  'blik',        // Polski BLIK
  'p24',         // Przelewy24
  'bancontact',  // Opcjonalnie
],
```

### Wymagania prawne
- **Regulamin** - Warunki sprzedaży
- **Polityka prywatności** - RODO compliance
- **Dane firmy** - NIP, REGON w footer
- **Faktury** - Integracja z systemem księgowym

## Krok 7: Monitoring i Analytics

### Stripe Dashboard Metrics
- **Revenue tracking** - Przychody w czasie
- **Payment success rate** - Skuteczność płatności
- **Geographic breakdown** - Analiza geograficzna
- **Failed payments** - Analiza błędów

### Google Analytics Events
```javascript
// Tracking payment events
gtag('event', 'purchase', {
  transaction_id: session.id,
  value: selectedPackage.price,
  currency: 'PLN',
  items: [{
    item_id: selectedPackage.id,
    item_name: selectedPackage.name,
    price: selectedPackage.price,
    quantity: 1
  }]
})
```

## Krok 8: Bezpieczeństwo

### Best Practices
```javascript
// Weryfikacja kwoty po stronie serwera
app.post('/api/create-checkout-session', async (req, res) => {
  const { packageId } = req.body
  
  // Pobierz cenę z bazy danych, NIE z frontendu
  const packagePrice = await getPackagePrice(packageId)
  
  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        unit_amount: packagePrice * 100, // Z serwera!
      },
      quantity: 1,
    }],
    // ...
  })
})
```

### Rate Limiting
```javascript
// Ograniczenie żądań API
const rateLimit = require('express-rate-limit')

const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minut
  max: 5 // max 5 płatności na IP
})

app.use('/api/create-checkout-session', paymentLimiter)
```

## Krok 9: Deployment

### Zmienne środowiskowe (produkcja)
```bash
# .env.production
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=https://akademiapoliglotki.pl
```

### SSL Certificate
- **Wymagane** dla Stripe w produkcji
- **Let's Encrypt** - darmowy SSL
- **Cloudflare** - dodatkowa ochrona

## Krok 10: Faktury i księgowość

### Integracja z ifirma/Fakturownia
```javascript
// Po udanej płatności
const issueInvoice = async (sessionData) => {
  await fetch('https://api.ifirma.pl/invoices', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.IFIRMA_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // dane faktury
    })
  })
}
```

## 🎯 Quick Start Checklist

### Do zrobienia natychmiast:
- [ ] Utwórz konto Stripe (5 min)
- [ ] Skopiuj test publishable key
- [ ] Zastąp w PaymentGateway.jsx
- [ ] Przetestuj frontend (działa już!)

### Do zrobienia w następnej kolejności:
- [ ] Stwórz backend endpoint
- [ ] Skonfiguruj webhooks
- [ ] Dodaj faktury
- [ ] Przetestuj z prawdziwymi kartami

## 💡 Alternatywy dla Stripe

### Przelewy24 Direct
```javascript
// Jeśli wolisz polskiego operatora
const p24 = require('przelewy24-node')
```

### PayU
```javascript
// Popularne w Polsce
const payu = require('payu-node-sdk')
```

### DotPay
```javascript
// Lokalny operator płatności
const dotpay = require('dotpay-sdk')
```

---

**Status**: PaymentGateway UI gotowy, wymaga backend implementation  
**Priorytet**: 🔴 High - Krytyczny dla generowania przychodów  
**Czas realizacji**: 4-8 godzin z backend setup  

**Obecny PaymentGateway ma pełne UI i będzie działać po dodaniu backend endpoint!**