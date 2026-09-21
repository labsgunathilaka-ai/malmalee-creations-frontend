import React, { useState } from 'react';
import { FaMoneyBillWave, FaCreditCard, FaBoxOpen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import product2 from '../assets/product-2.jpg';
import product3 from '../assets/product-3.jpg';
import product4 from '../assets/product-4.jpg';
import product5 from '../assets/product-5.jpg';

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form input states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
  });

  // Purchased items data for the table layout
  const orderItems = [
    {
      id: 1,
      image: product2,
      title: 'Imported Oversized Velvet Bow',
      price: 480,
      quantity: 2,
      subtotal: 960,
      status: 'Order Processing Badge'
    },
    {
      id: 2,
      image: product3,
      title: 'Petit Gear Silk Scrunchies',
      price: 185,
      quantity: 4,
      subtotal: 740,
      status: 'Order Processing Badge'
    },
    {
      id: 3,
      image: 'https://images.unsplash.coab7c9ab60908?w=100&auto=format&fit=crop&q=60',
      title: 'Versailles French Lace Ribbon',
      price: 340,
      quantity: 1,
      subtotal: 340,
      status: 'Order Processing Badge'
    },
    {
      id: 4,
      image: product4,
      title: 'Heirloom Padded Velvet Headband',
      price: 540,
      quantity: 3,
      subtotal: 1620,
      status: 'Order Processing Badge'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // ORDER CONFIRMATION PAGE VIEW (MATCHING IMAGE TABLE)
  if (isSubmitted) {
    const customerName = formData.fullName ? formData.fullName.toUpperCase() : 'ASHINI';
    
    return (
      <div className="min-h-screen bg-white py-8 px-4 md:px-12 font-serif text-[#1a1a1a]">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Header Block */}
          <div className="flex items-start gap-4 border-b pb-6">
            <div className="p-3 bg-pink-100 text-[#ff0081] rounded-lg">
              <FaBoxOpen className="text-3xl md:text-4xl" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-wide uppercase text-[#ff0081]">
                THANK YOU FOR YOUR ORDER , {customerName} ! (Order #063)
              </h1>
              <p className="text-xs md:text-sm text-gray-700 mt-1 font-sans">
                Your order of <span className="font-bold">LKR 4,160.00</span> has been received to be delivered by <span className="font-bold">{paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Online Payment'}</span> in 2-3 business days.
              </p>
            </div>
          </div>

          {/* Purchased Items Table */}
          <div className="overflow-x-auto bg-[#FAF6F0] rounded-2xl p-4 md:p-6 border border-[#E0D8CD] shadow-sm font-sans">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-[#E0D8CD] text-xs md:text-sm font-serif font-bold text-gray-800 uppercase">
                  <th className="py-3 px-2">Product Image</th>
                  <th className="py-3 px-2">Item Details</th>
                  <th className="py-3 px-2 text-center">Price (LKR)</th>
                  <th className="py-3 px-2 text-center">Quantity</th>
                  <th className="py-3 px-2 text-center">Subtotal(LKR)</th>
                  <th className="py-3 px-2 text-center">Item Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-xs md:text-sm">
                {orderItems.map((item) => (
                  <tr key={item.id} className="bg-white hover:bg-gray-50/50 transition">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <span className="font-bold font-serif text-base">{item.id}</span>
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-12 h-12 object-cover rounded-md border border-gray-200"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-2 font-serif font-bold text-gray-800">
                      {item.title}
                    </td>
                    <td className="py-3 px-2 text-center font-bold">
                      {item.price}/=
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className="bg-gray-200 px-3 py-1 rounded-full text-xs font-bold">
                        {item.quantity}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center font-bold">
                      {item.subtotal}/=
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className="bg-[#ffaed7]/40 text-[#ff0081] px-3 py-1 rounded-md text-[11px] font-bold inline-block border border-pink-200">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Total Display */}
          <div className="flex justify-end items-center gap-6 font-serif text-lg md:text-2xl font-bold pr-2">
            <span>Order Total :</span>
            <span className="text-[#ff0081]">Rs 4,160.00</span>
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/home')}
              className="bg-[#ff0081] text-white px-8 py-3 rounded-lg font-serif font-bold text-sm tracking-wide uppercase hover:bg-[#d9006e] transition cursor-pointer shadow-md"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="border-2 border-[#ff0081] text-[#ff0081] px-8 py-3 rounded-lg font-serif font-bold text-sm tracking-wide uppercase hover:bg-pink-50 transition cursor-pointer"
            >
              View Order History
            </button>
          </div>

        </div>
      </div>
    );
  }

  // CHECKOUT FORM VIEW
  return (
    <div className="min-h-screen bg-[#F5EFE6] py-6 md:py-10 px-4 md:px-8 lg:px-12 font-sans text-[#222222]">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif mb-6 md:mb-8 tracking-wider uppercase text-[#ff0081]">
          CHECKOUT FORM
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Form Fields Container */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8 bg-white p-6 md:p-8 rounded-2xl border border-[#E0D8CD] shadow-sm">
            
            {/* Contact Information */}
            <div>
              <h2 className="text-base md:text-lg font-bold font-serif uppercase mb-4 tracking-wide border-b border-[#E0D8CD] pb-2 text-[#ff0081]">
                CONTACT INFORMATION
              </h2>
              <div className="space-y-4 font-sans text-sm">
                <div>
                  <label className="block font-serif font-bold mb-1 text-[#222222]">Full Name :</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF6F0] border border-[#E0D8CD] rounded-lg px-4 py-2.5 md:py-3 text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#ff0081]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-serif font-bold mb-1 text-[#222222]">Email Address :</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF6F0] border border-[#E0D8CD] rounded-lg px-4 py-2.5 md:py-3 text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#ff0081]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-serif font-bold mb-1 text-[#222222]">Phone Number :</label>
                  <div className="flex">
                    <span className="bg-[#E0D8CD] text-[#222222] font-bold px-4 py-2.5 md:py-3 rounded-l-lg flex items-center justify-center border border-r-0 border-[#E0D8CD]">
                      +94
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-[#FAF6F0] border border-[#E0D8CD] rounded-r-lg px-4 py-2.5 md:py-3 text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#ff0081]"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <h2 className="text-base md:text-lg font-bold font-serif uppercase mb-4 tracking-wide border-b border-[#E0D8CD] pb-2 text-[#ff0081]">
                DELIVERY ADDRESS
              </h2>
              <div className="space-y-4 font-sans text-sm">
                <div>
                  <label className="block font-serif font-bold mb-1 text-[#222222]">Address Line 1 :</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF6F0] border border-[#E0D8CD] rounded-lg px-4 py-2.5 md:py-3 text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#ff0081]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-serif font-bold mb-1 text-[#222222]">Address Line 2 :</label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF6F0] border border-[#E0D8CD] rounded-lg px-4 py-2.5 md:py-3 text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#ff0081]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-serif font-bold mb-1 text-[#222222]">City :</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-[#FAF6F0] border border-[#E0D8CD] rounded-lg px-4 py-2.5 md:py-3 text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#ff0081]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-serif font-bold mb-1 text-[#222222]">Postal Code :</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full bg-[#FAF6F0] border border-[#E0D8CD] rounded-lg px-4 py-2.5 md:py-3 text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#ff0081]"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Option Selector */}
            <div>
              <h2 className="text-base md:text-lg font-bold font-serif uppercase mb-4 tracking-wide border-b border-[#E0D8CD] pb-2 text-[#ff0081]">
                PAYMENT METHOD
              </h2>
              <div className="space-y-4 font-sans">
                
                {/* Cash on Delivery */}
                <div 
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition ${
                    paymentMethod === 'cod' 
                      ? 'border-[#ff0081] bg-[#ffaed7]/20' 
                      : 'border-[#E0D8CD] bg-[#FAF6F0]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'cod'} 
                      onChange={() => setPaymentMethod('cod')}
                      className="w-5 h-5 accent-[#ff0081]"
                    />
                    <div>
                      <h3 className="font-serif font-bold text-base md:text-lg text-[#222222]">Cash on Delivery</h3>
                      <p className="text-xs text-gray-600 font-medium">Pay when you receive your order</p>
                    </div>
                  </div>
                  <FaMoneyBillWave size={26} className="text-[#ff0081]" />
                </div>

                {/* Online Payment */}
                <div 
                  onClick={() => setPaymentMethod('online')}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition ${
                    paymentMethod === 'online' 
                      ? 'border-[#ff0081] bg-[#ffaed7]/20' 
                      : 'border-[#E0D8CD] bg-[#FAF6F0]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'cod'} 
                      onChange={() => setPaymentMethod('online')}
                      className="w-5 h-5 accent-[#ff0081]"
                    />
                    <div>
                      <h3 className="font-serif font-bold text-base md:text-lg text-[#222222]">Online Payment</h3>
                      <p className="text-xs text-gray-600 font-medium">Pay online with your card</p>
                    </div>
                  </div>
                  <FaCreditCard size={26} className="text-[#ff0081]" />
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="bg-white rounded-2xl border border-[#E0D8CD] p-6 shadow-sm font-sans w-full">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#ff0081] mb-6 tracking-wide">
              ORDER SUMMARY
            </h2>

            <div className="space-y-4 text-[#222222] text-sm md:text-base mb-6 font-serif">
              <div className="flex justify-between">
                <span className="font-bold">Subtotal</span>
                <span className="font-bold">Rs 3,660.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Estimated Shipping</span>
                <span className="font-bold">Rs 450.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Tax ( if applicable )</span>
                <span className="font-bold">Rs 50.00</span>
              </div>
            </div>

            <hr className="my-6 border-[#E0D8CD]" />

            {/* Total */}
            <div className="flex justify-between font-serif text-lg md:text-xl font-bold text-[#222222] mb-6">
              <span>TOTAL :</span>
              <span className="text-[#ff0081]">Rs 4,160.00</span>
            </div>

            {/* Place Order Action */}
            <div className="space-y-4">
              <button 
                type="submit"
                className="w-full bg-[#ff0081] text-white py-3.5 rounded-xl font-serif font-bold text-xs md:text-sm tracking-widest uppercase hover:bg-[#d9006e] transition shadow-md cursor-pointer"
              >
                PLACE ORDER
              </button>
              
              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => navigate('/cart')}
                  className="font-serif font-bold text-[#ff0081] hover:underline text-xs md:text-sm inline-block cursor-pointer bg-transparent border-none py-1"
                >
                  Return to Cart
                </button>
              </div>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;