const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { sendError } = require('./../utils/errorHandler'); // ✅ Custom error sender
const { query, validationResult } = require('express-validator');

// 🔹 Utility Functions
const parseArray = (value) => value?.trim()?.split(',') || [];

const parseNumber = (value, defaultVal = 0) => {
  const num = Number(value);
  return isNaN(num) ? defaultVal : num;
};

const safeJSONParse = (json) => {
  try {
    const parsed = JSON.parse(json);
    return typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

// 🔍 Product Search & Filtering Route
router.get('/', async (req, res) => {
  try {
    const {
      search,        // 🔎 Search term for name & description
      categories,    // 🏷️  Comma-separated category filter
      brands,        // 🏷️  Comma-separated brand filter
      minPrice,      // 💰 Minimum price filter
      maxPrice,      // 💰 Maximum price filter
      attributes,    // 🧬 JSON object of attribute filters (key -> list)
      page = 1,      // 📄 Pagination: page number
      limit = 12,    // 📄 Pagination: items per page
      sort = 'relevance'  // 🔃 Sorting option (price_asc, name_desc, etc.)
    } = req.query;

    // 📌 Convert & validate pagination numbers
    const pageNum = parseNumber(page, 1);
    const limitNum = parseNumber(limit, 12);
    const min = minPrice ? parseNumber(minPrice) : undefined;
    const max = maxPrice ? parseNumber(maxPrice) : undefined;

    if (pageNum < 1 || limitNum < 1) {
      return sendError(res, 400, '"page" and "limit" must be positive numbers.');
    }

    if ((minPrice && isNaN(min)) || (maxPrice && isNaN(max))) {
      return sendError(res, 400, '"minPrice" and "maxPrice" must be valid numbers.');
    }

    // 🔍 Main MongoDB Query Object
    const query = {};

    // 🔎 Search in product name or description using case-insensitive regex
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // 📂 Filter by categories
    if (categories) {
      const categoryArr = parseArray(categories);
      if (categoryArr.length) query.categories = { $in: categoryArr };
    }

    // 🏷️ Filter by brands
    if (brands) {
      const brandArr = parseArray(brands);
      if (brandArr.length) query.brand = { $in: brandArr };
    }

    // 💰 Price range filter
    if (min !== undefined || max !== undefined) {
      query.price = {};
      if (min !== undefined) query.price.$gte = min;
      if (max !== undefined) query.price.$lte = max;
    }

    // 🧬 Dynamic attribute filtering (e.g., attributes={"color":["red"],"size":["L"]})
    if (attributes) {
      const attrObj = safeJSONParse(attributes);
      if (!attrObj) {
        return sendError(res, 400, 'Invalid "attributes" parameter; must be a valid JSON object.');
      }

      for (const [key, values] of Object.entries(attrObj)) {
        if (Array.isArray(values) && values.length) {
          // 🔄 Match nested attribute path
          query[`attributes.${key.toLowerCase()}`] = { $in: values };
        }
      }
    }

    // 📄 Pagination settings
    const skip = (pageNum - 1) * limitNum;

    // 🔃 Sorting options
    const sortOptions = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      name_asc: { name: 1 },
      name_desc: { name: -1 },
    };
    const sortObj = sortOptions[sort] || {}; // Default: no sorting

    console.log("MongoDB Query:", query); // 🐞 Debug log

    // 📦 Execute query and count in parallel for performance
    const [products, total] = await Promise.all([
      Product.find(query)
        .select('name price brand categories imageUrl description attributes.color') // Return only needed fields
        .sort(sortObj)
        .skip(skip)
        .limit(limitNum)
        .lean(), // 💨 Boost performance by skipping Mongoose document creation

      Product.countDocuments(query) // 📊 Total count for pagination
    ]);

    return res.json({ products, total });

  } catch (error) {
    console.error('GET /api/products error:', error); // 🐞 Log internal error
    return sendError(res, 500, 'Internal server error');
  }
});

module.exports = router;
