import React, { useEffect, useState } from "react";

export default function ProductCard({ product, searchTerm, onAddToCart }) {
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
        <img className="product-image" src={product.images[imageIndex]} alt={product.name} />
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
