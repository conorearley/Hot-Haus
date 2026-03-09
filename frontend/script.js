// Product Data - Matching React version exactly
const products = {
  saunas: [
    {
  id: 'sauna-micro',
  name: '2.0m Micro Sauna',
  category: 'sauna',
  price: 4400,
  description: 'Compact entry sauna designed for small gardens and tight spaces.',
  features: ['2.0m length', 'Fits 1-2 people', 'Premium spruce wood', 'Electric heater included'],
  image: 'sauna-micro',
  upgrades: [
    { id: 'sauna-micro-round-glass', name: 'Round Glass', price: 900 },
    { id: 'sauna-micro-half-glass', name: 'Half Glass', price: 500 },
    { id: 'sauna-micro-wood-stove', name: 'Wood Stove', price: 650 },
    { id: 'sauna-micro-external-painting', name: 'External Painting', price: 450 },
    { id: 'sauna-micro-thermowood', name: 'Thermowood Cladding', price: 600 },
  ],
},
    {
      id: 'sauna-mini',
      name: '2.5m Mini Sauna',
      category: 'sauna',
      price: 5290,
      description: 'Perfect compact sauna for smaller spaces. Premium quality with authentic Finnish design.',
      features: ['2.5m length', 'Fits 2-3 people', 'Premium spruce wood', 'Electric heater included'],
      image: 'sauna-mini',
      upgrades: [
        { id: 'sauna-mini-round-glass', name: 'Round Glass', price: 900 },
        { id: 'sauna-mini-half-glass', name: 'Half Glass', price: 500 },
        { id: 'sauna-mini-wood-stove', name: 'Wood Stove', price: 650 },
        { id: 'sauna-mini-external-painting', name: 'External Painting', price: 450 },
        { id: 'sauna-mini-thermowood', name: 'Thermowood Cladding', price: 750 },
      ],
    },
    {
      id: 'sauna-midi',
      name: '3.0m Midi Sauna',
      category: 'sauna',
      price: 5840,
      description: 'Ideal family sauna with comfortable space for relaxation and wellness.',
      features: ['3.0m length', 'Fits 3-4 people', 'Premium spruce wood', 'Electric heater included'],
      image: 'sauna-midi',
      upgrades: [
        { id: 'sauna-midi-round-glass', name: 'Round Glass', price: 900 },
        { id: 'sauna-midi-half-glass', name: 'Half Glass', price: 500 },
        { id: 'sauna-midi-wood-stove', name: 'Wood Stove', price: 650 },
        { id: 'sauna-midi-external-painting', name: 'External Painting', price: 450 },
        { id: 'sauna-midi-thermowood', name: 'Thermowood Cladding', price: 960 },
      ],
    },
    {
      id: 'sauna-maxi',
      name: '4.0m Maxi Sauna',
      category: 'sauna',
      price: 6930,
      description: 'Spacious sauna for larger families or commercial use with ample room.',
      features: ['4.0m length', 'Fits 5-6 people', 'Premium spruce wood', 'Electric heater included'],
      image: 'sauna-maxi',
      upgrades: [
        { id: 'sauna-maxi-round-glass', name: 'Round Glass', price: 900 },
        { id: 'sauna-maxi-half-glass', name: 'Half Glass', price: 500 },
        { id: 'sauna-maxi-wood-stove', name: 'Wood Stove', price: 650 },
        { id: 'sauna-maxi-external-painting', name: 'External Painting', price: 750 },
        { id: 'sauna-maxi-thermowood', name: 'Thermowood Cladding', price: 1230 },
      ],
    },
    {
      id: 'sauna-grande',
      name: '6.0m Grande Sauna',
      category: 'sauna',
      price: 8690,
      description: 'Our flagship luxury sauna with maximum space and premium features.',
      features: ['6.0m length', 'Fits 8-10 people', 'Premium spruce wood', 'Electric heater included'],
      image: 'sauna-grande',
      upgrades: [
        { id: 'sauna-grande-round-glass', name: 'Round Glass', price: 900 },
        { id: 'sauna-grande-half-glass', name: 'Half Glass', price: 500 },
        { id: 'sauna-grande-wood-stove', name: 'Wood Stove', price: 650 },
        { id: 'sauna-grande-external-painting', name: 'External Painting', price: 750 },
        { id: 'sauna-grande-thermowood', name: 'Thermowood Cladding', price: 1660 },
      ],
    },
  ],
  glassSaunas: [
    {
      id: 'sauna-deluxe',
      name: 'Deluxe Sauna',
      category: 'sauna',
      price: 0,
      bespoke: true,
      description: 'Our flagship bespoke sauna. Each Deluxe model is custom designed to suit your space, specification and vision.',
      features: [
        'Full panoramic glass front',
        'Architectural black frame',
        'Premium timber interior',
        'Fully bespoke specification'
      ],
      image: 'sauna-glass-framed'
    },
  ],
 cubeSaunas: [
  {
    id: 'cube-1.7m',
    name: '1.7m Cube Sauna',
    category: 'sauna',
    price: 7490,
    description: 'Minimalist cube sauna with clean architectural lines and premium timber finish.',
    features: ['1.7m length', 'Modern flat roof', 'Panoramic front window', 'Electric heater included'],
    image: 'cube-1.7m',
    upgrades: [
      { id: 'cube-half-glass', name: 'Half Glass', price: 800 },
      { id: 'cube-full-glass', name: 'Full Glass', price: 1600 },
    ],
  },
  {
    id: 'cube-2.4m',
    name: '2.4m Cube Sauna',
    category: 'sauna',
    price: 8990,
    description: 'Spacious cube sauna designed for contemporary outdoor spaces.',
    features: ['2.4m length', 'Flat roof design', 'Full glass front', 'Premium insulation'],
    image: 'cube-2.4m',
    upgrades: [
      { id: 'cube-half-glass', name: 'Half Glass', price: 800 },
      { id: 'cube-full-glass', name: 'Full Glass', price: 1600 },
    ],
  },
  {
    id: 'cube-3m',
    name: '3m Cube Sauna',
    category: 'sauna',
    price: 10490,
    description: 'Luxury cube sauna with expansive interior and striking exterior presence.',
    features: ['3m length', 'Architectural design', 'Panoramic glass', 'High-end finish'],
    image: 'cube-3m',
    upgrades: [
      { id: 'cube-half-glass', name: 'Half Glass', price: 800 },
      { id: 'cube-full-glass', name: 'Full Glass', price: 1600 },
    ],
  }
],

  glamping: [
    {
      id: 'pod-3x3',
      name: '3m x 3m Pod',
      category: 'glamping',
      price: 5930,
      description: 'Cozy pod perfect for couples or a unique garden office space.',
      features: ['3m x 3m floor space', 'Insulated walls', 'Double glazed windows', 'Electrical pack included'],
      image: 'pod-3x3',
      upgrades: [
        { id: 'pod-3x3-assembly', name: 'Pod Assembly', price: 720 },
        { id: 'pod-3x3-foundation', name: 'Timber Frame & Black Pad Foundation', price: 630 },
        { id: 'pod-3x3-flooring', name: 'Laminate Flooring', price: 350 },
      ],
    },
    {
      id: 'pod-3x4',
      name: '3m x 4m Pod',
      category: 'glamping',
      price: 6710,
      description: 'Popular mid-size pod with extra room for comfort and amenities.',
      features: ['3m x 4m floor space', 'Insulated walls', 'Double glazed windows', 'Electrical pack included'],
      image: 'pod-3x4',
      upgrades: [
        { id: 'pod-3x4-assembly', name: 'Pod Assembly', price: 960 },
        { id: 'pod-3x4-foundation', name: 'Timber Frame & Black Pad Foundation', price: 840 },
        { id: 'pod-3x4-flooring', name: 'Laminate Flooring', price: 470 },
      ],
    },
    {
      id: 'pod-3x5',
      name: '3m x 5m Pod',
      category: 'glamping',
      price: 8710,
      description: 'Spacious pod ideal for small families or deluxe glamping experience.',
      features: ['3m x 5m floor space', 'Insulated walls', 'Double glazed windows', 'Electrical pack included'],
      image: 'pod-3x5',
      upgrades: [
        { id: 'pod-3x5-assembly', name: 'Pod Assembly', price: 1200 },
        { id: 'pod-3x5-foundation', name: 'Timber Frame & Black Pad Foundation', price: 970 },
        { id: 'pod-3x5-flooring', name: 'Laminate Flooring', price: 585 },
      ],
    },
    {
      id: 'pod-4x6',
      name: '4m x 6m Pod',
      category: 'glamping',
      price: 11180,
      description: 'Our largest pod with maximum space for luxury accommodation.',
      features: ['4m x 6m floor space', 'Insulated walls', 'Double glazed windows', 'Electrical pack included'],
      image: 'pod-4x6',
      upgrades: [
        { id: 'pod-4x6-assembly', name: 'Pod Assembly', price: 1800 },
        { id: 'pod-4x6-foundation', name: 'Timber Frame & Black Pad Foundation', price: 1460 },
        { id: 'pod-4x6-flooring', name: 'Laminate Flooring', price: 935 },
      ],
    },
  ],
  hottub: {
    id: 'hot-tub',
    name: 'Hot Tub',
    category: 'hottub',
    price: 3500,
    description: 'Traditional Scandinavian hot tub for year-round relaxation. Price coming soon.',
    features: ['Wood-fired heating', 'Insulated construction', 'All-season use', 'Easy drainage system'],
    image: 'hottub',
  }

  ,coldplunge: {
    id: 'cold-plunge',
    name: 'Cold Plunge',
    category: 'coldplunge',
    price: 1050,
    description: 'Premium cold plunge tub for the ultimate recovery and wellness experience. Price coming soon.',
    features: ['Premium wood construction', 'Insulated design', 'Easy drainage system', 'Temperature control'],
    image: 'coldplunge',
  }
  
};

