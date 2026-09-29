const express = require('express');
const router  = express.Router();
const { login, getMe }          = require('../controllers/adminController');
const {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getDashboardStats,
} = require('../controllers/orderController');

// POST /api/admin/login
router.post('/login', login);

// GET  /api/admin/me
router.get('/me', getMe);

// GET  /api/admin/dashboard/stats  — Dashboard statistics
router.get('/dashboard/stats', getDashboardStats);

// Orders
router.get('/orders',            getAllOrders);
router.get('/orders/:id',        getOrderById);
router.put('/orders/:id/status', updateOrderStatus);

module.exports = router;
