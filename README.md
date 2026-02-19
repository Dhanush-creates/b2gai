# GOV-AID — AI-Powered Welfare Assistance Platform

An AI-powered centralized welfare assistance platform for Indian citizens to discover and apply for government schemes easily.

## 🚀 Quick Setup

### Prerequisites
- **Node.js** v18+ and **npm** installed
- A modern browser (Chrome/Edge recommended for voice input)

### Install & Run

**1. Install server dependencies:**
```bash
cd server
npm install
```

**2. Start the backend (port 5000):**
```bash
npm start
```

**3. In a new terminal — install client dependencies:**
```bash
cd client
npm install
```

**4. Start the frontend dev server (port 5173):**
```bash
npm run dev
```

**5. Open** `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```
b2g/
├── client/                    ← React + Tailwind Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx     — Navigation with language switcher
│   │   │   ├── Footer.jsx     — Footer with privacy disclaimer
│   │   │   └── VoiceInput.jsx — Speech-to-text component
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx        — Hero, features, metrics
│   │   │   ├── EligibilityChecker.jsx — Form + AI matching results
│   │   │   └── SchemeDetails.jsx      — Scheme info with tabs
│   │   ├── context/
│   │   │   └── LanguageContext.jsx     — i18n (EN/HI/TA)
│   │   ├── data/
│   │   │   └── translations.js        — UI strings in 3 languages
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                    ← Express.js Backend
│   ├── data/
│   │   └── schemes.json      — 15 real Indian govt schemes
│   ├── engine/
│   │   ├── eligibility.js    — Rule-based matching engine
│   │   └── nlp.js            — Natural language query parser
│   ├── routes/
│   │   └── api.js            — REST API endpoints
│   ├── index.js              — Server entry point
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/schemes` | List all schemes (`?lang=en\|hi\|ta`) |
| GET | `/api/schemes/:id` | Get scheme details |
| POST | `/api/eligibility` | Match profile → eligible schemes |
| POST | `/api/parse-query` | Parse natural language query |

### Example: Check Eligibility
```bash
curl -X POST http://localhost:5000/api/eligibility \
  -H "Content-Type: application/json" \
  -d '{"age":30,"gender":"male","state":"Tamil Nadu","income":150000,"occupation":"farmer","category":"obc"}'
```

## 🌐 Features
- **AI Eligibility Matching** — Rule-based engine with confidence scoring
- **15 Real Schemes** — PM-KISAN, PMAY, Ayushman Bharat, MUDRA, and more
- **3 Languages** — English, Hindi, Tamil with full UI translation
- **Voice Input** — Speech-to-text using Web Speech API
- **Accessibility** — Large font toggle, mobile-first responsive design
- **Privacy** — No user data is stored
