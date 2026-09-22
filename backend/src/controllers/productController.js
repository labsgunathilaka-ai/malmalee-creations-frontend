const Product  = require('../models/Product');
const Category = require('../models/Category');

// GET /api/admin/products
const getAllProducts = async (req, res, next) => {
  try {
    const { category, status, search, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (search) filter.$or = [{ name: { $regex: search, $options: 'i' } }, { sku: { $regex: search, $options: 'i' } }];

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({ success: true, total, page: parseInt(page), pages: Math.ceil(total / limit), data: products });
  } catch (err) { next(err); }
};

// GET /api/admin/products/:id
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug');
    if (!product) { res.status(404); throw new Error('Product not found'); }
    res.status(200).json({ success: true, data: product });
  } catch (err) { next(err); }
};

// POST /api/admin/products
const createProduct = async (req, res, next) => {
  try {
    const { name, description, category, price, stock, colors, tags, sku } = req.body;
    if (!name || !category || price === undefined) { res.status(400); throw new Error('Name, category and price are required'); }

    const cat = await Category.findById(category);
    if (!cat) { res.status(404); throw new Error('Category not found'); }

    const images = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];
    const parseList = (val) => val ? (Array.isArray(val) ? val : val.split(',').map(v => v.trim())) : [];

    const product = await Product.create({
      name, description, category,
      price: parseFloat(price),
      stock: parseInt(stock) || 0,
      images,
      colors: parseList(colors),
      tags: parseList(tags),
      sku,
    });

    await Category.findByIdAndUpdate(category, { $inc: { productCount: 1 } });

    res.status(201).json({ success: true, message: 'Product created successfully', data: product });
  } catch (err) { next(err); }
};

// PUT /api/admin/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) { res.status(404); throw new Error('Product not found'); }

    const { name, description, category, price, stock, colors, tags, status, sku } = req.body;

    if (category && category !== product.category.toString()) {
      const newCat = await Category.findById(category);
      if (!newCat) { res.status(404); throw new Error('Category not found'); }
      await Category.findByIdAndUpdate(product.category, { $inc: { productCount: -1 } });
      await Category.findByIdAndUpdate(category, { $inc: { productCount: 1 } });
      product.category = category;
    }

    if (name !== undefined)        product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined)       product.price = parseFloat(price);
    if (stock !== undefined)       product.stock = parseInt(stock);
    if (status !== undefined)      product.status = status;
    if (sku !== undefined)         product.sku = sku;

    const parseList = (val) => val ? (Array.isArray(val) ? val : val.split(',').map(v => v.trim())) : undefined;
    const parsedColors = parseList(colors);
    const parsedTags   = parseList(tags);
    if (parsedColors) product.colors = parsedColors;
    if (parsedTags)   product.tags   = parsedTags;
    if (req.files && req.files.length > 0) product.images = req.files.map(f => `/uploads/${f.filename}`);

    const updated = await product.save();
    res.status(200).json({ success: true, message: 'Product updated successfully', data: updated });
  } catch (err) { next(err); }
};

// DELETE /api/admin/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) { res.status(404); throw new Error('Product not found'); }
    await Category.findByIdAndUpdate(product.category, { $inc: { productCount: -1 } });
    await product.deleteOne();
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (err) { next(err); }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
