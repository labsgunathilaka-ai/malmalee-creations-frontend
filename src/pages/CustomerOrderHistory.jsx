import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiPackage, FiClock, FiTruck, FiCheckCircle,
  FiChevronDown, FiChevronUp, FiShoppingBag, FiAlertCircle
} from 'react-icons/fi';

const API_BASE = 'http://localhost:5000';

// Status → display config (no icon stored to avoid undefined component crashes)
const STATUS_CONFIG = {
  Pending:    { bg: 'bg-amber-100',  text: 'text-amber-700',  dot: 'bg-amber-400'  },
  Confirmed:  { bg: 'bg-blue-100',   text: 'text-blue-700',   dot: 'bg-blue-400'   },
  Processing: { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-400' },
  Shipped:    { bg: 'bg-indigo-100', text: 'text-indigo-700', dot: 'bg-indigo-400' },
  Delivered:  { bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-400'  },
  Cancelled:  { bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-400'    },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status || 'Pending'}
    </span>
  );
};

const CustomerOrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders]   = useState(null);  // null = not yet loaded
  const [error, setError]     = useState('');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    let email = '';
    try {
      const userData = localStorage.getItem('malmalee_user');
      if (!userData) { navigate('/login'); return; }
      const user = JSON.parse(userData);
      email = user.email || '';
    } catch {
      navigate('/login');
      return;
    }

    if (!email) { navigate('/login'); return; }

    fetch(`${API_BASE}/api/orders/history?email=${encodeURIComponent(email)}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setOrders(Array.isArray(d.data) ? d.data : []);
        } else {
          setError(d.message || 'Could not load orders.');
          setOrders([]);
        }
      })
      .catch(() => {
        setError('Cannot connect to server. Make sure the backend is running.');
        setOrders([]);
      });
  }, []);

  // Loading state
  if (orders === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-4 border-[#ff0081] border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-sm text-gray-400">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate('/profile')}
            className="text-gray-400 hover:text-[#ff0081] transition text-sm">
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
          {orders.length > 0 && (
            <span className="ml-auto text-sm text-gray-400">{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 flex items-start gap-3">
            <FiAlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Empty state */}
        {orders.length === 0 && !error && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
            <FiShoppingBag className="w-16 h-16 text-pink-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No orders yet</h3>
            <p className="text-gray-400 text-sm mb-6">Start shopping to see your orders here!</p>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-2.5 bg-[#ff0081] hover:bg-[#c40063] text-white rounded-xl font-semibold text-sm transition">
              Shop Now
            </button>
          </div>
        )}

        {/* Orders list */}
        {orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order, orderIdx) => {
              const orderId  = order._id || orderIdx;
              const isOpen   = expanded === orderId;
              const dateStr  = order.createdAt
                ? new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                : 'Date not available';
              const items    = Array.isArray(order.items) ? order.items : [];

              return (
                <div key={orderId} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                  {/* Order header row */}
                  <div
                    className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => setExpanded(isOpen ? null : orderId)}>
                    <div>
                      <p className="font-bold text-gray-800">{order.orderNumber || `#${String(orderId).slice(-6)}`}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{dateStr}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <StatusBadge status={order.status} />
                      <p className="font-bold text-gray-800">
                        Rs {(order.total || 0).toLocaleString()}
                      </p>
                      {isOpen
                        ? <FiChevronUp className="text-gray-400 w-4 h-4 flex-shrink-0" />
                        : <FiChevronDown className="text-gray-400 w-4 h-4 flex-shrink-0" />
                      }
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isOpen && (
                    <div className="border-t border-gray-100 px-6 py-5">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Order Items</p>

                      <div className="space-y-3">
                        {items.map((item, i) => {
                          const imgSrc = item.image
                            ? (String(item.image).startsWith('http') ? item.image : `${API_BASE}${item.image}`)
                            : null;
                          const lineTotal = ((Number(item.price) || 0) * (Number(item.quantity) || 1));

                          return (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-pink-50 border border-pink-100 overflow-hidden flex-shrink-0">
                                {imgSrc
                                  ? <img src={imgSrc} alt={item.name || 'Product'} className="w-full h-full object-cover" />
                                  : <div className="w-full h-full flex items-center justify-center text-pink-300 text-lg font-bold">
                                      {(item.name || 'P')[0]}
                                    </div>
                                }
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-800 truncate">{item.name || 'Product'}</p>
                                <p className="text-xs text-gray-400">Qty: {item.quantity || 1} × Rs {(Number(item.price) || 0).toLocaleString()}</p>
                              </div>
                              <p className="text-sm font-bold text-gray-700 flex-shrink-0">
                                Rs {lineTotal.toLocaleString()}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      {/* Totals footer */}
                      <div className="mt-5 pt-4 border-t border-gray-50 flex justify-between items-end text-sm">
                        <div className="text-gray-500 space-y-1">
                          <p>Shipping: Rs {(order.shippingFee || 0).toLocaleString()}</p>
                          <p>Payment: {order.paymentMethod || 'Cash on Delivery'}</p>
                          {order.shippingAddress?.city && (
                            <p>Delivery to: {order.shippingAddress.city}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-gray-500 text-xs mb-1">Total</p>
                          <p className="text-xl font-bold text-[#ff0081]">Rs {(order.total || 0).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default CustomerOrderHistory;
