import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiShoppingBag } from 'react-icons/fi';

const CustomerOrderConfirmation = () => {
  const navigate  = useNavigate();
  const location  = useLocation();

  // Order data passed via navigate state from Checkout
  const { orderNumber, total, email } = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-white flex items-center justify-center p-6 font-sans">
      <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-10 text-center">

        {/* Success icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiCheckCircle className="w-10 h-10 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h1>
        <p className="text-gray-500 text-sm mb-6">
          Thank you for your order. We will contact you shortly to confirm delivery.
        </p>

        {/* Order details box */}
        {orderNumber && (
          <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Order Number</span>
              <span className="font-bold text-[#ff0081]">{orderNumber}</span>
            </div>
            {total && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">Total Amount</span>
                <span className="font-bold text-gray-800">Rs {total.toLocaleString()}</span>
              </div>
            )}
            {email && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">Confirmation sent to</span>
                <span className="font-semibold text-gray-700 truncate ml-2">{email}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Payment Method</span>
              <span className="font-semibold text-gray-700">Cash on Delivery</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Status</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" /> Pending Confirmation
              </span>
            </div>
          </div>
        )}

        {/* What's next */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">What happens next?</p>
          <ol className="space-y-2 text-sm text-gray-500">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#ff0081] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              Our team confirms your order via phone/WhatsApp
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#ff0081] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              Your order is carefully packed and dispatched
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#ff0081] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              Delivery to your door — pay cash on arrival
            </li>
          </ol>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate('/my-orders')}
            className="flex-1 py-2.5 border-2 border-[#ff0081] text-[#ff0081] hover:bg-pink-50 font-bold rounded-xl transition text-sm flex items-center justify-center gap-2">
            <FiPackage className="w-4 h-4" /> View Orders
          </button>
          <button
            onClick={() => navigate('/products')}
            className="flex-1 py-2.5 bg-[#ff0081] hover:bg-[#c40063] text-white font-bold rounded-xl transition text-sm flex items-center justify-center gap-2">
            <FiShoppingBag className="w-4 h-4" /> Shop More
          </button>
        </div>

      </div>
    </div>
  );
};

export default CustomerOrderConfirmation;
