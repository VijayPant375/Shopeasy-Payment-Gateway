// success.js - Handles payment verification on success page

// Get payment intent ID from URL params (Stripe adds it automatically)
const urlParams = new URLSearchParams(window.location.search);
const paymentIntentId = urlParams.get('payment_intent');

if (paymentIntentId) {
  // Verify payment with backend
  fetch('/api/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentIntentId }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        // Show payment ID on success page
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