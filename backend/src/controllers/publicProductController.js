const Product  = require('../models/Product');
const Category = require('../models/Category');

// ─────────────────────────────────────────────────────────────────────────────
// TASK 2: Search & Filter API  (used by Header search bar)
// GET /api/search?q=velvet&category=...&minPrice=&maxPrice=&sort=&page=&limit=
// ─────────────────────────────────────────────────────────────────────────────
const searchProducts = async (req, res, next) => {
  try {
    const {
      q,
      category,
      minPrice,
      maxPrice,
      sort = 'newest',
      page = 1,
      limit = 10,
    } = req.query;

    const filter = { status: { $in: ['Active', 'Low Stock'] } };

    // Full-text search on name + description
    if (q && q.trim()) {
      filter.$or = [
        { name:        { $regex: q.trim(), $options: 'i' } },
        { description: { $regex: q.trim(), $options: 'i' } },
        { tags:        { $regex: q.trim(), $options: 'i' } },
      ];
    }

    // Category filter (accepts category ID or slug)
    if (category) {
      const cat = await Category.findOne({
        $or: [{ _id: category.match(/^[a-f\d]{24}$/i) ? category : null }, { slug: category }],
      });
      if (cat) filter.category = cat._id;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Sort options
    const sortMap = {
      newest:       { createdAt: -1 },
      oldest:       { createdAt:  1 },
      price_low:    { price:  1 },
      price_high:   { price: -1 },
      name_az:      { name:   1 },
      name_za:      { name:  -1 },
    };
    const sortQuery = sortMap[sort] || sortMap.newest;

    const skip  = (parseInt(page) - 1) * parseInt(limit);
    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .populate('category', 'name slug')
      .sort(sortQuery)
      .skip(skip)
      .limit(parseInt(limit))
      .select('name sku price stock images video status tags isFeatured category rating reviewCount');

    res.status(200).json({
      success: true,
      query: q || '',
      total,
      page:  parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data:  products,
    });
  } catch (err) { next(err); }
};

// ─────────────────────────────────────────────────────────────────────────────
// Quick suggestions for header search dropdown
// GET /api/search/suggestions?q=vel
// ─────────────────────────────────────────────────────────────────────────────
const searchSuggestions = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) {
      return res.status(200).json({ success: true, data: [] });
    }

    const products = await Product.find({
      name:   { $regex: q.trim(), $options: 'i' },
      status: { $in: ['Active', 'Low Stock'] },
    })
      .limit(6)
      .select('name price images category')
      .populate('category', 'name');

    res.status(200).json({ success: true, data: products });
  } catch (err) { next(err); }
};

// ─────────────────────────────────────────────────────────────────────────────
// TASK 3A: Home Page APIs
// ─────────────────────────────────────────────────────────────────────────────

// GET /api/products/featured  — Featured/hero products for home page
const getFeaturedProducts = async (req, res, next) => {
  try {
    const { limit = 8 } = req.query;
    const products = await Product.find({ isFeatured: true, status: { $in: ['Active', 'Low Stock'] } })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .select('name price images video tags isFeatured isNewArrival category rating reviewCount stock');

    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (err) { next(err); }
};

// GET /api/products/new-arrivals  — Newest products for home page section
const getNewArrivals = async (req, res, next) => {
  try {
    const { limit = 8 } = req.query;
    const products = await Product.find({ status: { $in: ['Active', 'Low Stock'] } })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .select('name price images video tags isNewArrival category rating reviewCount stock');

    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (err) { next(err); }
};

// GET /api/products  — All products for Products listing page (with filters)
const getAllPublicProducts = async (req, res, next) => {
  try {
    const {
      category, minPrice, maxPrice, sort = 'newest',
      tags, page = 1, limit = 12,
    } = req.query;

    const filter = { status: { $in: ['Active', 'Low Stock'] } };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (tags) filter.tags = { $in: Array.isArray(tags) ? tags : [tags] };

    const sortMap = {
      newest: { createdAt: -1 }, oldest: { createdAt: 1 },
      price_low: { price: 1 },   price_high: { price: -1 },
    };

    const skip  = (parseInt(page) - 1) * parseInt(limit);
    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .populate('category', 'name slug')
      .sort(sortMap[sort] || sortMap.newest)
      .skip(skip)
      .limit(parseInt(limit))
      .select('name price images video tags isFeatured isNewArrival category rating reviewCount stock status');

    // Also return all categories for the filter sidebar
    const categories = await Category.find({ status: 'Active' }).select('name slug productCount');

    res.status(200).json({
      success: true,
      total,
      page:  parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      categories,
      data: products,
    });
  } catch (err) { next(err); }
};

// ─────────────────────────────────────────────────────────────────────────────
// TASK 3B: Product Details Page API
// GET /api/products/:id  — Single product with full details
// ─────────────────────────────────────────────────────────────────────────────
const getPublicProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug');

    if (!product) { res.status(404); throw new Error('Product not found'); }

    // Related products: same category, exclude this product, limit 4
    const related = await Product.find({
      category: product.category._id,
      _id:      { $ne: product._id },
      status:   { $in: ['Active', 'Low Stock'] },
    })
      .limit(4)
      .select('name price images tags rating stock');

    res.status(200).json({
      success: true,
      data: product,
      related,
    });
  } catch (err) { next(err); }
};

// GET /api/categories  — All active categories (for filter dropdowns)
const getPublicCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ status: { $ne: 'Inactive' } })
      .sort({ displayOrder: 1 })
      .select('name slug image productCount status');

    res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (err) { next(err); }
};

module.exports = {
  searchProducts,
  searchSuggestions,
  getFeaturedProducts,
  getNewArrivals,
  getAllPublicProducts,
  getPublicProductById,
  getPublicCategories,
};
