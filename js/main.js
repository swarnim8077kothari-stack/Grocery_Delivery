const productCards = document.querySelectorAll(".product-card");
const wishlistButtons = document.querySelectorAll(".wishlist-button");
const addCartButtons = document.querySelectorAll(".add-cart-button");
const searchInput = document.querySelector("#searchInput");
const cartCount = document.querySelector(".cart-count");
const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");
const chatbotButton = document.querySelector(".chatbot-button");

let cartItems = Number(cartCount?.textContent || 0);

productCards.forEach((card) => {
  const image = card.querySelector(".product-image");
  const imageList = image?.dataset.images?.split("|") || [];
  let currentIndex = 0;
  let slideTimer = null;

  const showNextImage = () => {
    if (imageList.length < 2 || !image) {
      return;
    }

    currentIndex = (currentIndex + 1) % imageList.length;
    image.style.opacity = "0.72";

    window.setTimeout(() => {
      image.src = imageList[currentIndex];
      image.style.opacity = "1";
    }, 120);
  };

  const startSlideshow = () => {
    if (imageList.length < 2 || slideTimer) {
      return;
    }

    slideTimer = window.setInterval(showNextImage, 950);
  };

  const stopSlideshow = () => {
    if (!slideTimer) {
      return;
    }

    window.clearInterval(slideTimer);
    slideTimer = null;
    currentIndex = 0;

    if (image) {
      image.src = imageList[0];
      image.style.opacity = "1";
    }
  };

  card.addEventListener("mouseenter", startSlideshow);
  card.addEventListener("mouseleave", stopSlideshow);
  card.addEventListener("focusin", startSlideshow);
  card.addEventListener("focusout", stopSlideshow);
});

wishlistButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isActive = button.classList.toggle("active");
    button.textContent = isActive ? "♥" : "♡";
  });
});

addCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cartItems += 1;
    if (cartCount) {
      cartCount.textContent = String(cartItems);
    }

    button.textContent = "Added!";
    window.setTimeout(() => {
      button.textContent = "Add to cart";
    }, 900);
  });
});

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    const term = event.target.value.trim().toLowerCase();

    productCards.forEach((card) => {
      const name = card.dataset.name?.toLowerCase() || "";
      const shouldDim = term && !name.includes(term);
      card.classList.toggle("hidden-product", shouldDim);
    });
  });
}

if (menuToggle && navPanel) {
  menuToggle.addEventListener("click", () => {
    navPanel.classList.toggle("is-open");
  });
}

if (chatbotButton) {
  chatbotButton.addEventListener("click", () => {
    chatbotButton.textContent = "🌿";

    window.setTimeout(() => {
      chatbotButton.textContent = "💬";
    }, 1100);
  });
}
