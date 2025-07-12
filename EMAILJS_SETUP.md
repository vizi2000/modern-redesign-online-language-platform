# 📧 EmailJS Configuration Guide

## Konfiguracja EmailJS dla Contact Form

### Krok 1: Utworzenie konta EmailJS

1. **Rejestracja**: https://www.emailjs.com/
2. **Wybierz plan**: Free (200 emails/month) lub płatny
3. **Potwierdź email**

### Krok 2: Konfiguracja Email Service

1. **Dashboard** → **Email Services** → **Add New Service**
2. **Wybierz provider**:
   - Gmail (najłatwiejszy)
   - Outlook
   - Yahoo
   - Lub SMTP dla własnej domeny

3. **Dla Gmail**:
   - Service ID: `service_akademia_poliglotki`
   - User ID: `kontakt@akademiapoliglotki.pl`
   - OAuth2 autoryzacja

### Krok 3: Utworzenie Email Template

1. **Dashboard** → **Email Templates** → **Create New Template**
2. **Template ID**: `template_contact_form`
3. **Template Content**:

```html
Subject: 📚 Nowe zapytanie - {{from_name}}

Nowe zapytanie z formularza kontaktowego Akademii Poliglotki:

👤 Imię: {{from_name}}
📧 Email: {{from_email}}
📱 Telefon: {{phone}}
🌍 Język: {{language}}
📊 Poziom: {{level}}
💬 Preferowany kontakt: {{preferred_contact}}

📝 Wiadomość:
{{message}}

---
Automatyczna wiadomość z akademiapoliglotki.pl
```

### Krok 4: Konfiguracja Public Key

1. **Dashboard** → **Account** → **General**
2. **Skopiuj Public Key**
3. **Zastąp w kodzie**:

```jsx
const publicKey = 'YOUR_ACTUAL_PUBLIC_KEY_HERE'
```

### Krok 5: Testowanie

```bash
# Build i test lokalnie
npm run build
npm run dev

# Test formularza na http://localhost:3003
```

## 🔧 Obecna Konfiguracja w Kodzie

### ContactForm.jsx
```jsx
// EmailJS configuration
const serviceID = 'service_akademia_poliglotki'
const templateID = 'template_contact_form'
const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY' // ← ZMIEŃ TO

// Template parameters
const templateParams = {
  from_name: formData.name,
  from_email: formData.email,
  phone: formData.phone || 'Nie podano',
  language: formData.language || 'Nie wybrano',
  level: formData.level || 'Nie wybrano',
  preferred_contact: formData.preferredContact === 'email' ? 'Email' : 'Telefon',
  message: formData.message,
  to_email: 'kontakt@akademiapoliglotki.pl'
}
```

## 🎯 Korzyści EmailJS

### ✅ Zalety
- **Darmowe 200 emails/miesiąc**
- **Bez backend-u** - działa frontend-only
- **Łatwa konfiguracja** - 15 minut setup
- **Szablony HTML** - profesjonalne emaile
- **Analytics** - statystyki wysyłania

### ⚠️ Ograniczenia
- **Limit wysyłania** - 200/miesiąc na darmowym planie
- **Bezpieczeństwo** - Public key widoczny w frontend
- **Spam protection** - podstawowy
- **Customization** - ograniczone opcje

## 🚀 Alternatywne Rozwiązania

### 1. Formspree (Backup Option)
```jsx
// Zamień EmailJS na Formspree
const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID'

await fetch(formspreeEndpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
```

### 2. Netlify Forms (Jeśli hosting na Netlify)
```html
<form netlify>
  <!-- Automatyczne przetwarzanie -->
</form>
```

### 3. Własny Backend API
```jsx
// Custom API endpoint
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
```

## 📊 Monitoring i Analytics

### EmailJS Dashboard Metrics
- **Delivery rate** - procent dostarczonych emaili
- **Open rate** - ile osób otworzyło
- **Error tracking** - błędy wysyłania
- **Monthly usage** - wykorzystanie limitu

### Google Analytics Events
```jsx
// Track form submissions
gtag('event', 'form_submit', {
  event_category: 'contact',
  event_label: formData.language
})
```

## 🔐 Bezpieczeństwo

### Zabezpieczenia w EmailJS
- **Rate limiting** - ograniczenie wysyłania
- **Domain whitelist** - tylko z akademiapoliglotki.pl
- **Template validation** - sprawdzanie szablonów
- **Spam filtering** - podstawowa ochrona

### Dodatkowe Zabezpieczenia
```jsx
// Client-side validation
const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const isValidMessage = message.length > 10 && message.length < 1000
const isValidName = name.length > 2 && !/[<>]/.test(name)
```

## 🎯 Następne Kroki

1. **✅ Zaimplementowano**: EmailJS integration w ContactForm.jsx
2. **🔄 Do zrobienia**: 
   - Utwórz konto EmailJS
   - Skonfiguruj service i template
   - Zastąp placeholder public key
   - Przetestuj formularz
3. **🚀 Opcjonalnie**:
   - Dodaj Google Analytics tracking
   - Utwórz backup z Formspree
   - Rozważ własny backend dla większej kontroli

---

**Status**: EmailJS zintegrowany, wymaga konfiguracji konta  
**Priorytet**: 🔴 High - Contact form to krytyczna funkcjonalność biznesowa