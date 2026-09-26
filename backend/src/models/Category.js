const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      unique: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
    image: {
      type: String,
      default: null,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Seasonal'],
      default: 'Active',
    },
    productCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Auto-generate slug from name (Mongoose 9: async, no next())
categorySchema.pre('save', async function () {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
});

module.exports = mongoose.model('Category', categorySchema);
