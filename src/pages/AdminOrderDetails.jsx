import React, { useState, useEffect } from 'react';
import { 
  FaChevronDown,
  FaCheck
} from 'react-icons/fa';

const API_BASE = 'http://localhost:5000';

const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

// ── Single Order Detail View ───────────────────────────────────────────────
const OrderDetailView = ({ order, onBack, onStatusUpdated }) => {
  const [selectedStatus, setSelectedStatus] = useState(order.status || 'Pending');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const updateStatus = async (status) => {
    setUpdating(true);
    try {
      await fetch(`${API_BASE}/api/admin/orders/${order._id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      setSelectedStatus(status);
      if (onStatusUpdated) onStatusUpdated(order._id, status);
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setUpdating(false);
      setIsDropdownOpen(false);
    }
  };

  const items = order.items || order.orderItems || [];
  const shippingAddress = order.shippingAddress || {};
  const customerName = shippingAddress.fullName
    || shippingAddress.firstName
      ? `${shippingAddress.firstName || ''} ${shippingAddress.lastName || ''}`.trim()
      : order.customer?.name || 'N/A';
  const contactEmail = shippingAddress.email || order.customer?.email || order.email || '';
  const contactPhone = shippingAddress.phone || order.customer?.phone || order.phone || '';
  const addressLine = [
    shippingAddress.address,
    shippingAddress.city,
    shippingAddress.province,
    shippingAddress.country,
  ].filter(Boolean).join(', ');

  const itemsTotal = order.itemsTotal ?? order.subtotal ?? 0;
  const shipping = order.shippingCost ?? order.shipping ?? 0;
  const tax = order.tax ?? 0;
  const orderTotal = order.totalAmount ?? order.total ?? 0;

  return (
    <div className="p-6 md:p-10 bg-white min-h-screen font-serif text-[#222222]">
      {/* Back button */}
      <button
        onClick={onBack}
        className="mb-6 text-xs font-sans font-bold text-[#ff0081] hover:underline cursor-pointer"
      >
        ← Back to Orders
      </button>

      {/* Header Title */}
      <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-8 text-[#ff0081]">
        ORDER DETAILS |{' '}
        <span className="font-normal text-gray-800">
          {order.orderNumber || `#${String(order._id).slice(-4).toUpperCase()}`}
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Details & Items */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Customer Info */}
          <div className="space-y-1">
            <h2 className="font-bold text-sm tracking-wider uppercase border-b border-[#E0D8CD] pb-2 mb-3 text-[#ff0081]">
              CUSTOMER INFORMATION
            </h2>
            <p className="text-sm font-sans">
              <span className="font-serif font-bold text-gray-800">Customer : </span>
              {customerName}
            </p>
            <p className="text-sm font-sans">
              <span className="font-serif font-bold text-gray-800">Contact : </span>
              {[contactEmail, contactPhone].filter(Boolean).join(' | ') || 'N/A'}
            </p>
          </div>

          {/* Delivery Address */}
          <div className="space-y-1">
            <h2 className="font-bold text-sm tracking-wider uppercase border-b border-[#E0D8CD] pb-2 mb-3 text-[#ff0081]">
              DELIVERY ADDRESS
            </h2>
            <p className="text-sm font-sans">
              <span className="font-serif font-bold text-gray-800">Shipping Address : </span>
              {addressLine || 'N/A'}
            </p>
          </div>

          {/* Ordered Items Box */}
          <div className="bg-[#FAF6F0] rounded-2xl p-5 border border-[#E0D8CD] shadow-sm space-y-4">
            <div className="flex justify-between items-center font-bold px-1 text-[#ff0081]">
              <span className="text-sm tracking-wider uppercase">ORDERED ITEMS</span>
              <span className="text-xs uppercase flex items-center gap-1 text-gray-600">Status </span>
            </div>

            <div className="space-y-3 font-sans">
              {items.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-4">No items found</p>
              ) : (
                items.map((item, idx) => {
                  const itemName = item.name || item.productName || 'Product';
                  const qty = item.quantity || item.qty || 1;
                  const price = item.price ?? 0;
                  const subtotal = item.subtotal ?? (qty * price);
                  const itemStatus = item.status || selectedStatus;
                  const imgSrc = item.image || item.imageUrl || '';

                  return (
                    <div key={item._id || idx} className="bg-white rounded-xl p-3.5 flex items-center justify-between border border-[#E0D8CD] shadow-xs">
                      <div className="flex items-center gap-3">
                        {imgSrc ? (
                          <img src={imgSrc} alt={itemName} className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center text-[#ff0081] text-xs font-bold">
                            {itemName.charAt(0)}
                          </div>
                        )}
                        <span className="font-serif font-bold text-sm max-w-[180px] text-gray-800">{itemName}</span>
                      </div>

                      <div className="text-xs font-semibold text-gray-700">
                        {qty} × Rs {Number(price).toLocaleString()}
                      </div>

                      <div className="text-xs font-bold font-sans text-gray-900">
                        Rs {Number(subtotal).toLocaleString()}
                      </div>

                      <div>
                        <span className={`px-3 py-1 rounded-md text-[11px] font-bold font-sans border ${
                          itemStatus === 'Delivered' || itemStatus === 'delivered'
                            ? 'bg-pink-100 text-[#ff0081] border-pink-200' 
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {itemStatus}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Total Summary & Update Status */}
        <div className="relative">
          <div className="bg-[#FAF6F0] rounded-2xl p-6 border border-[#E0D8CD] shadow-sm space-y-5 font-sans">
            <h2 className="font-serif font-bold text-base tracking-wider uppercase border-b border-[#E0D8CD] pb-2 text-[#ff0081]">
              TOTAL SUMMARY
            </h2>

            <div className="space-y-3 text-sm font-serif">
              <div className="flex justify-between">
                <span className="font-bold">Items Total</span>
                <span className="font-bold">Rs {Number(itemsTotal).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Shipping</span>
                <span className="font-bold">Rs {Number(shipping).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Tax ( if applicable )</span>
                <span className="font-bold">Rs {Number(tax).toLocaleString()}</span>
              </div>
            </div>

            <hr className="border-[#E0D8CD] my-4" />

            <div className="flex justify-between font-serif font-bold text-lg">
              <span>ORDER TOTAL :</span>
              <span className="text-[#ff0081]">Rs {Number(orderTotal).toLocaleString()}</span>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-serif font-bold mb-2 text-gray-700">Update Order Status</label>
              
              {/* Main Action Button */}
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                disabled={updating}
                className="w-full bg-[#ff0081] text-white py-3.5 rounded-xl font-serif font-bold text-xs tracking-widest uppercase hover:bg-[#d9006e] transition flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-60"
              >
                {updating ? 'UPDATING...' : 'UPDATE STATUS'}
              </button>
            </div>
          </div>

          {/* Dropdown Menu Modal */}
          {isDropdownOpen && (
            <div className="absolute top-[270px] left-0 right-0 bg-white border border-[#E0D8CD] rounded-2xl shadow-2xl z-20 overflow-hidden font-sans text-sm">
              <div 
                className="bg-[#ff0081] text-white px-4 py-3 font-bold flex justify-between items-center text-xs tracking-wider uppercase cursor-pointer"
                onClick={() => setIsDropdownOpen(false)}
              >
                <span>Update Order Status</span>
                <FaChevronDown className="rotate-180" />
              </div>
              <div className="divide-y divide-gray-100">
                {statusOptions.map((status) => (
                  <div 
                    key={status}
                    onClick={() => updateStatus(status)}
                    className="px-4 py-3 flex items-center gap-3 hover:bg-pink-50 cursor-pointer font-serif font-bold text-xs text-[#ff0081] transition"
                  >
                    {selectedStatus === status && <FaCheck className="text-xs" />}
                    <span className={selectedStatus === status ? 'ml-0' : 'ml-5'}>
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

// ── Orders List View ───────────────────────────────────────────────────────
const AdminOrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const loadOrders = () => {
    setLoading(true);
    fetch(`${API_BASE}/api/admin/orders`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setOrders(d.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusUpdated = (id, status) => {
    setOrders(prev =>
      prev.map(o => o._id === id ? { ...o, status } : o)
    );
    if (selectedOrder && selectedOrder._id === id) {
      setSelectedOrder(prev => ({ ...prev, status }));
    }
  };

  // If viewing a specific order
  if (selectedOrder) {
    return (
      <OrderDetailView
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
        onStatusUpdated={handleStatusUpdated}
      />
    );
  }

  // Skeleton row
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      {[...Array(6)].map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
        </td>
      ))}
    </tr>
  );

  return (
    <div className="p-6 md:p-10 bg-white min-h-screen font-serif text-[#222222]">
      <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-8 text-[#ff0081]">
        ORDER MANAGEMENT
      </h1>

      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 bg-white border-b border-gray-100">
          <h2 className="font-bold text-gray-800 text-sm">All Orders</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600 font-sans">
            <thead className="bg-[#ff0081] text-white font-medium">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Date Placed</th>
                <th className="px-6 py-3 text-center">Payment</th>
                <th className="px-6 py-3">Total (Rs)</th>
                <th className="px-6 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-400 font-sans">
                    No orders yet
                  </td>
                </tr>
              ) : (
                orders.map((order, idx) => {
                  const shippingAddress = order.shippingAddress || {};
                  const customerName = shippingAddress.fullName
                    || shippingAddress.firstName
                      ? `${shippingAddress.firstName || ''} ${shippingAddress.lastName || ''}`.trim()
                      : order.customer?.name || 'N/A';
                  const orderId = order.orderNumber || `#${String(order._id).slice(-4).toUpperCase()}`;
                  const date = order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : order.date || '';
                  const payment = order.paymentMethod || order.payment || 'N/A';
                  const total = order.totalAmount != null
                    ? Number(order.totalAmount).toLocaleString()
                    : order.total || '0';
                  const status = order.status || 'Pending';

                  return (
                    <tr
                      key={order._id || idx}
                      className="hover:bg-pink-50/50 transition cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="px-6 py-4 font-semibold text-gray-800">{orderId}</td>
                      <td className="px-6 py-4">{customerName}</td>
                      <td className="px-6 py-4">{date}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-pink-100 text-pink-950">
                          {payment}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-700">{total}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-4 py-1 rounded-full text-[10px] font-semibold ${
                          status === 'delivered' || status === 'Delivered' || status === 'Complete'
                            ? 'bg-green-100 text-green-700'
                            : status === 'Cancelled' || status === 'cancelled'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
