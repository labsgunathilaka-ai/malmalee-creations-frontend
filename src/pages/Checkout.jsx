import React, { useState } from 'react';
import { FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('cod');

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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order Placed Successfully via ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}!`);
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 md:px-12 font-serif text-[#3B0066]">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8 tracking-wider uppercase">
          CHECKOUT FORM
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-bold uppercase mb-4 tracking-wide border-b border-purple-100 pb-2">
                CONTACT INFORMATION
              </h2>
              <div className="space-y-4 font-sans text-sm">
                <div>
                  <label className="block font-serif font-bold mb-1 text-gray-800">Full Name :</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#660099]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-serif font-bold mb-1 text-gray-800">Email Address :</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#660099]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-serif font-bold mb-1 text-gray-800">Phone Number :</label>
                  <div className="flex">
                    <span className="bg-gray-300 text-gray-800 font-bold px-4 py-3 rounded-l-lg flex items-center justify-center">
                      +94
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-gray-100 rounded-r-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#660099]"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <h2 className="text-lg font-bold uppercase mb-4 tracking-wide border-b border-purple-100 pb-2">
                DELIVERY ADDRESS
              </h2>
              <div className="space-y-4 font-sans text-sm">
                <div>
                  <label className="block font-serif font-bold mb-1 text-gray-800">Address Line 1 :</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#660099]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-serif font-bold mb-1 text-gray-800">Address Line 2 :</label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#660099]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-serif font-bold mb-1 text-gray-800">City :</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#660099]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-serif font-bold mb-1 text-gray-800">Postal Code :</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full bg-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#660099]"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Option Selector */}
            <div>
              <h2 className="text-lg font-bold uppercase mb-4 tracking-wide border-b border-purple-100 pb-2">
                PAYMENT METHOD
              </h2>
              <div className="space-y-4 font-sans">
                
                {/* Cash on Delivery */}
                <div 
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition ${
                    paymentMethod === 'cod' ? 'border-[#3B0066] bg-purple-50/30' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'cod'} 
                      onChange={() => setPaymentMethod('cod')}
                      className="w-5 h-5 accent-[#3B0066]"
                    />
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#3B0066]">Cash on Delivery</h3>
                      <p className="text-xs text-gray-600 font-semibold">Pay when you receive your order</p>
                    </div>
                  </div>
                  <FaMoneyBillWave size={28} className="text-[#3B0066]" />
                </div>

                {/* Online Payment */}
                <div 
                  onClick={() => setPaymentMethod('online')}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition ${
                    paymentMethod === 'online' ? 'border-[#3B0066] bg-purple-50/30' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === 'online'} 
                      onChange={() => setPaymentMethod('online')}
                      className="w-5 h-5 accent-[#3B0066]"
                    />
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#3B0066]">Online Payment</h3>
                      <p className="text-xs text-gray-600 font-semibold">Pay in online with your card</p>
                    </div>
                  </div>
                  <FaCreditCard size={28} className="text-[#3B0066]" />
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm font-sans">
            <h2 className="font-serif text-2xl font-bold text-[#3B0066] mb-6 tracking-wide">
              ORDER SUMMARY
            </h2>

            <div className="space-y-4 text-gray-700 text-base mb-6 font-serif">
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

            <hr className="my-6 border-gray-300" />

            {/* Total */}
            <div className="flex justify-between font-serif text-xl font-bold text-[#3B0066] mb-6">
              <span>TOTAL :</span>
              <span>Rs 4,160.00</span>
            </div>

            {/* Place Order Action */}
            <div className="space-y-4">
              <button 
                type="submit"
                className="w-full bg-[#3B0066] text-white py-3.5 rounded-lg font-serif font-bold text-base tracking-widest uppercase hover:bg-purple-900 transition shadow-md"
              >
                PLACE ORDER
              </button>
              
              <div className="text-center">
                <a href="#cart" className="font-serif font-bold text-[#3B0066] hover:underline text-sm inline-block">
                  Return to Cart
                </a>
              </div>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;