import React, { useState } from 'react';
import { 
  FaChevronDown,
  FaCheck
} from 'react-icons/fa';

const AdminOrderDetails = () => {
  const [selectedStatus, setSelectedStatus] = useState('Set to Shipped');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const statusOptions = ['Set to Shipped', 'Pending', 'Processing', 'Delivered', 'Cancelled'];

  const orderItems = [
    {
      id: 1,
      name: 'Imperial Damask Velvet Bow',
      qty: 2,
      price: '480/=',
      subtotal: '960/=',
      status: 'Processing',
      image: 'https://images.unsplash.com/-24d5c474f2ae?w=100&auto=format&fit=crop&q=60',
    },
    {
      id: 2,
      name: 'Petit Fleur Silk Minaudière',
      qty: 4,
      price: '185/=',
      subtotal: '740/=',
      status: 'Delivered',
      image: 'https://images.unsplash.com/photo-1-3dd850d97f1d?w=100&auto=format&fit=crop&q=60',
    },
    {
      id: 3,
      name: 'Versailles French Lace Ribbon',
      qty: 1,
      price: '340/=',
      subtotal: '340/=',
      status: 'Processing',
      image: 'https://images.unsplash.com/photo-6927-ab7c9ab60908?w=100&auto=format&fit=crop&q=60',
    },
    {
      id: 4,
      name: 'Heirloom Padded Velvet Headband',
      qty: 3,
      price: '540/=',
      subtotal: '1,620/=',
      status: 'Delivered',
      image: 'https://images.unsplash.com/photo-906931-81f04f0cceab?w=100&auto=format&fit=crop&q=60',
    },
  ];

  return (
    <div className="p-6 md:p-10 bg-white min-h-screen font-serif text-[#222222]">
      
      {/* Header Title */}
      <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-8 text-[#ff0081]">
        ORDER DETAILS | <span className="font-normal text-gray-800">Order #063</span>
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
              Ashini Gamage
            </p>
            <p className="text-sm font-sans">
              <span className="font-serif font-bold text-gray-800">Contact : </span>
              ashini.g@gmail.com | +94 777447207
            </p>
          </div>

          {/* Delivery Address */}
          <div className="space-y-1">
            <h2 className="font-bold text-sm tracking-wider uppercase border-b border-[#E0D8CD] pb-2 mb-3 text-[#ff0081]">
              DELIVERY ADDRESS
            </h2>
            <p className="text-sm font-sans">
              <span className="font-serif font-bold text-gray-800">Shipping Address : </span>
              112 Street, Kanos Road, Wadduwa, Western Province, Sri Lanka.
            </p>
          </div>

          {/* Ordered Items Box */}
          <div className="bg-[#FAF6F0] rounded-2xl p-5 border border-[#E0D8CD] shadow-sm space-y-4">
            <div className="flex justify-between items-center font-bold px-1 text-[#ff0081]">
              <span className="text-sm tracking-wider uppercase">ORDERED ITEMS</span>
              <span className="text-xs uppercase flex items-center gap-1 text-gray-600">Status </span>
            </div>

            <div className="space-y-3 font-sans">
              {orderItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-3.5 flex items-center justify-between border border-[#E0D8CD] shadow-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                    <span className="font-serif font-bold text-sm max-w-[180px] text-gray-800">{item.name}</span>
                  </div>

                  <div className="text-xs font-semibold text-gray-700">
                    {item.qty} × {item.price}
                  </div>

                  <div className="text-xs font-bold font-sans text-gray-900">
                    {item.subtotal}
                  </div>

                  <div>
                    <span className={`px-3 py-1 rounded-md text-[11px] font-bold font-sans border ${
                      item.status === 'Delivered' 
                        ? 'bg-pink-100 text-[#ff0081] border-pink-200' 
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
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
                <span className="font-bold">Rs 3,660.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Shipping</span>
                <span className="font-bold">Rs 450.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Tax ( if applicable )</span>
                <span className="font-bold">Rs 50.00</span>
              </div>
            </div>

            <hr className="border-[#E0D8CD] my-4" />

            <div className="flex justify-between font-serif font-bold text-lg">
              <span>ORDER TOTAL :</span>
              <span className="text-[#ff0081]">Rs 4,160.00</span>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-serif font-bold mb-2 text-gray-700">Update Order Status</label>
              
              {/* Main Action Button */}
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-[#ff0081] text-white py-3.5 rounded-xl font-serif font-bold text-xs tracking-widest uppercase hover:bg-[#d9006e] transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                UPDATE STATUS
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
                    onClick={() => {
                      setSelectedStatus(status);
                      setIsDropdownOpen(false);
                    }}
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

export default AdminOrderDetails;