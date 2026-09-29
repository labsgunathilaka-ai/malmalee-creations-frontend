const Order   = require('../models/Order');
const Product = require('../models/Product');

// POST /api/orders  — Place a Cash on Delivery order
exports.createOrder = async (req, res, next) => {
  try {
    const {
      customer,        // { name, email, phone }
      shippingAddress, // { fullName, phone, address, city, province, postalCode }
      items,           // [{ productId, name, price, quantity, image }]
      shippingFee = 0,
      notes = '',
    } = req.body;

    if (!customer?.name || !customer?.email) {
      return res.status(400).json({ success: false, message: 'Customer name and email are required' });
    }
    if (!shippingAddress?.address || !shippingAddress?.city) {
      return res.status(400).json({ success: false, message: 'Shipping address is required' });
    }
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order must have at least one item' });
    }

    // Build order items + verify products exist
    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product not found: ${item.productId}` });
      }

      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;

      orderItems.push({
        product:  product._id,
        name:     item.name || product.name,
        price:    item.price,
        quantity: item.quantity,
        image:    item.image || (product.images?.[0] || ''),
        subtotal: itemSubtotal,
      });

      // Reduce stock
      await Product.findByIdAndUpdate(product._id, { $inc: { stock: -item.quantity } });
    }

    const total = subtotal + Number(shippingFee);

    const order = await Order.create({
      customer,
      shippingAddress,
      items: orderItems,
      subtotal,
      shippingFee: Number(shippingFee),
      total,
      paymentMethod: 'Cash on Delivery',
      paymentStatus: 'Pending',
      status: 'Pending',
      notes,
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully! We will contact you to confirm.',
      data: {
        orderNumber: order.orderNumber,
        orderId: order._id,
        total: order.total,
        status: order.status,
      },
    });
  } catch (err) { next(err); }
};

// GET /api/admin/orders  — Admin: get all orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const skip  = (parseInt(page) - 1) * parseInt(limit);
    const total = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({ success: true, total, page: parseInt(page), data: orders });
  } catch (err) { next(err); }
};

// GET /api/admin/orders/:id
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.status(200).json({ success: true, data: order });
  } catch (err) { next(err); }
};

// PUT /api/admin/orders/:id/status  — Update order status
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.status(200).json({ success: true, message: 'Order status updated', data: order });
  } catch (err) { next(err); }
};

// GET /api/admin/dashboard/stats — Admin dashboard statistics
exports.getDashboardStats = async (req, res, next) => {
  try {
    const Order   = require('../models/Order');
    const Product = require('../models/Product');
    const Category = require('../models/Category');

    const [
      totalOrders,
      pendingOrders,
      confirmedOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalProducts,
      lowStockProducts,
      outOfStockProducts,
      totalCategories,
      revenueAgg,
      recentOrders,
      topProducts,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ status: 'Pending' }),
      Order.countDocuments({ status: 'Confirmed' }),
      Order.countDocuments({ status: 'Shipped' }),
      Order.countDocuments({ status: 'Delivered' }),
      Order.countDocuments({ status: 'Cancelled' }),
      Product.countDocuments(),
      Product.countDocuments({ status: 'Low Stock' }),
      Product.countDocuments({ status: 'Out of Stock' }),
      Category.countDocuments({ status: 'Active' }),
      Order.aggregate([
        { $match: { status: { $ne: 'Cancelled' } } },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ]),
      Order.find().sort({ createdAt: -1 }).limit(5).select('orderNumber customer.name total status createdAt'),
      Order.aggregate([
        { $unwind: '$items' },
        { $group: { _id: '$items.name', totalSold: { $sum: '$items.quantity' }, revenue: { $sum: '$items.subtotal' } } },
        { $sort: { totalSold: -1 } },
        { $limit: 5 },
      ]),
    ]);

    const totalRevenue = revenueAgg[0]?.total || 0;

    res.status(200).json({
      success: true,
      data: {
        orders: {
          total: totalOrders,
          pending: pendingOrders,
          confirmed: confirmedOrders,
          shipped: shippedOrders,
          delivered: deliveredOrders,
          cancelled: cancelledOrders,
        },
        products: {
          total: totalProducts,
          lowStock: lowStockProducts,
          outOfStock: outOfStockProducts,
        },
        categories: { total: totalCategories },
        revenue: { total: totalRevenue },
        recentOrders,
        topProducts,
      },
    });
  } catch (err) { next(err); }
};

// GET /api/orders/history?email=user@email.com — Customer order history
exports.getOrderHistory = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const orders = await require('../models/Order')
      .find({ 'customer.email': email.toLowerCase() })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, total: orders.length, data: orders });
  } catch (err) { next(err); }
};
