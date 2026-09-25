const express = require('express');
const router  = express.Router();
const {
  getFeaturedProducts,
  getNewArrivals,
  getAllPublicProducts,
  getPublicProductById,
  getPublicCategories,
} = require('../controllers/publicProductController');

// ─── Category routes ─────────────────────────────────────────────────────────
// GET /api/categories
router.get('/categories', getPublicCategories);

// ─── Product routes ───────────────────────────────────────────────────────────
// GET /api/products/featured      — Home page featured products
router.get('/products/featured', getFeaturedProducts);

// GET /api/products/new-arrivals  — Home page new arrivals
router.get('/products/new-arrivals', getNewArrivals);

// GET /api/products               — Products listing page (with filters)
router.get('/products', getAllPublicProducts);

// GET /api/products/:id           — Product Detail page
router.get('/products/:id', getPublicProductById);

module.exports = router;
