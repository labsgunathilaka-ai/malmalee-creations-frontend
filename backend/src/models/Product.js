const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Name cannot exceed 200 characters'],
    },
    sku: {
      type: String,
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
      default: '',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    // ── Media ──────────────────────────────────────────────────────────────────
    images: {
      type: [String],   // paths to uploaded image files
      default: [],
    },
    video: {
      type: String,     // path to uploaded video file (optional)
      default: null,
    },
    // ── Extra details ──────────────────────────────────────────────────────────
    colors: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Out of Stock', 'Low Stock'],
      default: 'Active',
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// ─── Auto-generate SKU and auto-set status from stock ─────────────────────────
productSchema.pre('save', async function (next) {
  if (!this.sku) {
    const rand = Math.floor(100 + Math.random() * 900);
    this.sku = `MAL-PRD-${rand}`;
  }
  if (this.stock === 0) {
    this.status = 'Out of Stock';
  } else if (this.stock <= 10) {
    this.status = 'Low Stock';
  } else if (this.status !== 'Inactive') {
    this.status = 'Active';
  }
  next();
});

// ─── Index for search performance ─────────────────────────────────────────────
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ price: 1 });

module.exports = mongoose.model('Product', productSchema);
