import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillWave } from 'react-icons/fa';
import { FiShoppingBag, FiAlertCircle, FiLoader } from 'react-icons/fi';

const API_BASE = 'http://localhost:5000';
const SHIPPING_FEE = 350;

const CustomerCheckout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null); // null = not loaded yet
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('malmalee_cart');
      const cartData = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(cartData) || cartData.length === 0) {
        navigate('/cart');
        return;
      }
      setCart(cartData);
    } catch {
      navigate('/cart');
      return;
    }

    // Pre-fill from logged-in user
    try {
      const userData = localStorage.getItem('malmalee_user');
      if (userData) {
        const user = JSON.parse(userData);
        setForm(f => ({
          ...f,
          fullName: user.fullName || user.name || '',
          email:    user.email || '',
          phone:    user.phone || '',
        }));
      }
    } catch { /* ignore */ }
  }, []);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const getImageUrl = (img) => {
    if (!img) return null;
    return String(img).startsWith('http') ? img : `${API_BASE}${img}`;
  };

  const safeItems = Array.isArray(cart) ? cart : [];
  const subtotal  = safeItems.reduce((s, i) => s + (Number(i.price) || 0) * (Number(i.quantity) || 1), 0);
  const total     = subtotal + SHIPPING_FEE;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.fullName || !form.email || !form.phone || !form.address || !form.city) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!safeItems.length) {
      setError('Your cart is empty.');
      return;
    }

    setLoading(true);
    try {
      const body = {
        customer: { name: form.fullName, email: form.email, phone: form.phone },
        shippingAddress: {
          fullName: form.fullName, phone: form.phone,
          address: form.address, city: form.city, postalCode: form.postalCode,
        },
        items: safeItems.map(item => ({
          productId: item.productId,
          name:      item.name,
          price:     Number(item.price) || 0,
          quantity:  Number(item.quantity) || 1,
          image:     item.image || '',
        })),
        shippingFee: SHIPPING_FEE,
        notes: form.notes || '',
      };

      const res  = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.removeItem('malmalee_cart');
        navigate('/order-confirmation', {
          state: {
            orderNumber: data.data.orderNumber,
            total:       data.data.total,
            email:       form.email,
          },
        });
      } else {
        setError(data.message || 'Failed to place order. Please try again.');
      }
    } catch {
      setError('Cannot connect to server. Please check your connection and try again.');
    }
    setLoading(false);
  };

  // Show loading until cart is resolved
  if (cart === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="animate-spin w-8 h-8 border-4 border-[#ff0081] border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-sm">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Left: Form ────────────────────────────── */}
          <div className="lg:col-span-3 space-y-6">

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                <FiAlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Delivery Details */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Delivery Details</h2>
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">

                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name *</label>
                    <input name="fullName" value={form.fullName} onChange={handleChange}
                      placeholder="Your full name" required
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] transition" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="email@example.com" required
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] transition" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Phone *</label>
                    <input name="phone" value={form.phone} onChange={handleChange}
                      placeholder="07X XXX XXXX" required
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] transition" />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Address *</label>
                    <input name="address" value={form.address} onChange={handleChange}
                      placeholder="House No, Street, Area" required
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] transition" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">City *</label>
                    <input name="city" value={form.city} onChange={handleChange}
                      placeholder="Colombo" required
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] transition" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Postal Code</label>
                    <input name="postalCode" value={form.postalCode} onChange={handleChange}
                      placeholder="00100"
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] transition" />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Order Notes (optional)</label>
                    <textarea name="notes" value={form.notes} onChange={handleChange}
                      placeholder="Any special instructions..."
                      rows={2}
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] transition resize-none" />
                  </div>

                </div>
              </form>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Payment Method</h2>
              <div className="border-2 border-[#ff0081] bg-pink-50 rounded-xl p-4 flex items-center gap-3">
                <FaMoneyBillWave className="w-5 h-5 text-[#ff0081] flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-gray-800">Cash on Delivery</p>
                  <p className="text-xs text-gray-500">Pay when your order arrives at your door</p>
                </div>
                <div className="ml-auto w-4 h-4 rounded-full border-2 border-[#ff0081] bg-[#ff0081] flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Order Summary ───────────────────── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-6">
              <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
                Order Summary
                <span className="ml-2 text-[#ff0081] font-normal normal-case">
                  ({safeItems.length} {safeItems.length === 1 ? 'item' : 'items'})
                </span>
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-5 max-h-56 overflow-y-auto pr-1">
                {safeItems.map((item, idx) => {
                  const imgUrl = getImageUrl(item.image);
                  return (
                    <div key={item.productId || idx} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-pink-50 border border-pink-100 overflow-hidden flex-shrink-0">
                        {imgUrl
                          ? <img src={imgUrl} alt={item.name || 'Product'} className="w-full h-full object-cover" />
                          : <FiShoppingBag className="w-full h-full p-3 text-pink-300" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-700 truncate">{item.name || 'Product'}</p>
                        <p className="text-xs text-gray-400">× {item.quantity || 1}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-700 flex-shrink-0">
                        Rs {((Number(item.price) || 0) * (Number(item.quantity) || 1)).toLocaleString()}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Totals */}
              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-700">Rs {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-700">Rs {SHIPPING_FEE.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-800 pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-[#ff0081]">Rs {total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={loading || safeItems.length === 0}
                className="w-full mt-5 py-3 bg-[#ff0081] hover:bg-[#c40063] text-white font-bold rounded-xl transition shadow-sm text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Placing Order...
                  </span>
                ) : 'Place Order — Cash on Delivery'}
              </button>

              <div className="mt-3 text-center text-xs text-gray-400">
                🔒 Your information is secure
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomerCheckout;
