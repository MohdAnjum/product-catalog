// Import Mongoose to define schema and model for MongoDB
const mongoose = require('mongoose');

// Define the schema structure for Product documents
const productSchema = new mongoose.Schema({
  // Product name – used in search and listings
  name: String,

  // Product description – used for detailed product info and searchable text
  description: String,

  // Categories the product belongs to – supports multi-category tagging
  categories: [String],

  // Brand of the product – used for filtering and branding display
  brand: String,

  // Price of the product – used for sorting and filtering by price range
  price: Number,

  // Product image URL – used to display product image in UI
  imageUrl: String,

  // Product attributes – flexible structure for nested filtering (e.g., color, size, material)
  attributes: mongoose.Schema.Types.Mixed
});

// ---------------------------------------------
// Indexes to improve performance of queries
// ---------------------------------------------

// Full-text index on name and description for fast keyword search
productSchema.index({ name: 'text', description: 'text' });

// Indexes to speed up filtering operations

// Used when filtering by categories (e.g., Electronics, Books)
productSchema.index({ categories: 1 });

// Used when filtering by brand (e.g., Nike, Apple)
productSchema.index({ brand: 1 });

// Used for filtering and range queries on price
productSchema.index({ price: 1 });

// Used for sorting by name in product listings
productSchema.index({ name: 1 });

// Optional indexes on nested attributes
// Improves filtering performance when querying by color or size in attributes
productSchema.index({ 'attributes.color': 1 });
productSchema.index({ 'attributes.size': 1 });

// Export the Mongoose model to be used across routes and services
module.exports = mongoose.model('Product', productSchema);
