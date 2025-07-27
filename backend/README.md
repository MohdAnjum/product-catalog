# 🛍️ Product Catalog Backend API

This is a **Node.js + Express** backend API that powers a product catalog system, designed with scalable filtering, search, and sorting features using **MongoDB**. It's suitable for modern e-commerce platforms, internal catalog systems, or product discovery tools.

---

## 📌 Project Overview

This backend API serves product data with comprehensive filtering and sorting options, allowing clients to:

- 🔍 Search products by **name** and **description** using full-text search (case-insensitive)
- 🎯 Filter products by:
  - `categories` (e.g., Electronics, Apparel)
  - `brands` (e.g., Sony, Apple)
  - **Dynamic attributes** like `color`
  - **Price range** via `minPrice` and `maxPrice`
- ↕️ Sort results by:
  - Relevance (default full-text match)
  - `price` (ascending or descending)
  - `name` (alphabetical)
- 📄 Paginate responses using `page` and `limit` query params
- ✅ All logic is implemented efficiently with **MongoDB query optimization**, **indexing**, and **error handling**

---

## ✨ Features

- RESTful API using **Express.js**
- MongoDB integration via **Mongoose**
- Full-text search with regex fallback
- Dynamic filtering:
  - Categories, Brands, Attributes (color, size, etc.)
- Price range filter support
- Sorting: by name, price, or relevance
- Pagination support
- Input sanitization and validation
- Well-structured error handling with HTTP status codes
- Indexes for performance optimization
- Extensible `Product` schema with flexible `attributes` field

---

## 🧪 API Endpoints

| Method | Endpoint           | Description                        |
|--------|--------------------|------------------------------------|
| GET    | `/api/products`    | List, filter, search, paginate     |

### Example Query
```http
GET /api/products?search=shoes&categories=Apparel&minPrice=100&maxPrice=500&sort=price&page=2&limit=12



---------------------------------------------

# Features

- ✅ RESTful API built with Express.js
- ✅ MongoDB as the database with Mongoose ODM
- ✅ Dynamic filtering on categories, brands, and multiple attributes
- ✅ Full-text search with regex matching
- ✅ Price range filtering
- ✅ Sorting on multiple fields
- ✅ Pagination with `page` and `limit` query support
- ✅ Input validation and sanitization
- ✅ Descriptive error responses with status codes
- ✅ Indexes for improved query performance
- ✅ Easy-to-extend schema for product attributes

---

## Tech Stack

- 🟢 **Node.js**
- ⚙️ **Express.js**
- 🍃 **MongoDB**
- 🧬 **Mongoose**
- 🔎 `express-validator` for validation
- ♻️ `nodemon` for development
- ✅ `Joi` *(optional)* for schema validation

---

## API Base URL

> http://localhost:3000

---

## API Endpoints

### `GET /api/products`

Fetch a list of products with filtering, sorting, search, and pagination support.

#### Request Parameters

| Parameter   | Type        | Description                                                                 | Example                      |
|-------------|-------------|-----------------------------------------------------------------------------|------------------------------|
| `search`    | `string`    | Search keyword to match in product name and description (case-insensitive) | `iphone`                     |
| `categories`| `string`    | Comma-separated list of categories to filter using `$in` operator          | `Electronics,Books`          |
| `brands`    | `string`    | Comma-separated list of brands to filter                                    | `Apple,Samsung`              |
| `minPrice`  | `number`    | Minimum price filter                                                        | `100`                        |
| `maxPrice`  | `number`    | Maximum price filter                                                        | `1000`                       |
| `attributes`| `JSON string`| JSON object specifying attribute filters (key: attribute, value: array)    | `{"color":["red","blue"]}`   |
| `page`      | `number`    | Page number for pagination (1-based index)                                 | `1`                          |
| `limit`     | `number`    | Number of items per page                                                    | `12`                         |
| `sort`      | `string`    | Sorting method: `relevance`, `price_asc`, `price_desc`, `name_asc`, `name_desc` | `price_asc`             |

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

