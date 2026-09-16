import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const Cart = () => {
  // Sample Cart Items matching Figma UI
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
    <div className="min-h-screen bg-white py-10 px-4 md:px-12 font-serif text-[#3B0066]">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8 tracking-wider uppercase">
          YOUR SHOPPING CART
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Cart Items Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans">
                
                {/* Table Header with Beige Background */}
                <thead className="bg-[#EFE8D8] text-[#3B0066] font-serif font-bold text-sm md:text-base border-b border-gray-200">
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
                <tbody className="divide-y divide-gray-200">
                  {cartItems.map((item, index) => (
                    <tr key={item.id} className="hover:bg-purple-50/20 transition">
                      <td className="py-4 px-4 font-bold text-center text-lg">{index + 1}</td>
                      <td className="py-4 px-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-md border border-gray-200"
                        />
                      </td>
                      <td className="py-4 px-4 font-serif font-semibold text-gray-800">
                        {item.name}
                      </td>
                      <td className="py-4 px-4 text-center font-semibold text-gray-700">
                        {item.price}/=
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center border border-gray-300 rounded overflow-hidden w-28 mx-auto bg-gray-50">
                          <button 
                            onClick={() => handleQuantityChange(item.id, 'decrease')}
                            className="p-2 text-gray-600 hover:bg-gray-200 transition"
                          >
                            <FaMinus size={10} />
                          </button>
                          <span className="flex-1 text-center font-bold text-sm">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, 'increase')}
                            className="p-2 text-gray-600 hover:bg-gray-200 transition"
                          >
                            <FaPlus size={10} />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-gray-800">
                        {(item.price * item.quantity).toLocaleString()}/=
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm font-sans">
            <h2 className="font-serif text-2xl font-bold text-[#3B0066] mb-6 tracking-wide">
              ORDER SUMMARY
            </h2>

            <div className="space-y-4 text-gray-700 text-base mb-6">
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
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-50 focus:outline-none focus:border-[#660099]"
              />
              <button className="bg-[#D8C4EC] text-[#3B0066] px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#c6aee3] transition">
                APPLY
              </button>
            </div>

            <hr className="my-6 border-gray-300" />

            {/* Total Section */}
            <div className="flex justify-between font-serif text-xl font-bold text-[#3B0066] mb-6">
              <span>TOTAL :</span>
              <span>Rs {total.toLocaleString()}.00</span>
            </div>

            {/* Checkout Actions */}
            <div className="space-y-4">
              <button className="w-full bg-[#3B0066] text-white py-3.5 rounded-lg font-serif font-bold text-sm tracking-widest uppercase hover:bg-purple-900 transition shadow-md">
                PROCEED TO CHECKOUT
              </button>
              
              <div className="text-center">
                <a href="#shop" className="font-serif font-bold text-[#3B0066] hover:underline text-sm inline-block">
                  Continue Shopping
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;