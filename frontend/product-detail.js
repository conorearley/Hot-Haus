// Product Detail Page Logic

// Product gallery images are defined in HTML (product-detail.html) so you can change photos without editing JS.
// See: <div id="product-gallery-templates" hidden> ... </div>
function getGalleryImages(key) {
  const tpl = document.querySelector(
    `#product-gallery-templates template[data-product-gallery="${key}"]`
  );

  if (tpl) {
    const imgs = Array.from(tpl.content.querySelectorAll('img'))
      .map(img => img.getAttribute('src'))
      .filter(Boolean);
    if (imgs.length) return imgs;
  }

  // Fallback to single-image templates (optional)
  const singleTpl = document.querySelector(
    `#product-image-templates template[data-product-image="${key}"]`
  );
  const singleImg = singleTpl?.content?.querySelector('img');
  if (singleImg?.getAttribute('src')) return [singleImg.getAttribute('src')];

  return [];
}



let currentProduct = null;
let currentImageIndex = 0;
let selectedUpgrades = [];

// Get product ID from URL
function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Find product by ID (uses global from script.js)
function findProduct(productId) {
  return window.findProductById(productId);
}

// Check if upgrade is a glass option
function isGlassOption(upgrade) {
  return upgrade.name.toLowerCase().includes('glass');
}

// Get selected glass option
function getSelectedGlassOption() {
  return selectedUpgrades.find(u => isGlassOption(u));
}

// Toggle upgrade selection
function toggleUpgrade(upgrade) {
  const isCurrentlySelected = selectedUpgrades.find(u => u.id === upgrade.id);
  
  if (isCurrentlySelected) {
    selectedUpgrades = selectedUpgrades.filter(u => u.id !== upgrade.id);
  } else if (isGlassOption(upgrade)) {
    // Remove any other glass option first (radio behavior)
    selectedUpgrades = selectedUpgrades.filter(u => !isGlassOption(u));
    selectedUpgrades.push(upgrade);
  } else {
    selectedUpgrades.push(upgrade);
  }
  
  renderUpgrades();
  updatePrice();
}

// Calculate total price
function calculateTotal() {
  if (!currentProduct || currentProduct.price === 0) return 0;
  const upgradesTotal = selectedUpgrades.reduce((sum, u) => sum + u.price, 0);
  return currentProduct.price + upgradesTotal;
}
const klarnaEl = document.getElementById('klarna-monthly');

if (klarnaEl) {
  const months = 48;
  const monthly = total / months;
  klarnaEl.textContent = `€${Math.round(monthly).toLocaleString()}`;
}

function updatePrice() {
  const totalPriceEl = document.getElementById('total-price');
  const breakdownEl = document.getElementById('price-breakdown');
  const addToCartBtn = document.getElementById('add-to-cart-btn');

  if (currentProduct && currentProduct.bespoke === true) {
    totalPriceEl.textContent = '';
    breakdownEl.style.display = 'none';
    addToCartBtn.disabled = true;
    return;
  }

  if (currentProduct.price === 0) {
    totalPriceEl.textContent = 'Price TBD';
    breakdownEl.style.display = 'none';
    addToCartBtn.disabled = true;
    return;
  }

  const total = calculateTotal();
  const upgradesTotal = selectedUpgrades.reduce((sum, u) => sum + u.price, 0);

  totalPriceEl.textContent = `€${total.toLocaleString()}`;

  if (upgradesTotal > 0) {
    breakdownEl.textContent =
      `Base: €${currentProduct.price.toLocaleString()} + Upgrades: €${upgradesTotal.toLocaleString()}`;
    breakdownEl.style.display = 'block';
  } else {
    breakdownEl.style.display = 'none';
  }

  addToCartBtn.disabled = false;
}
// Render upgrades list
function renderUpgrades() {
  const upgradesSection = document.getElementById('upgrades-section');
  const upgradesList = document.getElementById('upgrades-list');
  
  if (!currentProduct.upgrades || currentProduct.upgrades.length === 0) {
    upgradesSection.style.display = 'none';
    return;
  }
  
  upgradesSection.style.display = 'block';
  const selectedGlass = getSelectedGlassOption();
  
  upgradesList.innerHTML = currentProduct.upgrades.map(upgrade => {
    const isSelected = selectedUpgrades.find(u => u.id === upgrade.id);
    const isGlass = isGlassOption(upgrade);
    const isDisabled = isGlass && selectedGlass && selectedGlass.id !== upgrade.id;
    
    return `
      <button 
        class="upgrade-option ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}"
        onclick="${isDisabled ? '' : `handleUpgradeClick('${upgrade.id}')`}"
        ${isDisabled ? 'disabled' : ''}
      >
        <div class="upgrade-checkbox ${isGlass ? 'radio' : 'checkbox'}">
          ${isSelected ? (isGlass ? '<span class="radio-dot"></span>' : '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>') : ''}
        </div>
        <div class="upgrade-info">
          <span class="upgrade-name">${upgrade.name}</span>
          ${isGlass ? '<span class="upgrade-hint">(Select one glass option)</span>' : ''}
        </div>
        <span class="upgrade-price">+€${upgrade.price.toLocaleString()}</span>
      </button>
    `;
  }).join('');
}

