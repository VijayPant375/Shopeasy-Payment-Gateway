// server.js - Entry point for the Express backend

const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static frontend files from the client folder
app.use(express.static(path.join(__dirname, '../client')));

// Routes
const orderRoutes = require('./routes/orderRoutes');
const verifyRoutes = require('./routes/verifyRoutes');

app.use('/api/order', orderRoutes);
app.use('/api/verify', verifyRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', port: PORT });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});