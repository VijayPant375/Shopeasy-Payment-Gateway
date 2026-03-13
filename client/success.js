// success.js - Payment verification on success page

// Apply saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

const themeToggle = document.getElementById('themeToggle');
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
});

// Verify payment
const urlParams = new URLSearchParams(window.location.search);
const paymentIntentId = urlParams.get('payment_intent');

if (paymentIntentId) {
  fetch('/api/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentIntentId }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        document.getElementById('paymentId').textContent = paymentIntentId;
      } else {
        document.getElementById('paymentId').textContent = 'Verification failed';
      }
    })
    .catch(() => {
      document.getElementById('paymentId').textContent = 'Could not verify';
    });
} else {
  document.getElementById('paymentId').textContent = 'No payment found';
}