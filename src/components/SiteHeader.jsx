import React from "react";

export default function SiteHeader({
  cartItems,
  menuOpen,
  searchTerm,
  onGoToLogin,
  onSearchChange,
  onToggleMenu
}) {
  return (
    <header className="site-header">
      <nav className="navbar container">
        <a href="#" className="brand">
          <span className="brand-mark">🥕</span>
          <div>
            <p className="brand-name">Leaf & Lantern</p>
            <span className="brand-tag">late-night grocery club</span>
          </div>
        </a>

        <button className="menu-toggle" type="button" aria-label="Open menu" onClick={onToggleMenu}>
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
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </label>

          <div className="nav-actions">
            <button className="icon-button cart-button" type="button" aria-label="Shopping cart">
              🛒
              <span className="cart-count">{cartItems}</span>
            </button>
            <button className="auth-button" type="button" onClick={onGoToLogin}>Login / Signup</button>
          </div>
        </div>
      </nav>
    </header>
  );
}
