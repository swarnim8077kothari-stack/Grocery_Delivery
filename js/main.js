/* ============================================================
   Freshly 🌿 — Main JavaScript
   Sections:
     1. Product Data
     2. Cart Logic
     3. Render Products
     4. Wishlist Toggle
     5. Scroll Reveal
     6. Chatbot
     7. Init
   ============================================================ */


/* ============================================================
   1. PRODUCT DATA
   Each product has: emoji, name, weight, price, old price,
   badge label, and badge type (fresh | sale | "")
   ============================================================ */
const products = [
  { emoji: '🍎', name: 'Royal Gala Apples',    weight: '500g bag',   price: 79,  old: null, badge: 'Fresh',   badgeType: 'fresh' },
  { emoji: '🥕', name: 'Organic Carrots',       weight: '300g bag',   price: 45,  old: 60,   badge: '20% off', badgeType: 'sale'  },
  { emoji: '🧀', name: 'Amul Cheddar Cheese',   weight: '200g block', price: 149, old: null, badge: 'Popular', badgeType: ''      },
  { emoji: '🍌', name: 'Cavendish Bananas',     weight: 'Dozen',      price: 55,  old: null, badge: 'Fresh',   badgeType: 'fresh' },
  { emoji: '🍫', name: 'Dark Choco Digestives', weight: '250g pack',  price: 99,  old: 130,  badge: 'Sale',    badgeType: 'sale'  },
  { emoji: '🥛', name: 'Full Cream Milk',       weight: '1 litre',    price: 68,  old: null, badge: 'Daily',   badgeType: ''      },
  { emoji: '🍊', name: 'Nagpur Oranges',        weight: '4 pack',     price: 89,  old: null, badge: 'Fresh',   badgeType: 'fresh' },
  { emoji: '🥜', name: 'Roasted Peanuts',       weight: '200g bag',   price: 39,  old: 50,   badge: '25% off', badgeType: 'sale'  },
];


/* ============================================================
   2. CART LOGIC
   Tracks count, updates the nav badge in real time.
   ============================================================ */
let cartCount = 0;
const cartBadge = document.getElementById('cartBadge');

/**
 * addToCart — increments cart count and gives the button
 * a brief "Added ✓" flash before resetting.
 * @param {HTMLButtonElement} btn - the clicked "Add" button
 */
function addToCart(btn) {
  cartCount++;
  cartBadge.textContent = cartCount;

  btn.textContent = '✓ Added';
  btn.classList.add('added');

  setTimeout(() => {
    btn.textContent = '+ Add';
    btn.classList.remove('added');
  }, 1500);
}


/* ============================================================
   3. RENDER PRODUCTS
   Dynamically builds product cards from the data array
   and injects them into #productGrid.
   ============================================================ */
function renderProducts() {
  const grid = document.getElementById('productGrid');

  grid.innerHTML = products.map((p) => `
    <div class="product-card reveal">

      <!-- Wishlist button -->
      <button class="wish-btn" onclick="toggleWish(this)" title="Add to Wishlist">🤍</button>

      <!-- Emoji "image" -->
      <div class="product-img-wrap">${p.emoji}</div>

      <!-- Info block -->
      <div class="product-info">
        ${p.badge ? `<span class="product-badge ${p.badgeType}">${p.badge}</span>` : ''}
        <p class="product-name">${p.name}</p>
        <p class="product-weight">${p.weight}</p>

        <div class="product-footer">
          <span class="product-price">
            ₹${p.price}
            ${p.old ? `<span class="old">₹${p.old}</span>` : ''}
          </span>
          <button class="add-btn" onclick="addToCart(this)">+ Add</button>
        </div>
      </div>

    </div>
  `).join('');

  /* Re-observe new cards for scroll reveal */
  observeReveal();
}


/* ============================================================
   4. WISHLIST TOGGLE
   Toggles the heart icon between 🤍 and ❤️.
   ============================================================ */

/**
 * toggleWish — switches wishlist state on a product card.
 * @param {HTMLButtonElement} btn - the heart button
 */
function toggleWish(btn) {
  btn.classList.toggle('active');
  btn.textContent = btn.classList.contains('active') ? '❤️' : '🤍';
}


/* ============================================================
   5. SCROLL REVEAL
   Uses IntersectionObserver to fade-in elements with
   the class "reveal" as they enter the viewport.
   ============================================================ */
function observeReveal() {
  const elements = document.querySelectorAll('.reveal:not(.visible)');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        /* Stagger each card slightly for a cascade effect */
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach((el) => observer.observe(el));
}


/* ============================================================
   6. CHATBOT
   A simple keyword-based bot in the floating chat window.
   ============================================================ */

/* --- DOM References --- */
const chatFab    = document.getElementById('chatFab');
const chatWindow = document.getElementById('chatWindow');
const chatClose  = document.getElementById('chatClose');
const chatInput  = document.getElementById('chatInput');
const chatSend   = document.getElementById('chatSend');
const chatBody   = document.getElementById('chatBody');

/* --- Bot reply map (keyword → reply) --- */
const botReplies = {
  mango:   "Yes! We have Alphonso & Kesar mangoes in stock 🥭 Check the Fruits section!",
  apple:   "Royal Gala and Fuji apples are available today 🍎",
  offer:   "This week's deal: 25% off your first order with code FRESH25 🎉",
  deliver: "We deliver in 30 minutes within a 5 km radius ⚡",
  milk:    "Full cream, toned & oat milk are all in stock 🥛",
  default: "Hmm, I'm not sure about that! Try searching in the search bar 🔍 or browse by category 😊",
};

/**
 * getBotReply — matches a user message against keywords
 * and returns an appropriate reply string.
 * @param {string} message
 * @returns {string}
 */
function getBotReply(message) {
  const m = message.toLowerCase();
  if (m.includes('mango'))                              return botReplies.mango;
  if (m.includes('apple'))                              return botReplies.apple;
  if (m.includes('offer') || m.includes('deal') || m.includes('discount')) return botReplies.offer;
  if (m.includes('deliver'))                            return botReplies.deliver;
  if (m.includes('milk'))                               return botReplies.milk;
  return botReplies.default;
}

/**
 * appendMessage — creates a chat bubble and scrolls to bottom.
 * @param {string} text
 * @param {'bot'|'user'} type
 */
function appendMessage(text, type) {
  const div = document.createElement('div');
  div.className = `msg ${type}`;
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

/**
 * handleSend — reads input, shows user bubble, then bot reply.
 */
function handleSend() {
  const value = chatInput.value.trim();
  if (!value) return;

  appendMessage(value, 'user');
  chatInput.value = '';

  /* Simulate a short typing delay before bot replies */
  setTimeout(() => appendMessage(getBotReply(value), 'bot'), 600);
}

/* --- Chatbot Event Listeners --- */
chatFab.addEventListener('click', () => {
  chatWindow.classList.toggle('open');
  chatFab.style.transform = chatWindow.classList.contains('open') ? 'scale(0.9)' : '';
});

chatClose.addEventListener('click', () => {
  chatWindow.classList.remove('open');
});

chatSend.addEventListener('click', handleSend);

chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSend();
});


/* ============================================================
   7. INIT — Run on page load
   ============================================================ */
renderProducts();   // Build product cards
observeReveal();    // Start observing static .reveal elements
