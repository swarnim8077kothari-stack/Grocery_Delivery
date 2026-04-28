import React, { useEffect, useState } from "react";

const categories = [
  {
    icon: "🍎",
    name: "Fruits",
    description: "Sweet, juicy, and honestly the section we spent too long styling.",
    className: ""
  },
  {
    icon: "🥦",
    name: "Vegetables",
    description: "Leafy things, crisp things, soup things, and the occasional good decision.",
    className: "offset-card"
  },
  {
    icon: "🥛",
    name: "Dairy",
    description: "Milk, yogurt, butter and those tiny 2 a.m. fridge comforts.",
    className: ""
  },
  {
    icon: "🍪",
    name: "Snacks",
    description: "Study-break fuel and the snacks that somehow vanish first.",
    className: "wider-card"
  }
];

const products = [
  {
    name: "Peach Basket",
    tag: "Fruits",
    price: "$6.80",
    className: "",
    images: [
      "https://images.unsplash.com/photo-1629828874514-d77f3d7f1a1c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595743825637-cdafc8ad4173?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    name: "Garden Greens",
    tag: "Vegetables",
    price: "$4.20",
    className: "product-card-lift",
    images: [
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    name: "Cloud Milk",
    tag: "Dairy",
    price: "$3.50",
    className: "",
    images: [
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    name: "Study Snacks Box",
    tag: "Snacks",
    price: "$8.90",
    className: "product-card-wide",
    images: [
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

function ProductCard({ product, searchTerm, onAddToCart }) {
  const [wishlist, setWishlist] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [buttonText, setButtonText] = useState("Add to cart");
  const [isHovered, setIsHovered] = useState(false);
  const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

  useEffect(() => {
    setImageIndex(0);
  }, [searchTerm]);

  useEffect(() => {
    if (!isHovered || product.images.length < 2) {
      return undefined;
    }

    const slideTimer = window.setInterval(() => {
      setImageIndex((currentIndex) => (currentIndex + 1) % product.images.length);
    }, 950);

    return () => {
      window.clearInterval(slideTimer);
      setImageIndex(0);
    };
  }, [isHovered, product.images.length]);

  const handleAdd = () => {
    onAddToCart();
    setButtonText("Added!");
    window.setTimeout(() => {
      setButtonText("Add to cart");
    }, 900);
  };

  return (
    <article
      className={`product-card ${product.className} ${searchTerm && !matchesSearch ? "hidden-product" : ""}`.trim()}
      data-name={product.name}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <button
        className={`wishlist-button ${wishlist ? "active" : ""}`.trim()}
        type="button"
        aria-label={`Add ${product.name} to wishlist`}
        onClick={() => setWishlist((current) => !current)}
      >
        {wishlist ? "♥" : "♡"}
      </button>

      <div className="product-image-wrap">
        <img
          className="product-image"
          src={product.images[imageIndex]}
          alt={product.name}
        />
      </div>

      <div className="product-info">
        <p className="product-tag">{product.tag}</p>
        <h3>{product.name}</h3>
        <div className="product-meta">
          <strong>{product.price}</strong>
          <button className="add-cart-button" type="button" onClick={handleAdd}>
            {buttonText}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const [cartItems, setCartItems] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatIcon, setChatIcon] = useState("💬");

  const handleChatClick = () => {
    setChatIcon("🌿");
    window.setTimeout(() => {
      setChatIcon("💬");
    }, 1100);
  };

  return (
    <>
      <div className="page-glow page-glow-left"></div>
      <div className="page-glow page-glow-right"></div>

      <header className="site-header">
        <nav className="navbar container">
          <a href="#" className="brand">
            <span className="brand-mark">🥕</span>
            <div>
              <p className="brand-name">Leaf & Lantern</p>
              <span className="brand-tag">late-night grocery club</span>
            </div>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
          </button>

          <div className={`nav-panel ${menuOpen ? "is-open" : ""}`.trim()}>
            <label className="search-wrap" htmlFor="searchInput">
              <span>🔎</span>
              <input
                id="searchInput"
                type="search"
                placeholder="Search fruits, snacks, dairy..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>

            <div className="nav-actions">
              <button className="icon-button cart-button" type="button" aria-label="Shopping cart">
                🛒
                <span className="cart-count">{cartItems}</span>
              </button>
              <a className="auth-button" href="#footer">Login / Signup</a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-copy">
            <p className="eyebrow">small-batch grocery website for cozy evenings</p>
            <span className="doodle-tag">little cart, big feelings</span>
            <h1>Fresh groceries, delivered gently 🥬</h1>
            <p className="hero-text">
              Soft fruits, crunchy greens, snack runs and midnight milk cartons,
              all packed with a little more care than usual.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#featured">Shop fresh picks</a>
              <a className="ghost-button" href="#categories">Browse aisles</a>
            </div>

            <div className="hero-notes">
              <div className="note-card">
                <span>🍑</span>
                <p>Picked this morning, probably with sleepy eyes</p>
              </div>
              <div className="note-card note-card-tilt">
                <span>🚲</span>
                <p>Student-budget delivery, still a little cute</p>
              </div>
            </div>
          </div>

          <div className="hero-art">
            <div className="fruit-cloud fruit-cloud-one">🍊</div>
            <div className="fruit-cloud fruit-cloud-two">🥬</div>
            <div className="hero-card hero-card-main">
              <p>Today feels like</p>
              <h3>peaches + pesto + soft bread</h3>
              <span className="tiny-scribble">written after one iced coffee</span>
              <div className="hero-basket">
                <span>🍞</span>
                <span>🍐</span>
                <span>🥛</span>
                <span>🥒</span>
              </div>
            </div>
            <div className="hero-card hero-card-side">
              <p>tiny cart moodboard</p>
              <div className="mood-lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </section>

        <section className="offer-strip">
          <div className="container offer-strip-inner">
            <p>20% off today on fruits and dairy, which felt generous so we kept it ✨</p>
          </div>
        </section>

        <section id="categories" className="categories container section-block">
          <div className="section-heading">
            <p className="eyebrow">wander around a little</p>
            <h2>Shop by category</h2>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <article key={category.name} className={`category-card ${category.className}`.trim()}>
                <span className="category-icon">{category.icon}</span>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="daily-picks container section-block">
          <div className="section-heading">
            <p className="eyebrow">highlight of the day</p>
            <h2>Daily Fresh Picks</h2>
          </div>

          <div className="picks-panel">
            <div className="pick-copy">
              <h3>Handpicked for calm kitchens and messy hostel shelves.</h3>
              <p>
                A small rotating bunch of produce we want to show off a little:
                softer colors, fresher leaves, and prices that still feel fair.
              </p>
              <span className="section-whisper">not a huge catalog, just the good stuff first</span>
              <a className="primary-button" href="#featured">See featured products</a>
            </div>

            <div className="pick-stack">
              <div className="mini-pick">
                <span>🥭</span>
                <div>
                  <strong>Mangoes</strong>
                  <p>just-ripe and glowing</p>
                </div>
              </div>
              <div className="mini-pick mini-pick-shift">
                <span>🥬</span>
                <div>
                  <strong>Baby Spinach</strong>
                  <p>for pasta, wraps, or good intentions</p>
                </div>
              </div>
              <div className="mini-pick">
                <span>🧀</span>
                <div>
                  <strong>Fresh Cheese</strong>
                  <p>mild, creamy, and snackable</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="featured" className="featured container section-block">
          <div className="section-heading">
            <p className="eyebrow">tiny favorites shelf</p>
            <h2>Featured Products</h2>
          </div>

          <p className="featured-note">A few cards are intentionally a bit off-grid because perfect rows felt too showroom-ish.</p>

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.name}
                product={product}
                searchTerm={searchTerm}
                onAddToCart={() => setCartItems((count) => count + 1)}
              />
            ))}
          </div>
        </section>
      </main>

      <footer id="footer" className="site-footer">
        <div className="container footer-grid">
          <div>
            <h3>Leaf & Lantern</h3>
            <p>Soft dark grocery shopping for students, flatmates, and people who forgot breakfast again.</p>
            <span className="footer-murmur">made with snacks nearby and maybe too many rounded corners</span>
          </div>
          <div>
            <h4>Quick links</h4>
            <a href="#categories">Categories</a>
            <a href="#featured">Featured</a>
            <a href="#">Delivery notes</a>
          </div>
          <div>
            <h4>Contact</h4>
            <p>hello@leaflantern.shop</p>
            <p>+1 555 018 229</p>
            <p>Open till a little too late</p>
          </div>
        </div>
      </footer>

      <button className="chatbot-button" type="button" aria-label="Open chat support" onClick={handleChatClick}>
        {chatIcon}
      </button>
    </>
  );
}
