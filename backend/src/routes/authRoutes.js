const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public Auth Endpoints
router.post('/signup', authController.signUp);
router.post('/register', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/login', authController.signIn);
router.post('/signout', authController.signOut);
router.post('/logout', authController.signOut);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.post('/reset-password', authController.resetPassword);

// Protected Customer Profile & Security Endpoints
router.get('/profile', protect, authController.getProfile);
router.put('/profile', protect, authController.updateProfile);
router.put('/update-password', protect, authController.updatePassword);

module.exports = router;
