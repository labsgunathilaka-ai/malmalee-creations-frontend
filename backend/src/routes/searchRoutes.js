const express = require('express');
const router  = express.Router();
const { searchProducts, searchSuggestions } = require('../controllers/publicProductController');

// GET /api/search?q=velvet&category=&minPrice=&maxPrice=&sort=newest&page=1
router.get('/', searchProducts);

// GET /api/search/suggestions?q=vel   (quick dropdown)
router.get('/suggestions', searchSuggestions);

module.exports = router;