// Product images are defined in HTML (index.html) so you can change photos without editing JS.
// See: <div id="product-image-templates" hidden> ... </div>
function getProductImageSrc(key) {
  const tpl = document.querySelector(
    `#product-image-templates template[data-product-image="${key}"]`
  );
  const img = tpl?.content?.querySelector('img');
  return img?.getAttribute('src') || 'img/placeholder.jpg';
}
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Cart state
let cart = JSON.parse(localStorage.getItem('hothaus-cart') || '[]');

// Find product by ID
function findProductById(productId) {
  for (const category in products) {
    if (Array.isArray(products[category])) {
      const found = products[category].find(p => p.id === productId);
      if (found) return found;
    } else if (products[category].id === productId) {
      return products[category];
    }
  }
  return null;
}

// Update cart count
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.textContent = count;
    countEl.style.display = count > 0 ? 'flex' : 'none';
  }
}

// Calculate cart total
function getCartTotal() {
  return cart.reduce((total, item) => {
    const product = findProductById(item.productId);
    if (!product) return total;
    const upgrades = (item.selectedUpgradeIds || [])
      .map(id => product.upgrades?.find(u => u.id === id))
      .filter(Boolean);
    const upgradesTotal = upgrades.reduce((sum, u) => sum + u.price, 0);
    return total + (product.price + upgradesTotal) * item.quantity;
  }, 0);
}

