const express = require('express');
const router  = express.Router();
const upload  = require('../middleware/upload');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

router.route('/')
  .get(getAllProducts)
  .post(upload.array('images', 5), createProduct);

router.route('/:id')
  .get(getProductById)
  .put(upload.array('images', 5), updateProduct)
  .delete(deleteProduct);

module.exports = router;