// Handle upgrade click (called from onclick)
function handleUpgradeClick(upgradeId) {
  const upgrade = currentProduct.upgrades.find(u => u.id === upgradeId);
  if (upgrade) {
    toggleUpgrade(upgrade);
  }
}
// --- Toast (classy add-to-cart notification) ---
function ensureToastStyles() {
  if (document.getElementById('toast-styles')) return;

  const style = document.createElement('style');
  style.id = 'toast-styles';
  style.textContent = `
    .toast-wrap{
      position: fixed;
      left: 50%;
      bottom: 24px;
      transform: translateX(-50%);
      z-index: 9999;
      pointer-events: none;
    }
    .toast{
      pointer-events: auto;
      background: rgba(20,20,20,0.92);
      color: #fff;
      border: 1px solid rgba(255,255,255,0.14);
      box-shadow: 0 12px 30px rgba(0,0,0,0.28);
      border-radius: 14px;
      padding: 12px 14px;
      min-width: 260px;
      max-width: 92vw;
      font-size: 14px;
      letter-spacing: 0.2px;
      display: flex;
      align-items: center;
      gap: 10px;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity .18s ease, transform .18s ease;
    }
    .toast.show{
      opacity: 1;
      transform: translateY(0);
    }
    .toast .dot{
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: #C9A44C; /* classy gold */
      flex: 0 0 auto;
    }
    .toast .msg{
      line-height: 1.25;
      flex: 1 1 auto;
    }
  `;
  document.head.appendChild(style);
}

