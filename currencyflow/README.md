# 💱 CurrencyFlow - Premium Currency Converter

A production-grade, fintech-style currency converter built with React, TypeScript, and Tailwind CSS. Features a stunning trading-app interface comparable to premium platforms like Revolut, Wise, and XE.com.

![CurrencyFlow Preview](https://img.shields.io/badge/version-1.0.0-cyan?style=flat-square)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan?style=flat-square)

---

## ✨ Features

### 🎨 Premium Fintech UI
- **Trading App Design** - Professional fintech aesthetic
- **Animated Gradients** - Dynamic background effects
- **Glassmorphism Cards** - Modern translucent components
- **Real-time Indicators** - Live rate status display
- **Dark Mode** - Eye-friendly default theme

### 💱 Currency Conversion
- **Single Currency** - Instant conversion between any two currencies
- **Multi-Currency** - Convert to up to 10 currencies simultaneously
- **40+ Currencies** - Support for major world currencies
- **Quick Buttons** - Common amount shortcuts (100, 500, 1000, 5000)
- **Live Rates** - Real-time exchange rate display

### 📈 Charts & Analytics
- **Historical Charts** - 30-day rate history visualization
- **Multiple Timeframes** - 7D, 30D, 90D, 1Y views
- **High/Low/Avg** - Statistical analysis
- **Popular Pairs** - Quick access to common conversions
- **Change Indicators** - Up/Down trend visualization

### ⭐ Favorites & Watchlist
- **Favorite Pairs** - Save frequently used conversions
- **Watchlist** - Track specific currencies
- **Market Overview** - View all tracked currencies at once

### 💼 Portfolio Tracking
- **Portfolio Value** - Track currency holdings
- **Crypto Support** - Bitcoin, Ethereum, and more
- **Rate Alerts** - Get notified when rates hit targets

### 🔔 Rate Alerts
- **Custom Alerts** - Set target rates for any pair
- **Alert Management** - Create, view, and delete alerts
- **Notification UI** - Visual alert system

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Zustand | State Management |
| Recharts | Charts & Graphs |
| Lucide React | Icons |
| Vite | Build Tool |

---

## 📋 Requirements

Before running the project, ensure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager

### Check Node.js Version
```bash
node --version
# Should show v18.x.x or higher
```

### Check npm Version
```bash
npm --version
# Should show 8.x.x or higher
```

---

## 🚀 Installation & Setup

### 1. Navigate to Project
```bash
# If not already in the project directory
cd StaxTech_intern-main/currencyflow
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages:
- react & react-dom
- framer-motion
- lucide-react
- recharts
- zustand
- tailwindcss
- And more...

### 3. Start Development Server
```bash
npm run dev
```

The application will start at: **http://localhost:5174**

> ⚠️ Note: CurrencyFlow runs on port 5174, different from SecureVault (port 5173)

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
currencyflow/
├── public/
│   └── currency.svg         # App icon
├── src/
│   ├── components/          # React components
│   ├── hooks/
│   │   └── useStore.ts     # Zustand store
│   ├── utils/
│   │   ├── cn.ts            # Class name utility
│   │   └── currencyData.ts # Currency data & rates
│   ├── App.tsx              # Main application
│   ├── index.css            # Global styles
│   └── main.tsx             # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🔧 Configuration

### Tailwind Configuration
Custom fintech colors and animations are configured in `tailwind.config.js`

### API Integration
This project uses mock exchange rates. To integrate a real API:
1. Get an API key from [ExchangeRate-API](https://www.exchangerate-api.com/)
2. Update the `mockRates` in `src/utils/currencyData.ts`
3. Or fetch dynamically in the useStore hook

---

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 💱 Supported Currencies

### Major Currencies
- USD - US Dollar 🇺🇸
- EUR - Euro 🇪🇺
- GBP - British Pound 🇬🇧
- JPY - Japanese Yen 🇯🇵
- INR - Indian Rupee 🇮🇳
- CNY - Chinese Yuan 🇨🇳

### More Currencies
AUD, CAD, BRL, RUB, KRW, SGD, HKD, MXN, NZD, SEK, NOK, DKK, CHF, AED, SAR, THB, PHP, IDR, MYR, ZAR, TRY, PLN, CZK, HUF, ILS, VND, PKR, BDT, NGN, CLP, COP, PEN, TWD

### Cryptocurrencies
- BTC - Bitcoin ₿
- ETH - Ethereum Ξ

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## ⚡ Performance Features

- **Optimized Re-renders** - Memoization with useMemo/useCallback
- **Lazy Loading** - Components load on demand
- **Local Storage** - Persists user preferences
- **Responsive Images** - Flag CDN for country flags

---

## 🔄 Data Flow

```
User Input → Zustand Store → Component Update → UI Render
                                      ↓
                              localStorage (persisted)
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - Feel free to use for personal and commercial projects.

---

## 👨‍💻 Author

Created with ❤️ by Praveen

---

## 🙏 Acknowledgments

- [Lucide Icons](https://lucide.dev) - Beautiful icons
- [Framer Motion](https://www.framer.com/motion/) - Smooth animations
- [Recharts](https://recharts.org) - Beautiful charts
- [Tailwind CSS](https://tailwindcss.com) - Amazing utility classes
- [Flag CDN](https://flagcdn.com) - Country flag icons
- [ExchangeRate-API](https://www.exchangerate-api.com/) - Exchange rate data

---

## 📊 Demo Data

The app includes mock exchange rates for demonstration. Rates are simulated and should not be used for actual financial decisions. For production use, integrate a real exchange rate API.

---

<div align="center">

![CurrencyFlow Logo](./public/currency.svg)

**CurrencyFlow** - Premium Currency Exchange Platform

⭐ Star this repo if you found it helpful!

</div>