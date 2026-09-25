const express = require('express');
const router  = express.Router();
const upload  = require('../middleware/upload');
const { uploadImages, uploadVideo, uploadProductMedia } = require('../controllers/uploadController');

// POST /api/upload/images         — upload 1–5 product images
router.post('/images', upload.array('images', 5), uploadImages);

// POST /api/upload/video          — upload 1 product video (max 100MB)
router.post('/video', upload.single('video'), uploadVideo);

// POST /api/upload/product-media  — upload images + video together
router.post('/product-media', upload.productMedia, uploadProductMedia);

module.exports = router;
