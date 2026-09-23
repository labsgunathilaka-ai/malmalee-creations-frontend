const Category = require('../models/Category');

// GET /api/admin/categories
const getAllCategories = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) filter.name = { $regex: search, $options: 'i' };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Category.countDocuments(filter);
    const categories = await Category.find(filter)
      .sort({ displayOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({ success: true, total, page: parseInt(page), pages: Math.ceil(total / limit), data: categories });
  } catch (err) { next(err); }
};

// GET /api/admin/categories/:id
const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) { res.status(404); throw new Error('Category not found'); }
    res.status(200).json({ success: true, data: category });
  } catch (err) { next(err); }
};

// POST /api/admin/categories
const createCategory = async (req, res, next) => {
  try {
    const { name, description, displayOrder, status } = req.body;
    if (!name) { res.status(400); throw new Error('Category name is required'); }

    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const category = await Category.create({ name, description, displayOrder: displayOrder || 0, status: status || 'Active', image });

    res.status(201).json({ success: true, message: 'Category created successfully', data: category });
  } catch (err) { next(err); }
};

// PUT /api/admin/categories/:id
const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) { res.status(404); throw new Error('Category not found'); }

    const { name, description, displayOrder, status } = req.body;
    if (name !== undefined) category.name = name;
    if (description !== undefined) category.description = description;
    if (displayOrder !== undefined) category.displayOrder = displayOrder;
    if (status !== undefined) category.status = status;
    if (req.file) category.image = `/uploads/${req.file.filename}`;

    const updated = await category.save();
    res.status(200).json({ success: true, message: 'Category updated successfully', data: updated });
  } catch (err) { next(err); }
};

// DELETE /api/admin/categories/:id
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) { res.status(404); throw new Error('Category not found'); }
    await category.deleteOne();
    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (err) { next(err); }
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