function renderProductCard(product) {
  const isPriceTBD = product.price === 0;

  const template = document.querySelector(
    `#product-image-templates template[data-product-image="${product.image}"]`
  );

  const imageHTML = template
    ? template.innerHTML
    : `<img src="img/placeholder.jpg" alt="${product.name}">`;

  const isPremium = product.id === "sauna-deluxe";

  return `
    <div class="product-card ${isPremium ? 'product-card-premium' : ''}"
         onclick="window.location.href='product-detail.html?id=${product.id}'">

      <div class="product-card-image ${isPremium ? 'premium-image' : ''}">
        ${imageHTML}
        ${!isPremium ? `
        <div class="product-card-image-overlay"></div>
        <div class="product-card-image-content">
          <span class="category-tag">${product.category}</span>
          <h3>${product.name}</h3>
        </div>` : ''}
      </div>

      <div class="product-card-content ${isPremium ? 'premium-content' : ''}">
        ${isPremium ? `
          <span class="premium-badge">Premium Collection</span>
          <h3 class="premium-title">${product.name}</h3>
        ` : ''}

        <p class="product-card-description">${product.description}</p>

        <div class="product-card-footer">
          <span class="product-price">
            ${isPriceTBD ? 'Price TBD' : `from €${product.price.toLocaleString()}`}
          </span>
          <span class="view-details">
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  `;
}

