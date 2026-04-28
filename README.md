# Freshly 🌿 — React Project

A cute corner grocery store frontend, converted from vanilla HTML/CSS/JS to React + Vite.

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
freshly/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Root component
    ├── index.css             # Global styles (converted from style.css)
    ├── data/
    │   └── products.js       # Product data, reviews, bot replies
    ├── hooks/
    │   └── useReveal.js      # Scroll reveal IntersectionObserver hook
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── Categories.jsx
        ├── OfferBanner.jsx
        ├── ProductCard.jsx
        ├── FeaturedProducts.jsx
        ├── FreshPicks.jsx
        ├── Reviews.jsx
        ├── Footer.jsx
        └── Chatbot.jsx
```

## Features
- 🛒 Cart counter in navbar
- ❤️ Wishlist toggle per product
- 🤖 Keyword-based chatbot
- 📜 Scroll reveal animations
- 📱 Fully responsive
