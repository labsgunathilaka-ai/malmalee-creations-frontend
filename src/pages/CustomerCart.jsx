import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';

const API_BASE = 'http://localhost:5000';
const SHIPPING_FEE = 350;

const CustomerCart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('malmalee_cart');
    setCart(stored ? JSON.parse(stored) : []);
  }, []);

  // Save cart to localStorage whenever it changes
  const saveCart = (updated) => {
    setCart(updated);
    localStorage.setItem('malmalee_cart', JSON.stringify(updated));
  };

  const updateQty = (productId, delta) => {
    const updated = cart.map(item =>
      item.productId === productId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    saveCart(updated);
  };

  const removeItem = (productId) => {
    saveCart(cart.filter(i => i.productId !== productId));
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = subtotal + (cart.length > 0 ? SHIPPING_FEE : 0);

  // ── Empty cart ─────────────────────────────────────────────────────────────
  if (cart.length === 0) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      <FiShoppingBag className="w-20 h-20 text-pink-200 mb-6" />
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
      <p className="text-gray-400 mb-8">Discover our luxury silk accessories and add your favourites.</p>
      <button onClick={() => navigate('/products')}
        className="px-8 py-3 bg-[#ff0081] hover:bg-[#c40063] text-white font-bold rounded-xl transition shadow-sm">
        Shop Now
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate('/products')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#ff0081] transition">
            <FiArrowLeft className="w-4 h-4" /> Continue Shopping
          </button>
          <span className="text-gray-300">|</span>
          <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
          <span className="ml-1 text-sm text-gray-400">({cart.length} item{cart.length !== 1 ? 's' : ''})</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => {
              const imgUrl = item.image
                ? (item.image.startsWith('http') ? item.image : `${API_BASE}${item.image}`)
                : null;
              return (
                <div key={item.productId} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-pink-50 border border-pink-100 flex-shrink-0">
                    {imgUrl
                      ? <img src={imgUrl} alt={item.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-pink-300 text-2xl font-bold">{item.name?.[0]}</div>
                    }
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1 pr-4">{item.name}</h3>
                    {item.sku && <p className="text-xs text-gray-400 mb-2">SKU: {item.sku}</p>}
                    <p className="text-[#ff0081] font-bold">Rs {item.price.toLocaleString()}.00</p>
                  </div>

                  {/* Qty + Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeItem(item.productId)}
                      className="text-gray-300 hover:text-red-400 transition">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1">
                      <button onClick={() => updateQty(item.productId, -1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-[#ff0081] transition">
                        <FiMinus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-semibold text-gray-800 w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item.productId, 1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-[#ff0081] transition">
                        <FiPlus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-gray-700">Rs {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-6">
              <h2 className="text-sm font-bold text-gray-800 mb-5 uppercase tracking-wider">Order Summary</h2>

              <div className="space-y-3 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.reduce((s,i)=>s+i.quantity,0)} items)</span>
                  <span className="font-semibold text-gray-800">Rs {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-800">Rs {SHIPPING_FEE.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-gray-800">
                  <span>Total</span>
                  <span className="text-[#ff0081]">Rs {total.toLocaleString()}</span>
                </div>
              </div>

              <button onClick={() => navigate('/checkout')}
                className="w-full py-3 bg-[#ff0081] hover:bg-[#c40063] text-white font-bold rounded-xl transition shadow-sm text-sm">
                Proceed to Checkout
              </button>

              <div className="mt-4 bg-pink-50 rounded-xl p-3 text-xs text-pink-700 text-center">
                🚚 Cash on Delivery available island-wide
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomerCart;