// Render products
function renderProducts() {
  const saunasGrid = document.getElementById('saunas-grid');
  const glassSaunasGrid = document.getElementById('glass-saunas-grid');
  const cubeSaunasGrid = document.getElementById('cube-saunas-grid');
  const glampingGrid = document.getElementById('glamping-grid');
  const coldplungeGrid = document.getElementById('coldplunge-grid');
  const hottubGrid = document.getElementById('coldplunge-grid');


  if (saunasGrid) {
    saunasGrid.innerHTML = products.saunas.map(renderProductCard).join('');
  }

  if (glassSaunasGrid) {
    glassSaunasGrid.innerHTML = (products.glassSaunas || []).map(renderProductCard).join('');
  }
  if (cubeSaunasGrid) {
  cubeSaunasGrid.innerHTML = (products.cubeSaunas || [])
    .map(renderProductCard)
    .join('');
  }
  
  if (glampingGrid) {
    glampingGrid.innerHTML = products.glamping.map(renderProductCard).join('');
  }
  
  if (coldplungeGrid) {
  coldplungeGrid.innerHTML =
    renderProductCard(products.coldplunge) +
    renderProductCard(products.hottub);
}

}

// Render cart
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartFooter = document.getElementById('cart-footer');
  
  if (!cartItems) return;
  
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="cart-empty-icon">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <p class="cart-empty-title">Your cart is empty</p>
        <p class="cart-empty-subtitle">Browse our premium saunas and glamping pods</p>
      </div>
    `;
    if (cartFooter) cartFooter.style.display = 'none';
    return;
  }
  
  if (cartFooter) cartFooter.style.display = 'block';
  
  cartItems.innerHTML = cart.map((item, index) => {
    const product = findProductById(item.productId);
    if (!product) return '';
    
    const upgrades = (item.selectedUpgradeIds || [])
      .map(id => product.upgrades?.find(u => u.id === id))
      .filter(Boolean);
    
    const upgradesTotal = upgrades.reduce((sum, u) => sum + u.price, 0);
    const itemTotal = (product.price + upgradesTotal) * item.quantity;
    
    return `
      <div class="cart-item">
        <div class="cart-item-header">
          <div class="cart-item-info">
            <p class="cart-item-name">${product.name}</p>
            <p class="cart-item-base-price">€${product.price.toLocaleString()} base price</p>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart(${index})" title="Remove item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
            </svg>
          </button>
        </div>
        
        ${upgrades.length > 0 ? `
          <div class="cart-item-upgrades">
            <p class="cart-item-upgrades-label">Selected Upgrades:</p>
            ${upgrades.map(u => `
              <div class="cart-item-upgrade">
                <span>${u.name}</span>
                <span class="upgrade-price">+€${u.price.toLocaleString()}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        <div class="cart-item-footer">
          <div class="cart-item-qty">
            <button onclick="updateCartQuantity(${index}, -1)">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"/>
              </svg>
            </button>
            <span>${item.quantity}</span>
            <button onclick="updateCartQuantity(${index}, 1)">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"/><path d="M12 5v14"/>
              </svg>
            </button>
          </div>
          <p class="cart-item-total">€${itemTotal.toLocaleString()}</p>
        </div>
      </div>
    `;
  }).join('');
  
  if (cartTotal) {
    cartTotal.textContent = `€${getCartTotal().toLocaleString()}`;
  }
}

// Update cart quantity
function updateCartQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem('hothaus-cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('hothaus-cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];
  localStorage.setItem('hothaus-cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

// Toggle cart drawer
function toggleCart(open) {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  
  if (open) {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderCart();
  } else {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;
  const menuIcon = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.close-icon');
  const isOpen = menu.classList.toggle('open');

  const toggleBtn = document.getElementById('mobile-menu-toggle');
  if (toggleBtn) toggleBtn.setAttribute('aria-expanded', String(isOpen));

  if (menuIcon && closeIcon) {
    menuIcon.style.display = isOpen ? 'none' : 'block';
    closeIcon.style.display = isOpen ? 'block' : 'none';
  }
}

// Order Modal
let currentPaymentMethod = null;

function openOrderModal() {
  const modal = document.getElementById('order-modal');
  const overlay = document.getElementById('order-modal-overlay');
  
  modal.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  
  renderOrderSummary();
  showPaymentSelection();
}

function closeOrderModal() {
  const modal = document.getElementById('order-modal');
  const overlay = document.getElementById('order-modal-overlay');
  
  modal.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  
  // Reset state
  currentPaymentMethod = null;
  showPaymentSelection();
  
  // Reset forms
  document.getElementById('card-email').value = '';
  document.getElementById('customer-name').value = '';
  document.getElementById('customer-email').value = '';
  document.getElementById('customer-phone').value = '';
  document.getElementById('customer-address').value = '';
  document.getElementById('customer-notes').value = '';
}

function showPaymentSelection() {
  document.getElementById('payment-methods').style.display = 'block';
  document.getElementById('card-payment-form').style.display = 'none';
  document.getElementById('bank-transfer-form').style.display = 'none';
  document.getElementById('order-success').style.display = 'none';
  document.getElementById('order-back-btn').style.display = 'none';
  document.getElementById('order-modal-title').textContent = 'Choose Payment';
}

function showCardPayment() {
  currentPaymentMethod = 'card';
  document.getElementById('payment-methods').style.display = 'none';
  document.getElementById('card-payment-form').style.display = 'block';
  document.getElementById('bank-transfer-form').style.display = 'none';
  document.getElementById('order-back-btn').style.display = 'flex';
  document.getElementById('order-modal-title').textContent = 'Card Payment';
  
  // Update button text with total
  document.getElementById('proceed-stripe-btn').innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>
    </svg>
    Pay €${getCartTotal().toLocaleString()} with Card
  `;
}

