please add .env

# .env file
PORT=3000
MONGO_URI=mongodb://localhost:27017/catalogdb
JWT_SECRET=your-secret-key-here
NODE_ENV=development

Certainly! Here is a compiled **README.md** file tailored specifically for your full project—which includes both your **Backend Node.js server** and **Frontend Angular app**—based on the information from your assignments and conversation. You can copy this and use it directly in your project root.

# Advanced Product Catalog Application

This repository contains both the **Backend Node.js API Server** and the **Frontend Angular Client** projects for an advanced product catalog application with rich features such as filtering, sorting, pagination, and search.

## Table of Contents
- [Project Overview](#project-overview)
- [Backend](#backend)
  - [Tech Stack](#backend-tech-stack)
  - [Features](#backend-features)
  - [Installation & Setup](#backend-installation--setup)
  - [API Endpoints](#backend-api-endpoints)
  - [Validation and Security](#backend-validation-and-security)
  - [Performance](#backend-performance)
- [Frontend](#frontend)
  - [Tech Stack](#frontend-tech-stack)
  - [Features](#frontend-features)
  - [Installation & Setup](#frontend-installation--setup)
  - [UI and UX](#frontend-ui-and-ux)
  - [Live Development](#frontend-live-development)
- [Additional info](#additional-info)
- [How to Run](#how-to-run)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview

This advanced product catalog application enables users to browse a large inventory of products with hierarchical filters (categories, brands, colors), price ranges, and dynamic attributes. The backend API handles complex queries and serves filtered, paginated results. The frontend Angular application provides an interactive UI with search, filter sidebars, product listings, and pagination.

## Backend

### Backend Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- express-validator for input validation
- dotenv for environment variables

### Backend Features
- REST API supporting:
  - Search by name/description (case-insensitive, regex)
  - Filter by multiple categories, brands, attributes (e.g., color)
  - Filter by price range (minPrice, maxPrice)
  - Sorting (by relevance, price asc/desc, name asc/desc)
  - Pagination with page & limit params
- Robust error handling with consistent status codes and message responses
- Input validation and sanitization to prevent injection attacks
- MongoDB indexes to optimize query performance
- Supports combined filters and custom attribute filters

### Backend Installation & Setup
1. Navigate to the backend folder:

    ```bash
    cd assigment/backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Prepare your `.env` file with at least:

    ```
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/product-catalog
    ```

4. Run the server in development mode:

    ```bash
    npm run dev
    ```

5. Access API at: `http://localhost:3000/api/products`

### Backend API Endpoints
- `GET /api/products`: Fetch filtered products with various query parameters:
  - `search`: string
  - `categories`: comma-separated list
  - `brands`: comma-separated list
  - `minPrice`, `maxPrice`: numbers
  - `attributes`: JSON string of attributes filter
  - `page`: number (pagination)
  - `limit`: number
  - `sort`: sorting method

Refer to your backend code for full validation and response schema.

## Frontend

### Frontend Tech Stack
- Angular (Standalone Components)
- Angular Material (for Pagination & UI components)
- RxJS for reactive streams and debouncing
- CSS Flexbox/Grid for responsive layouts

### Frontend Features
- Filter Sidebar with:
  - Categories, Brands, Colors with checkbox selection
  - Price range inputs and optional slider (if implemented)
  - "Clear All Filters" button
  - Disabled "Apply Filters" button until filters are selected (optional)
- Search box with:
  - API hit on 3+ characters input
  - Debounced input handling
  - Cursor focus retention after API query
- Product Listing Grid with image, name, brand, price, description, and categories badges
- Responsive Pagination with Angular Material Paginator fixed/sticky at page bottom
- Sticky header for search and sort controls
- Sticky left side filter sidebar for better UX
- "No Products Found" friendly message and image when filters yield empty result

### Frontend Installation & Setup
1. Navigate to frontend folder:

    ```bash
    cd assigment/frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the dev server:

    ```bash
    ng serve
    ```

4. Open your browser at: `http://localhost:4200`

### Frontend UI/UX Highlights
- Clean and modern design with CSS classes, hover and focus states, and accessible ARIA attributes
- Category badges with capitalized and colored labels
- Multi-line truncated descriptions with ellipsis (`...`) for better readability
- Loading spinner and disabled UI controls during data fetch
- Clear and responsive layout adapting to screen sizes

## Additional info

- Remember to place your product images under `assets/src/` with consistent naming.
- Use `.gitignore` in the root to exclude `node_modules` and environment files.
- Your backend and frontend run as independent projects but communicate via REST API.
- The repository combines `frontend` and `backend` in a single repo under the `assigment` folder.

## How to Run

1. Run MongoDB locally or use a hosted instance.
2. Start backend server from `/assigment/backend` with `npm run dev`.
3. Start frontend app from `/assigment/frontend` with `ng serve`.
4. Access frontend via browser at `http://localhost:4200`.

## Contributing

Feel free to contribute with issues, bug fixes, or feature improvements. Follow best practices and submit pull requests with detailed descriptions.

## License

This project is MIT licensed.

## Contact



If you want me to prepare a ready-to-use markdown file (`README.md`) for download or provide additional sections like API examples or deployment instructions, please let me know!
