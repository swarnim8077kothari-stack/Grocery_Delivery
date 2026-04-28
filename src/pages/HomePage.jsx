import React from "react";
import SiteHeader from "../components/SiteHeader";
import ProductCard from "../components/ProductCard";
import { categories, products } from "../data/storeData";

export default function HomePage({
  cartItems,
  chatIcon,
  menuOpen,
  searchTerm,
  onAddToCart,
  onChatClick,
  onGoToLogin,
  onSearchChange,
  onToggleMenu
}) {
  return (
    <>
      <div className="page-glow page-glow-left"></div>
      <div className="page-glow page-glow-right"></div>

      <SiteHeader
        cartItems={cartItems}
        menuOpen={menuOpen}
        searchTerm={searchTerm}
        onGoToLogin={onGoToLogin}
        onSearchChange={onSearchChange}
        onToggleMenu={onToggleMenu}
      />

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
                onAddToCart={onAddToCart}
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

      <button className="chatbot-button" type="button" aria-label="Open chat support" onClick={onChatClick}>
        {chatIcon}
      </button>
    </>
  );
}
