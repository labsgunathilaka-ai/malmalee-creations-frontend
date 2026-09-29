const express = require('express');
const router  = express.Router();
const { createOrder, getOrderHistory } = require('../controllers/orderController');

// POST /api/orders               — Customer places a COD order
router.post('/', createOrder);

// GET  /api/orders/history?email=user@email.com  — Customer order history
router.get('/history', getOrderHistory);

module.exports = router;