function showBankTransfer() {
  currentPaymentMethod = 'bank';
  document.getElementById('payment-methods').style.display = 'none';
  document.getElementById('card-payment-form').style.display = 'none';
  document.getElementById('bank-transfer-form').style.display = 'block';
  document.getElementById('order-back-btn').style.display = 'flex';
  document.getElementById('order-modal-title').textContent = 'Bank Transfer Order';
}

function renderOrderSummary() {
  const summaryEl = document.getElementById('order-summary');
  
  let html = '<h3>Order Summary</h3><div class="order-items">';
  
  cart.forEach(item => {
    const product = findProductById(item.productId);
    if (!product) return;
    
    const upgrades = (item.selectedUpgradeIds || [])
      .map(id => product.upgrades?.find(u => u.id === id))
      .filter(Boolean);
    
    const upgradesTotal = upgrades.reduce((sum, u) => sum + u.price, 0);
    const itemTotal = (product.price + upgradesTotal) * item.quantity;
    
    html += `
      <div class="order-item">
        <span>
          ${product.name} x${item.quantity}
          ${upgrades.length > 0 ? `<span class="order-item-upgrades">(+${upgrades.length} upgrades)</span>` : ''}
        </span>
        <span class="order-item-price">€${itemTotal.toLocaleString()}</span>
      </div>
    `;
  });
  
  html += '</div>';
  html += `
    <div class="order-total">
      <span>Total</span>
      <span class="order-total-price">€${getCartTotal().toLocaleString()}</span>
    </div>
  `;
  
  summaryEl.innerHTML = html;
}

function handleBankTransferSubmit(e) {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('customer-name').value,
    email: document.getElementById('customer-email').value,
    phone: document.getElementById('customer-phone').value,
    address: document.getElementById('customer-address').value,
    notes: document.getElementById('customer-notes').value,
  };
  
  // Format order details for email
  const orderDetails = cart.map(item => {
    const product = findProductById(item.productId);
    if (!product) return '';
    
    const upgrades = (item.selectedUpgradeIds || [])
      .map(id => product.upgrades?.find(u => u.id === id))
      .filter(Boolean);
    
    const upgradesTotal = upgrades.reduce((sum, u) => sum + u.price, 0);
    const itemTotal = (product.price + upgradesTotal) * item.quantity;
    
    let details = `${product.name} x${item.quantity} - €${product.price.toLocaleString()}`;
    if (upgrades.length > 0) {
      details += `\nUpgrades: ${upgrades.map(u => `${u.name} (€${u.price.toLocaleString()})`).join(', ')}`;
    }
    details += `\nSubtotal: €${itemTotal.toLocaleString()}`;
    return details;
  }).filter(Boolean).join('\n\n');
  
  const emailSubject = encodeURIComponent(`New Order from ${formData.name}`);
  const emailBody = encodeURIComponent(
`NEW ORDER REQUEST

CUSTOMER DETAILS:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Delivery Address: ${formData.address}
Additional Notes: ${formData.notes || 'None'}

ORDER DETAILS:
${orderDetails}

TOTAL: €${getCartTotal().toLocaleString()}
`
  );
  
  // Open email client
  window.location.href = `mailto:orders@hothaus.ie?subject=${emailSubject}&body=${emailBody}`;
  
  // Show success
  document.getElementById('bank-transfer-form').style.display = 'none';
  document.getElementById('order-success').style.display = 'block';
  document.getElementById('order-back-btn').style.display = 'none';
  document.getElementById('order-modal-title').textContent = 'Order Submitted';
  
  // Clear cart after delay
  setTimeout(() => {
    clearCart();
    closeOrderModal();
    toggleCart(false);
  }, 3000);
}

  // Header scroll effect
function handleHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Set current year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  
  // Render products on home page
  renderProducts();
  
  // Update cart count
  updateCartCount();
  
  
/**
 * Stripe Checkout (server required)
 * Frontend calls POST /create-checkout-session with the cart + email
 * Server returns { url } to redirect the customer.
 */
const API_BASE = ''; // set to e.g. 'https://yourdomain.com' if your API is hosted separately

async function startStripeCheckout(email) {
  cart = JSON.parse(localStorage.getItem('hothaus-cart') || '[]');
  if (!email) {
    alert('Please enter your email.');
    return;
  }

  const cartPayload = (cart || []).map(item => ({
    productId: item.productId,
    quantity: item.quantity,
    selectedUpgradeIds: item.selectedUpgradeIds || []
  }));

  if (cartPayload.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  const btn = document.getElementById('proceed-stripe-btn');
  const oldText = btn ? btn.textContent : '';
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Redirecting to Stripe...';
  }

  try {
    const res = await fetch(`${API_BASE}/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        cart: cartPayload,
        currency: 'eur',
        successUrl: `${window.location.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/cancel.html`
      })
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || 'Failed to start checkout');
    }

    const data = await res.json();
    if (!data.url) throw new Error('Missing checkout URL from server');
    window.location.href = data.url;
  } catch (err) {
    console.error(err);
    alert('Could not start card payment. Please try again or choose bank transfer.');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = oldText || 'Pay with Card';
    }
  }
}

// Header scroll effect
  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll();
  
  // Cart toggle events
  const cartToggle = document.getElementById('cart-toggle');
  const cartClose = document.getElementById('cart-close');
  const cartOverlay = document.getElementById('cart-overlay');
  const checkoutBtn = document.getElementById('checkout-btn');
  
  if (cartToggle) {
    cartToggle.addEventListener('click', () => toggleCart(true));
  }
  
  if (cartClose) {
    cartClose.addEventListener('click', () => toggleCart(false));
  }
  
  if (cartOverlay) {
    cartOverlay.addEventListener('click', () => toggleCart(false));
  }
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      toggleCart(false);
      openOrderModal();
    });
  }
  
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }
  
  // Close mobile menu when clicking nav links
  const mobileNavLinks = document.querySelectorAll('.nav-mobile .nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('mobile-menu').classList.remove('open');
      const menuIcon = document.querySelector('.menu-icon');
      const closeIcon = document.querySelector('.close-icon');
      if (menuIcon && closeIcon) {
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      }
    });
  });
  
  // Order modal events
  const orderCloseBtn = document.getElementById('order-close-btn');
  const orderOverlay = document.getElementById('order-modal-overlay');
  const orderBackBtn = document.getElementById('order-back-btn');
  const payCardOption = document.getElementById('pay-card-option');
  const payBankOption = document.getElementById('pay-bank-option');
  const bankTransferForm = document.getElementById('bank-transfer-form');
  
  if (orderCloseBtn) {
    orderCloseBtn.addEventListener('click', closeOrderModal);
  }
  
  if (orderOverlay) {
    orderOverlay.addEventListener('click', closeOrderModal);
  }
  
  if (orderBackBtn) {
    orderBackBtn.addEventListener('click', showPaymentSelection);
  }
  
  if (payCardOption) {
    payCardOption.addEventListener('click', showCardPayment);
  }
  
  if (payBankOption) {
    payBankOption.addEventListener('click', showBankTransfer);
  }
  
  if (bankTransferForm) {
    bankTransferForm.addEventListener('submit', handleBankTransferSubmit);
  }

  const proceedStripeBtn = document.getElementById('proceed-stripe-btn');
  const cardEmail = document.getElementById('card-email');
  if (proceedStripeBtn && cardEmail) {
    proceedStripeBtn.addEventListener('click', () => startStripeCheckout(cardEmail.value.trim()));
  }
});

// Make functions globally available
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.products = products;
window.findProductById = findProductById;
window.updateCartCount = updateCartCount;
window.showToast = showToast;
Object.defineProperty(window, "cart", {
  get: () => JSON.parse(localStorage.getItem('hothaus-cart') || '[]')
});