function showToast(message, ms = 2400) {
  ensureToastStyles();

  let wrap = document.querySelector('.toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'toast-wrap';
    document.body.appendChild(wrap);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="dot"></span><div class="msg">${message}</div>`;

  wrap.appendChild(toast);

  // trigger animation
  requestAnimationFrame(() => toast.classList.add('show'));

  window.setTimeout(() => {
    toast.classList.remove('show');
    window.setTimeout(() => toast.remove(), 220);
  }, ms);
}

// Render image gallery
function renderGallery() {
  const images = getGalleryImages(currentProduct.image);
  const mainImage = document.getElementById('main-product-image');
  const thumbnailStrip = document.getElementById('thumbnail-strip');
  const prevBtn = document.getElementById('prev-image');
  const nextBtn = document.getElementById('next-image');
  
  if (!images.length) {
    mainImage.src = '';
    mainImage.alt = 'No image available';
    return;
  }

  mainImage.src = images[currentImageIndex];
  mainImage.alt = `${currentProduct.name} - Image ${currentImageIndex + 1}`;
  
  if (images.length > 1) {
    thumbnailStrip.innerHTML = images.map((img, idx) => `
      <button 
        class="thumbnail ${idx === currentImageIndex ? 'active' : ''}"
        onclick="setImageIndex(${idx})"
      >
        <img src="${img}" alt="Thumbnail ${idx + 1}">
      </button>
    `).join('');
    thumbnailStrip.style.display = 'flex';
    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';
  } else {
    thumbnailStrip.style.display = 'none';
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }
}

// Set current image index
function setImageIndex(index) {
  const images = getGalleryImages(currentProduct.image);
  currentImageIndex = index;
  if (currentImageIndex < 0) currentImageIndex = images.length - 1;
  if (currentImageIndex >= images.length) currentImageIndex = 0;
  renderGallery();
}

// Render product details
function renderProductDetail() {
  const productId = getProductIdFromUrl();
  currentProduct = findProduct(productId);
  
  if (!currentProduct) {
    document.querySelector('.product-detail-grid').innerHTML = `
    <div class="not-found">
      <h1>Product not found</h1>
      <a href="index.html" class="btn btn-gold">Back to Home</a>
    </div>
  `;
  return;
}
  
  // Update page title
  document.title = `${currentProduct.name} - Hot Haus Saunas`;
  
  // Render basic info
  document.getElementById('product-category').textContent = currentProduct.category;
  document.getElementById('product-title').textContent = currentProduct.name;
  document.getElementById('product-description').textContent = currentProduct.description;
  
  // Render features
  const featuresList = document.getElementById('features-list');
  featuresList.innerHTML = currentProduct.features.map(feature => `
    <li class="feature-item">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feature-check">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      ${feature}
    </li>
  `).join('');
  
  // Render gallery
  renderGallery();
  
  // Render upgrades
  renderUpgrades();
  
  // Update price
  updatePrice();

    if (currentProduct.bespoke) {
    document.body.classList.add('deluxe-detail-page');
    const upgradesSection = document.getElementById('upgrades-section');
    const purchaseSection = document.querySelector('.purchase-section');

    if (upgradesSection) upgradesSection.style.display = 'none';

    if (purchaseSection) {
      purchaseSection.innerHTML = `
        <div class="bespoke-box">
          <h3>Deluxe Bespoke Sauna</h3>
          <p>
            Each Deluxe sauna is individually designed to suit your space,
            specification and architectural vision.
          </p>

          <a href="mailto:orders@hothaus.ie?subject=Deluxe Sauna Design Consultation"
            class="btn btn-gold btn-lg">
            Book a Design Consultation
          </a>
        </div>
      `;
    }
  }
}

// Add to cart handler
function handleAddToCart() {
  if (!currentProduct || currentProduct.price === 0) return;

  let cart = JSON.parse(localStorage.getItem('hothaus-cart') || '[]');

  const upgradeIds = selectedUpgrades.map(u => u.id).sort().join(',');

  const existingIndex = cart.findIndex(item => {
    const existingUpgradeIds = (item.selectedUpgradeIds || []).sort().join(',');
    return item.productId === currentProduct.id && existingUpgradeIds === upgradeIds;
  });

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      productId: currentProduct.id,
      quantity: 1,
      selectedUpgradeIds: selectedUpgrades.map(u => u.id)
    });
  }

  localStorage.setItem('hothaus-cart', JSON.stringify(cart));

  if (window.updateCartCount) {
    window.updateCartCount();
  }

  const upgradeCount = selectedUpgrades.length;
  showToast(
    upgradeCount
      ? `Added to cart — ${currentProduct.name} (${upgradeCount} upgrade${upgradeCount === 1 ? '' : 's'})`
      : `Added to cart — ${currentProduct.name}`
  );

  const btn = document.getElementById('add-to-cart-btn');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    Added to Cart
  `;
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    if (currentProduct.price > 0) {
      btn.disabled = false;
    }
  }, 2000);
}
// Get cart total (for order modal)
function getCartTotal() {
  const cart = JSON.parse(localStorage.getItem('hothaus-cart') || '[]');
  return cart.reduce((total, item) => {
    const product = window.findProductById(item.productId);
    if (!product) return total;
    const upgrades = (item.selectedUpgradeIds || [])
      .map(id => product.upgrades?.find(u => u.id === id))
      .filter(Boolean);
    const upgradesTotal = upgrades.reduce((sum, u) => sum + u.price, 0);
    return total + (product.price + upgradesTotal) * item.quantity;
  }, 0);
}

