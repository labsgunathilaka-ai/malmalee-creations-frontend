const mongoose = require('mongoose');

// ── Order Item sub-schema ─────────────────────────────────────────────────────
const orderItemSchema = new mongoose.Schema({
  product:      { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:         { type: String, required: true },
  price:        { type: Number, required: true },
  quantity:     { type: Number, required: true, min: 1 },
  image:        { type: String, default: '' },
  subtotal:     { type: Number, required: true },
}, { _id: false });

// ── Shipping Address sub-schema ───────────────────────────────────────────────
const addressSchema = new mongoose.Schema({
  fullName:  { type: String, required: true },
  phone:     { type: String, required: true },
  address:   { type: String, required: true },
  city:      { type: String, required: true },
  province:  { type: String, default: '' },
  postalCode:{ type: String, default: '' },
}, { _id: false });

// ── Main Order schema ─────────────────────────────────────────────────────────
const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
    },
    customer: {
      name:  { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, default: '' },
    },
    shippingAddress: { type: addressSchema, required: true },
    items:           { type: [orderItemSchema], required: true },
    subtotal:        { type: Number, required: true },
    shippingFee:     { type: Number, default: 0 },
    total:           { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['Cash on Delivery', 'Bank Transfer', 'Online'],
      default: 'Cash on Delivery',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
      default: 'Pending',
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

// Auto-generate order number (e.g. ORD-20260928-001)
orderSchema.pre('save', async function () {
  if (!this.orderNumber) {
    const date = new Date();
    const dateStr = date.getFullYear().toString() +
      String(date.getMonth() + 1).padStart(2, '0') +
      String(date.getDate()).padStart(2, '0');
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD-${dateStr}-${String(count + 1).padStart(3, '0')}`;
  }
});

module.exports = mongoose.model('Order', orderSchema);
