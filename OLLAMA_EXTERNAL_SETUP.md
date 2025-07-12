# 🤖 Ollama External IP Setup Guide

## Problem
Chatbot AI działa tylko na localhost, ale nie na zewnętrznym IP (194.181.240.37:8090) ponieważ Ollama nie jest skonfigurowany do zewnętrznych połączeń.

## Rozwiązanie 1: Uruchom Ollama z zewnętrznym dostępem

### Krok 1: Zatrzymaj Ollama
```bash
# Zatrzymaj aktualny Ollama
sudo systemctl stop ollama
# lub jeśli uruchomiony ręcznie:
pkill -f ollama
```

### Krok 2: Uruchom Ollama z zewnętrznym dostępem
```bash
# Ustaw zmienne środowiskowe dla zewnętrznego dostępu
export OLLAMA_HOST=0.0.0.0:11434
export OLLAMA_ORIGINS="*"

# Uruchom Ollama
ollama serve
```

### Krok 3: Sprawdź czy działa
```bash
# Test lokalny
curl http://localhost:11434/api/tags

# Test zewnętrzny (z innego komputera)
curl http://194.181.240.37:11434/api/tags
```

### Krok 4: Ustaw jako usługę systemową (opcjonalne)
```bash
# Edytuj plik usługi
sudo nano /etc/systemd/system/ollama.service

# Dodaj zmienne środowiskowe:
[Service]
Environment="OLLAMA_HOST=0.0.0.0:11434"
Environment="OLLAMA_ORIGINS=*"
...

# Przeładuj i uruchom
sudo systemctl daemon-reload
sudo systemctl start ollama
sudo systemctl enable ollama
```

## Rozwiązanie 2: SSH Tunnel (bezpieczniejsze)

### Na serwerze (194.181.240.37):
```bash
# Uruchom tunel SSH dla Ollama
ssh -L 11434:localhost:11434 localhost -N -f
```

### W Docker nginx.conf:
```nginx
location /api/ollama/ {
    proxy_pass http://host.docker.internal:11434/api/;
    # ... reszta konfiguracji
}
```

## Rozwiązanie 3: Docker Compose (zalecane dla produkcji)

### docker-compose.yml:
```yaml
version: '3.8'
services:
  akademia-app:
    build: .
    ports:
      - "8090:80"
    depends_on:
      - ollama
    networks:
      - app-network

  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama-data:/root/.ollama
    environment:
      - OLLAMA_ORIGINS=*
    networks:
      - app-network

volumes:
  ollama-data:

networks:
  app-network:
    driver: bridge
```

### Uruchomienie:
```bash
docker-compose up -d
```

## Rozwiązanie 4: Firewall i bezpieczeństwo

### Otwórz port 11434:
```bash
# Ubuntu/Debian
sudo ufw allow 11434

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=11434/tcp
sudo firewall-cmd --reload
```

### Zabezpiecz dostęp (opcjonalne):
```bash
# Ogranicz dostęp tylko do określonych IP
sudo ufw allow from 192.168.1.0/24 to any port 11434
```

## Aktualny status chatbota

### ✅ Co działa:
- **Localhost (http://localhost:8090)**: Próbuje połączyć się z lokalnym Ollama
- **Zewnętrzny IP (http://194.181.240.37:8090)**: Używa inteligentnych fallback responses
- **Fallback system**: 15+ gotowych odpowiedzi z fuzzy matching

### 🔧 Inteligentne fallback responses:
```javascript
// Przykłady rozpoznawanych pytań:
"ile kosztują lekcje" → Cennik z pakietami
"jak zacząć" → Proces onboarding
"test poziomu" → Link do testu języka
"godziny" → Dostępność lekcji
"języki" → Lista 5 języków
"bezpłatna lekcja" → Info o darmowej lekcji
```

### 🎯 Fuzzy matching:
- "cena", "koszt", "ile", "płacić" → Cennik
- "zaczać", "rozpocząć", "start" → Jak zacząć
- "test", "poziom", "sprawdź" → Test poziomu
- "kontakt", "email", "telefon" → Dane kontaktowe

## Testowanie

### Test 1: Localhost
```bash
# Otwórz http://localhost:8090
# Kliknij chatbot i napisz "ile kosztują lekcje"
# Powinien działać z Ollama API
```

### Test 2: Zewnętrzny IP
```bash
# Otwórz http://194.181.240.37:8090
# Kliknij chatbot i napisz "ile kosztują lekcje"
# Powinien działać z fallback responses
```

### Test 3: Po konfiguracji Ollama
```bash
# Uruchom Ollama z OLLAMA_HOST=0.0.0.0:11434
# Test z zewnętrznego IP powinien używać AI
```

## Zalecenia

### Dla rozwoju:
1. **Użyj fallback system** (już zaimplementowany)
2. **Ollama na localhost** dla testów lokalnych

### Dla produkcji:
1. **Docker Compose** z Ollama w kontenerze
2. **Nginx proxy** z proper CORS headers
3. **Firewall rules** ograniczający dostęp
4. **SSL/TLS** dla bezpieczeństwa

### Dla performance:
1. **Cached responses** dla częstych pytań
2. **Rate limiting** dla API calls
3. **Model optimization** (use smaller models like phi3:mini)

## Status implementacji

✅ **Zaimplementowano v10:**
- Inteligentny fallback system
- Automatyczne wykrywanie localhost vs external IP
- 15+ pre-defined responses z fuzzy matching
- Profesjonalne formatowanie odpowiedzi
- Linki do odpowiednich sekcji strony

🔄 **Do zrobienia:**
- Uruchom Ollama z external access (powyższe instrukcje)
- Test na http://194.181.240.37:8090

---

**Aktualny chatbot działa w trybie inteligentnych fallback responses i zapewnia świetne user experience nawet bez AI API.**