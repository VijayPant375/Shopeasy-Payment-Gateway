// script.js - Stripe payment integration

// Initialize Stripe with publishable key
const stripe = Stripe('pk_test_51TAEDYCPVGWl48dJW8JhKIbqX7YmYKLYqBljzR0UJsRQEwmVjKW7U01soPRsF7ZN9FVmwQTjXIWEKr5j33kUSqFI00TH4CtYeZ');

let elements;

// Handle Buy Now button click
document.getElementById('buyBtn').addEventListener('click', async () => {
  const buyBtn = document.getElementById('buyBtn');

  // Show loading state
  buyBtn.textContent = 'Loading...';
  buyBtn.disabled = true;

  try {
    // Step 1: Create payment intent on backend
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    // Step 2: Initialize Stripe Elements with client secret
    elements = stripe.elements({ clientSecret: data.clientSecret });

    // Step 3: Create and mount the payment element
    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');

    // Step 4: Show payment form and hide buy button
    document.getElementById('payment-container').style.display = 'block';
    document.getElementById('submitBtn').style.display = 'block';
    buyBtn.style.display = 'none';

  } catch (error) {
    console.error('Error:', error);
    buyBtn.textContent = 'Buy Now — ₹499';
    buyBtn.disabled = false;
    alert('Something went wrong. Please try again.');
  }
});

// Handle payment form submission
document.getElementById('submitBtn').addEventListener('click', async () => {
  const submitBtn = document.getElementById('submitBtn');
  const messageDiv = document.getElementById('payment-message');

  submitBtn.textContent = 'Processing...';
  submitBtn.disabled = true;

  // Confirm payment with Stripe
  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: `${window.location.origin}/success.html`,
    },
  });

  // If error, show message
  if (error) {
    messageDiv.textContent = error.message;
    submitBtn.textContent = 'Pay ₹499 Securely';
    submitBtn.disabled = false;
  }
});