// script.js - ShopEasy frontend logic with Stripe integration

const stripe = Stripe('pk_test_51TAEDYCPVGWl48dJW8JhKIbqX7YmYKLYqBljzR0UJsRQEwmVjKW7U01soPRsF7ZN9FVmwQTjXIWEKr5j33kUSqFI00TH4CtYeZ');

let elements;
let currentProduct = {};

// ── Dark Mode ──
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Apply on load
applyTheme(localStorage.getItem('theme') || 'light');

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ── Open Checkout Modal ──
async function openCheckout(productId, amount, productName) {
  currentProduct = { productId, amount, productName };

  document.getElementById('modalTitle').textContent = productName;
  document.getElementById('modalSubtitle').textContent = `Amount: ₹${(amount / 100).toLocaleString('en-IN')}`;
  document.getElementById('payBtnText').textContent = `Pay ₹${(amount / 100).toLocaleString('en-IN')} Securely`;
  document.getElementById('payment-message').textContent = '';
  document.getElementById('payment-element').innerHTML = '';

  document.getElementById('modalOverlay').classList.add('active');

  try {
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, productName }),
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.message);

    elements = stripe.elements({ clientSecret: data.clientSecret });
    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');

  } catch (error) {
    console.error('Checkout error:', error);
    document.getElementById('payment-message').textContent = 'Failed to load payment. Try again.';
  }
}

// ── Close Modal ──
document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('modalOverlay').classList.remove('active');
});

document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modalOverlay')) {
    document.getElementById('modalOverlay').classList.remove('active');
  }
});

// ── Submit Payment ──
document.getElementById('submitBtn').addEventListener('click', async () => {
  const submitBtn = document.getElementById('submitBtn');
  const payBtnText = document.getElementById('payBtnText');
  const messageDiv = document.getElementById('payment-message');

  payBtnText.textContent = 'Processing...';
  submitBtn.disabled = true;

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: `${window.location.origin}/success.html`,
    },
  });

  if (error) {
    messageDiv.textContent = error.message;
    payBtnText.textContent = `Pay ₹${(currentProduct.amount / 100).toLocaleString('en-IN')} Securely`;
    submitBtn.disabled = false;
  }
});