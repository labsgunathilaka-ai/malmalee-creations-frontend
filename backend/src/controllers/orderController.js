const Order = require('../models/Order');

exports.createOrder = async (req, res, next) => {
  try {
    const { customer_name, customer_email, customer_phone, shipping_address, total_amount, items } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items provided" });
    }

    const orderId = await Order.create(
      { customer_name, customer_email, customer_phone, shipping_address, total_amount },
      items
    );

    res.status(201).json({ success: true, message: "Order placed successfully", orderId });
  } catch (error) {
    next(error);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.getAll();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.getById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const updated = await Order.updateStatus(req.params.id, status);
    
    if (!updated) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order status updated" });
  } catch (error) {
    next(error);
  }
};