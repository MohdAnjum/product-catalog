// ✅ Import required dependencies
const express = require('express');            // Web framework for Node.js
const mongoose = require('mongoose');          // ODM for MongoDB
const cors = require('cors');                  // Middleware to enable Cross-Origin requests
const productsRouter = require('./routes/products'); // Import route handler for products
require('dotenv').config();                    // Load environment variables from .env file

// ✅ Initialize Express app
const app = express();

// ✅ Middleware to parse JSON requests
app.use(express.json());

// ✅ Enable CORS - allowing frontend apps (e.g., Angular/React) to access backend APIs
// You can restrict CORS by passing options: cors({ origin: 'http://your-frontend-domain.com' })
app.use(cors());

// ✅ Connect to MongoDB using connection string from .env
// Best practice: Wrap in try-catch or use connection events for error handling
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Route prefix for all product-related API endpoints
// Example: GET /api/products, POST /api/products, etc.
app.use('/api/products', productsRouter);

// ✅ Start the server on port 3000
// In production, consider using process.env.PORT || 3000
app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
