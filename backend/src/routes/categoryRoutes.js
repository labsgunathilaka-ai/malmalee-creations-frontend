const express = require('express');
const router  = express.Router();
const upload  = require('../middleware/upload');
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

router.route('/')
  .get(getAllCategories)
  .post(upload.single('image'), createCategory);

router.route('/:id')
  .get(getCategoryById)
  .put(upload.single('image'), updateCategory)
  .delete(deleteCategory);

module.exports = router;
