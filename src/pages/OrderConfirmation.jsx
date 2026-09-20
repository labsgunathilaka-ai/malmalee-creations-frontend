import React from 'react';
import { FaClipboardCheck } from 'react-icons/fa';

const OrderConfirmation = () => {
  const orderItems = [
    {
      id: 1,
      name: 'Imperial Damask Velvet Bow',
      price: '480/=',
      quantity: 2,
      subtotal: '960/=',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 2,
      name: 'Petit Fleur Silk Minaudière',
      price: '185/=',
      quantity: 4,
      subtotal: '740/=',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 3,
      name: 'Versailles French Lace Ribbon',
      price: '340/=',
      quantity: 1,
      subtotal: '340/=',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 4,
      name: 'Heirloom Padded Velvet Headband',
      price: '540/=',
      quantity: 3,
      subtotal: '1,620/=',
      image: 'https://via.placeholder.com/80',
    },
  ];

  return (
    <div className="min-h-screen bg-white py-10 px-4 md:px-12 font-serif text-[#3B0066]">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Banner Header */}
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <FaClipboardCheck className="text-3xl md:text-4xl text-[#3B0066]" />
            <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">
              THANK YOU FOR YOUR ORDER , ASHINI ! ( Order #063 )
            </h1>
          </div>
          <p className="text-sm font-sans text-gray-700 font-semibold md:ml-12">
            Your order of <span className="font-bold">LKR 4,160.00</span> is confirmed and will be delivered by <span className="font-bold">Cash on Delivery (COD)</span> in 2-3 business days.
          </p>
        </div>

        {/* Order Details Table */}
        <div className="bg-[#FAF6F0] rounded-2xl p-4 md:p-6 shadow-sm border border-stone-200 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-stone-300 text-sm font-bold text-[#3B0066]">
                <th className="py-3 px-2">Product Image</th>
                <th className="py-3 px-2">Item Details</th>
                <th className="py-3 px-2 text-center">Price (LKR)</th>
                <th className="py-3 px-2 text-center">Quantity</th>
                <th className="py-3 px-2 text-center">Subtotal (Rs)</th>
                <th className="py-3 px-2 text-center">Item Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-sm">
              {orderItems.map((item) => (
                <tr key={item.id} className="bg-white/50 hover:bg-white transition">
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg text-[#3B0066]">{item.id}</span>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded-md border border-gray-200"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-2 font-bold max-w-[200px]">
                    {item.name}
                  </td>
                  <td className="py-4 px-2 text-center font-sans font-semibold">
                    {item.price}
                  </td>
                  <td className="py-4 px-2 text-center">
                    <span className="bg-gray-200 font-sans font-bold px-4 py-1.5 rounded-full inline-block">
                      {item.quantity}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-center font-sans font-semibold">
                    {item.subtotal}
                  </td>
                  <td className="py-4 px-2 text-center">
                    <span className="bg-purple-100 text-[#3B0066] font-sans text-xs font-bold px-3 py-2 rounded-lg inline-block border border-purple-200">
                      Order Processing Badge
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Display */}
        <div className="flex justify-end items-center gap-8 text-xl md:text-2xl font-bold font-serif text-[#3B0066]">
          <span>Order Total :</span>
          <span>Rs 4,160.00</span>
        </div>

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <button className="bg-[#3B0066] text-white py-3.5 px-8 rounded-lg font-serif font-bold tracking-wider hover:bg-purple-900 transition">
            Continue Shopping
          </button>
          <button className="bg-white text-[#3B0066] border-2 border-[#3B0066] py-3.5 px-8 rounded-lg font-serif font-bold tracking-wider hover:bg-purple-50 transition">
            View Order History
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderConfirmation;