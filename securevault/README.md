# 🔐 SecureVault - Premium Password Manager

A production-grade, enterprise-level password manager built with React, TypeScript, and Tailwind CSS. Features a stunning UI/UX comparable to premium password managers like LastPass, Dashlane, and NordPass.

![SecureVault Preview](https://img.shields.io/badge/version-1.0.0-purple?style=flat-square)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan?style=flat-square)

---

## ✨ Features

### 🎨 Premium UI/UX
- **Glassmorphism Design** - Modern translucent cards with blur effects
- **Animated Backgrounds** - Floating orbs and gradient animations
- **Smooth Transitions** - Framer Motion powered animations
- **Dark/Light Mode** - Theme toggle with persistent storage
- **Responsive Design** - Mobile-first approach

### 🔑 Password Generation
- **Multiple Types**: Password, Passphrase, PIN
- **Customizable Options**: Length, character types, exclusions
- **Secure Random**: Crypto API for true randomness
- **Real-time Strength**: Calculate entropy and strength score
- **Breach Detection**: Check password against known breaches
- **Bulk Generation**: Generate up to 20 passwords at once

### 🛡️ Security Features
- **Password Vault**: Securely store passwords locally
- **Categories**: Organize passwords (Social, Work, Finance, etc.)
- **Favorites**: Quick access to important passwords
- **Search & Filter**: Find passwords easily
- **Activity Log**: Track all password activities

### 📊 Analytics Dashboard
- **Security Score**: Visual representation of overall security
- **Password Health**: Strong vs Weak password analysis
- **Category Distribution**: Visual breakdown of password categories
- **AI Recommendations**: Smart security suggestions

### ⚙️ Settings & Customization
- **Auto-lock Timeout**: Configurable vault lock timer
- **Export/Import**: Backup and restore passwords
- **Keyboard Shortcuts**: Quick actions support

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

### 1. Clone the Repository
```bash
# If not already in the project directory
cd StaxTech_intern-main/securevault
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

The application will start at: **http://localhost:5173**

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
securevault/
├── public/
│   └── shield.svg           # App icon
├── src/
│   ├── components/
│   │   └── ui/              # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Checkbox.tsx
│   │       ├── Input.tsx
│   │       ├── Progress.tsx
│   │       └── Slider.tsx
│   ├── hooks/
│   │   └── useStore.ts      # Zustand store
│   ├── utils/
│   │   ├── cn.ts            # Class name utility
│   │   └── passwordUtils.ts # Password generation logic
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
Custom colors, animations, and dark mode are configured in `tailwind.config.js`

### Environment Variables
Create `.env` file for any API keys (not required for basic usage):
```env
VITE_APP_TITLE=SecureVault
```

---

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🔐 Security Notes

- All passwords are stored locally using browser localStorage
- No data is sent to external servers
- Crypto API used for secure random number generation
- Zero-knowledge architecture (your data stays yours)

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

---

<div align="center">

![SecureVault Logo](./public/shield.svg)

**SecureVault** - Your Digital Security Command Center

⭐ Star this repo if you found it helpful!

</div>