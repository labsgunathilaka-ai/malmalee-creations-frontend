import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const Cart = ({ onNavigate = () => {} }) => {
  // Sample Cart Items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Imperial Damask Velvet Bow',
      price: 480,
      quantity: 2,
      image: 'https://via.placeholder.com/60',
    },
    {
      id: 2,
      name: 'Petit Fleur Silk Minaudière',
      price: 185,
      quantity: 4,
      image: 'https://via.placeholder.com/60',
    },
    {
      id: 3,
      name: 'Versailles French Lace Ribbon',
      price: 340,
      quantity: 1,
      image: 'https://via.placeholder.com/60',
    },
    {
      id: 4,
      name: 'Heirloom Padded Velvet Headband',
      price: 540,
      quantity: 3,
      image: 'https://via.placeholder.com/60',
    },
  ]);

  const shippingCost = 450;

  const handleQuantityChange = (id, type) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQty = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-[#fff8fa] py-10 px-4 md:px-12 font-sans text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8 tracking-wider uppercase font-serif text-[#ff0081]">
          YOUR SHOPPING CART
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Cart Items Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#ff77bc]/40 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans">
                
                {/* Table Header with Light Pastel Pink Background (#ffcae5) & Dark Text */}
                <thead className="bg-[#ffcae5] text-[#1a1a1a] font-serif font-bold text-sm md:text-base border-b border-[#ff48a5]/30">
                  <tr>
                    <th className="py-4 px-4 text-center">#</th>
                    <th className="py-4 px-4">Product Image</th>
                    <th className="py-4 px-4">Item Details</th>
                    <th className="py-4 px-4 text-center">Price (LKR)</th>
                    <th className="py-4 px-4 text-center">Quantity</th>
                    <th className="py-4 px-4 text-right">Subtotal (Rs)</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-[#ff77bc]/20">
                  {cartItems.map((item, index) => (
                    <tr key={item.id} className="hover:bg-[#ffcae5]/20 transition">
                      <td className="py-4 px-4 font-bold text-center text-lg text-[#ff0081]">{index + 1}</td>
                      <td className="py-4 px-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-md border border-[#ff77bc]/40"
                        />
                      </td>
                      <td className="py-4 px-4 font-serif font-semibold text-[#1a1a1a]">
                        {item.name}
                      </td>
                      <td className="py-4 px-4 text-center font-semibold text-gray-700">
                        {item.price}/=
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center border border-[#ff48a5] rounded overflow-hidden w-28 mx-auto bg-white">
                          <button 
                            onClick={() => handleQuantityChange(item.id, 'decrease')}
                            className="p-2 text-[#ff0081] hover:bg-[#ffcae5] transition"
                          >
                            <FaMinus size={10} />
                          </button>
                          <span className="flex-1 text-center font-bold text-sm text-[#1a1a1a]">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, 'increase')}
                            className="p-2 text-[#ff0081] hover:bg-[#ffcae5] transition"
                          >
                            <FaPlus size={10} />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-[#1a1a1a]">
                        {(item.price * item.quantity).toLocaleString()}/=
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>

          {/* Right Column: Order Summary Card with Light Pastel Background */}
          <div className="bg-[#ffaed7]/20 rounded-2xl border border-[#ff48a5]/40 p-6 shadow-sm font-sans">
            <h2 className="font-serif text-2xl font-bold text-[#ff0081] mb-6 tracking-wide">
              ORDER SUMMARY
            </h2>

            <div className="space-y-4 text-[#1a1a1a] text-base mb-6">
              <div className="flex justify-between font-serif">
                <span className="font-bold">Subtotal</span>
                <span className="font-bold">Rs {subtotal.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between font-serif">
                <span className="font-bold">Estimated Shipping</span>
                <span className="font-bold">Rs {shippingCost.toLocaleString()}.00</span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="flex gap-2 mb-6">
              <input 
                type="text" 
                placeholder="Promo Code" 
                className="flex-1 border border-[#ff48a5] rounded-lg px-4 py-2 text-sm bg-white text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#ff0081]"
              />
              <button className="bg-[#ff48a5] text-white px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#ff0081] transition cursor-pointer">
                APPLY
              </button>
            </div>

            <hr className="my-6 border-[#ff77bc]/50" />

            {/* Total Section */}
            <div className="flex justify-between font-serif text-xl font-bold text-[#1a1a1a] mb-6">
              <span>TOTAL :</span>
              <span className="text-[#ff0081]">Rs {total.toLocaleString()}.00</span>
            </div>

            {/* Checkout Actions */}
            <div className="space-y-4">
              {/* Primary Action Button (#ff0081) */}
              <button 
                onClick={() => onNavigate('checkout')}
                className="w-full bg-[#ff0081] text-white py-3.5 rounded-lg font-serif font-bold text-sm tracking-widest uppercase hover:bg-[#d9006e] transition shadow-md cursor-pointer"
              >
                PROCEED TO CHECKOUT
              </button>
              
              {/* Secondary Navigation Link */}
              <div className="text-center">
                <button 
                  onClick={() => onNavigate('home')}
                  className="font-serif font-bold text-[#ff0081] hover:underline text-sm inline-block cursor-pointer bg-transparent border-none"
                >
                  Continue Shopping
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;