// Render cart for drawer
function renderCart() {
  const cart = JSON.parse(localStorage.getItem('hothaus-cart') || '[]');
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
    const product = window.findProductById(item.productId);
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
          <button class="cart-item-remove" onclick="removeFromCartPD(${index})" title="Remove item">
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
            <button onclick="updateCartQtyPD(${index}, -1)">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"/>
              </svg>
            </button>
            <span>${item.quantity}</span>
            <button onclick="updateCartQtyPD(${index}, 1)">
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

// Cart functions for product detail page
function updateCartQtyPD(index, delta) {
  let cart = JSON.parse(localStorage.getItem('hothaus-cart') || '[]');
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem('hothaus-cart', JSON.stringify(cart));
  window.updateCartCount();
  renderCart();
}

function removeFromCartPD(index) {
  let cart = JSON.parse(localStorage.getItem('hothaus-cart') || '[]');
  cart.splice(index, 1);
  localStorage.setItem('hothaus-cart', JSON.stringify(cart));
  window.updateCartCount();
  renderCart();
}

// Toggle cart drawer
function toggleCartPD(open) {
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

// Order Modal Functions
let currentPaymentMethodPD = null;

function openOrderModalPD() {
  const modal = document.getElementById('order-modal');
  const overlay = document.getElementById('order-modal-overlay');
  
  modal.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  
  renderOrderSummaryPD();
  showPaymentSelectionPD();
}

function closeOrderModalPD() {
  const modal = document.getElementById('order-modal');
  const overlay = document.getElementById('order-modal-overlay');
  
  modal.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  
  currentPaymentMethodPD = null;
  showPaymentSelectionPD();
  
  // Reset forms
  const cardEmail = document.getElementById('card-email');
  const customerName = document.getElementById('customer-name');
  const customerEmail = document.getElementById('customer-email');
  const customerPhone = document.getElementById('customer-phone');
  const customerAddress = document.getElementById('customer-address');
  const customerNotes = document.getElementById('customer-notes');
  
  if (cardEmail) cardEmail.value = '';
  if (customerName) customerName.value = '';
  if (customerEmail) customerEmail.value = '';
  if (customerPhone) customerPhone.value = '';
  if (customerAddress) customerAddress.value = '';
  if (customerNotes) customerNotes.value = '';
}

function showPaymentSelectionPD() {
  document.getElementById('payment-methods').style.display = 'block';
  document.getElementById('card-payment-form').style.display = 'none';
  document.getElementById('bank-transfer-form').style.display = 'none';
  document.getElementById('order-success').style.display = 'none';
  document.getElementById('order-back-btn').style.display = 'none';
  document.getElementById('order-modal-title').textContent = 'Choose Payment';
}

function showCardPaymentPD() {
  currentPaymentMethodPD = 'card';
  document.getElementById('payment-methods').style.display = 'none';
  document.getElementById('card-payment-form').style.display = 'block';
  document.getElementById('bank-transfer-form').style.display = 'none';
  document.getElementById('order-back-btn').style.display = 'flex';
  document.getElementById('order-modal-title').textContent = 'Card Payment';
  
  document.getElementById('proceed-stripe-btn').innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>
    </svg>
    Pay €${getCartTotal().toLocaleString()} with Card
  `;
}

function showBankTransferPD() {
  currentPaymentMethodPD = 'bank';
  document.getElementById('payment-methods').style.display = 'none';
  document.getElementById('card-payment-form').style.display = 'none';
  document.getElementById('bank-transfer-form').style.display = 'block';
  document.getElementById('order-back-btn').style.display = 'flex';
  document.getElementById('order-modal-title').textContent = 'Bank Transfer Order';
}

function renderOrderSummaryPD() {
  const cart = JSON.parse(localStorage.getItem('hothaus-cart') || '[]');
  const summaryEl = document.getElementById('order-summary');
  
  let html = '<h3>Order Summary</h3><div class="order-items">';
  
  cart.forEach(item => {
    const product = window.findProductById(item.productId);
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

function handleBankTransferSubmitPD(e) {
  e.preventDefault();
  
  const cart = JSON.parse(localStorage.getItem('hothaus-cart') || '[]');
  
  const formData = {
    name: document.getElementById('customer-name').value,
    email: document.getElementById('customer-email').value,
    phone: document.getElementById('customer-phone').value,
    address: document.getElementById('customer-address').value,
    notes: document.getElementById('customer-notes').value,
  };
  
  const orderDetails = cart.map(item => {
    const product = window.findProductById(item.productId);
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
  
  window.location.href = `mailto:orders@hothaus.ie?subject=${emailSubject}&body=${emailBody}`;
  
  document.getElementById('bank-transfer-form').style.display = 'none';
  document.getElementById('order-success').style.display = 'block';
  document.getElementById('order-back-btn').style.display = 'none';
  document.getElementById('order-modal-title').textContent = 'Order Submitted';
  
  setTimeout(() => {
    localStorage.setItem('hothaus-cart', JSON.stringify([]));
    window.updateCartCount();
    closeOrderModalPD();
    toggleCartPD(false);
  }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Set current year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  
  // Render product detail
  renderProductDetail();
  
  // Gallery navigation
  document.getElementById('prev-image').addEventListener('click', () => setImageIndex(currentImageIndex - 1));
  document.getElementById('next-image').addEventListener('click', () => setImageIndex(currentImageIndex + 1));
  
  // Add to cart button
  document.getElementById('add-to-cart-btn').addEventListener('click', handleAddToCart);
  
  // Cart drawer events
  const cartToggle = document.getElementById('cart-toggle');
  const cartClose = document.getElementById('cart-close');
  const cartOverlay = document.getElementById('cart-overlay');
  const checkoutBtn = document.getElementById('checkout-btn');
  
  if (cartToggle) {
    cartToggle.addEventListener('click', () => toggleCartPD(true));
  }
  
  if (cartClose) {
    cartClose.addEventListener('click', () => toggleCartPD(false));
  }
  
  if (cartOverlay) {
    cartOverlay.addEventListener('click', () => toggleCartPD(false));
  }
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      toggleCartPD(false);
      openOrderModalPD();
    });
  }
  
  // Mobile menu
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      const menu = document.getElementById('mobile-menu');
      const menuIcon = document.querySelector('.menu-icon');
      const closeIcon = document.querySelector('.close-icon');
      const isOpen = menu.classList.toggle('open');
      
      if (menuIcon && closeIcon) {
        menuIcon.style.display = isOpen ? 'none' : 'block';
        closeIcon.style.display = isOpen ? 'block' : 'none';
      }
    });
  }
  
  // Order modal events
  const orderCloseBtn = document.getElementById('order-close-btn');
  const orderOverlay = document.getElementById('order-modal-overlay');
  const orderBackBtn = document.getElementById('order-back-btn');
  const payCardOption = document.getElementById('pay-card-option');
  const payBankOption = document.getElementById('pay-bank-option');
  const bankTransferForm = document.getElementById('bank-transfer-form');
  
  if (orderCloseBtn) {
    orderCloseBtn.addEventListener('click', closeOrderModalPD);
  }
  
  if (orderOverlay) {
    orderOverlay.addEventListener('click', closeOrderModalPD);
  }
  
  if (orderBackBtn) {
    orderBackBtn.addEventListener('click', showPaymentSelectionPD);
  }
  
  if (payCardOption) {
    payCardOption.addEventListener('click', showCardPaymentPD);
  }
  
  if (payBankOption) {
    payBankOption.addEventListener('click', showBankTransferPD);
  }
  
  if (bankTransferForm) {
    bankTransferForm.addEventListener('submit', handleBankTransferSubmitPD);
  }

  const proceedStripeBtn = document.getElementById('proceed-stripe-btn');
  const cardEmail = document.getElementById('card-email');
  if (proceedStripeBtn && cardEmail && typeof startStripeCheckout === 'function') {
    proceedStripeBtn.addEventListener('click', () => startStripeCheckout(cardEmail.value.trim()));
  }
});

// Make functions globally accessible
window.handleUpgradeClick = handleUpgradeClick;
window.setImageIndex = setImageIndex;
window.updateCartQtyPD = updateCartQtyPD;
window.removeFromCartPD = removeFromCartPD;