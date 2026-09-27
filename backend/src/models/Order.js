
let orders = [];
let nextOrderId = 1;

class Order {
  
  static async create(orderData, items) {
    const newOrder = {
      id: nextOrderId++,
      customer_name: orderData.customer_name,
      customer_email: orderData.customer_email,
      customer_phone: orderData.customer_phone,
      shipping_address: orderData.shipping_address,
      total_amount: orderData.total_amount,
      payment_method: 'Cash on Delivery',
      status: 'Pending',
      created_at: new Date().toISOString(),
      items: items.map((item, index) => ({
        id: index + 1,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.quantity * item.price,
        image_url: item.image
      }))
    };

    orders.push(newOrder);
    return newOrder.id;
  }

  
  static async getAll() {
    return orders;
  }

  
  static async getById(orderId) {
    return orders.find(o => o.id === parseInt(orderId));
  }

  
  static async updateStatus(orderId, status) {
    const order = orders.find(o => o.id === parseInt(orderId));
    if (order) {
      order.status = status;
      return true;
    }
    return false;
  }
}

module.exports = Order;