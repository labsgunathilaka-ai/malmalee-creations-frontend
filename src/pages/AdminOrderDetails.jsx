import React, { useState } from 'react';
import { 
  FaThLarge, 
  FaBoxes, 
  FaShoppingBag, 
  FaClipboardList, 
  FaCog, 
  FaSignOutAlt, 
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
      image: 'https://via.placeholder.com/60',
    },
    {
      id: 2,
      name: 'Petit Fleur Silk Minaudière',
      qty: 4,
      price: '185/=',
      subtotal: '740/=',
      status: 'Delivered',
      image: 'https://via.placeholder.com/60',
    },
    {
      id: 3,
      name: 'Versailles French Lace Ribbon',
      qty: 1,
      price: '340/=',
      subtotal: '340/=',
      status: 'Processing',
      image: 'https://via.placeholder.com/60',
    },
    {
      id: 4,
      name: 'Heirloom Padded Velvet Headband',
      qty: 3,
      price: '540/=',
      subtotal: '1,620/=',
      status: 'Delivered',
      image: 'https://via.placeholder.com/60',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-serif text-[#3B0066]">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#3B0066] text-white flex flex-col justify-between p-6">
        <div className="space-y-8">
          <div className="text-center md:text-left">
            <h1 className="text-xl font-bold">Malmalee</h1>
            <p className="text-xs font-sans tracking-widest text-purple-200 uppercase">Creations</p>
          </div>

          <nav className="space-y-2 font-sans text-sm">
            <a href="#dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-900/50 transition">
              <FaThLarge /> Dashboard
            </a>
            <a href="#categories" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-900/50 transition">
              <FaBoxes /> Categories
            </a>
            <a href="#products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-900/50 transition">
              <FaShoppingBag /> Products
            </a>
            <a href="#orders" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-purple-200 text-[#3B0066] font-bold shadow">
              <FaClipboardList /> Orders
            </a>
          </nav>
        </div>

        <div className="space-y-2 font-sans text-sm border-t border-purple-800/60 pt-4">
          <a href="#settings" className="flex items-center gap-3 px-4 py-2 hover:bg-purple-900/50 rounded-lg transition">
            <FaCog /> Settings
          </a>
          <a href="#logout" className="flex items-center gap-3 px-4 py-2 hover:bg-purple-900/50 rounded-lg transition text-purple-200">
            <FaSignOutAlt /> Logout
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 bg-white">
        
        {/* Header Title */}
        <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-6">
          ORDER DETAILS | <span className="font-normal">Order #063</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Details & Items */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Customer Info */}
            <div className="space-y-1">
              <h2 className="font-bold text-sm tracking-wider uppercase border-b border-gray-200 pb-1 mb-2">
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
              <h2 className="font-bold text-sm tracking-wider uppercase border-b border-gray-200 pb-1 mb-2">
                DELIVERY ADDRESS
              </h2>
              <p className="text-sm font-sans">
                <span className="font-serif font-bold text-gray-800">Shipping Address : </span>
                112 Street, Kanos Road, Wadduwa, Western Province, Sri Lanka.
              </p>
            </div>

            {/* Ordered Items Box */}
            <div className="bg-[#FAF6F0] rounded-2xl p-4 border border-stone-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center font-bold px-2">
                <span className="text-sm tracking-wider uppercase">ORDERED ITEMS</span>
                <span className="text-xs uppercase flex items-center gap-1">Status <FaChevronDown size={10} /></span>
              </div>

              <div className="space-y-3 font-sans">
                {orderItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl p-3 flex items-center justify-between border border-stone-100 shadow-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md border border-gray-100" />
                      <span className="font-serif font-bold text-sm max-w-[180px]">{item.name}</span>
                    </div>

                    <div className="text-xs font-semibold text-gray-700">
                      {item.qty} × {item.price}
                    </div>

                    <div className="text-xs font-bold font-sans">
                      {item.subtotal}
                    </div>

                    <div>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold font-sans ${
                        item.status === 'Delivered' 
                          ? 'bg-[#660099] text-white' 
                          : 'bg-purple-100 text-[#3B0066]'
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
            <div className="bg-[#FAF6F0] rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4 font-sans">
              <h2 className="font-serif font-bold text-base tracking-wider uppercase border-b border-stone-300 pb-2 text-[#3B0066]">
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

              <hr className="border-stone-300 my-4" />

              <div className="flex justify-between font-serif font-bold text-lg text-[#3B0066]">
                <span>ORDER TOTAL :</span>
                <span>Rs 4,160.00</span>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-serif font-bold mb-2">Update Order Status</label>
                
                {/* Main Action Button */}
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-[#3B0066] text-white py-3 rounded-lg font-serif font-bold text-sm tracking-wider uppercase hover:bg-purple-900 transition flex items-center justify-center gap-2 shadow"
                >
                  UPDATE STATUS
                </button>
              </div>
            </div>

            {/* Dropdown Menu Modal */}
            {isDropdownOpen && (
              <div className="absolute top-[260px] left-0 right-0 bg-white border border-gray-300 rounded-xl shadow-2xl z-20 overflow-hidden font-sans text-sm">
                <div 
                  className="bg-[#3B0066] text-white px-4 py-2.5 font-bold flex justify-between items-center text-xs tracking-wider uppercase cursor-pointer"
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
                      className="px-4 py-3 flex items-center gap-3 hover:bg-purple-50 cursor-pointer font-serif font-bold text-xs text-[#3B0066]"
                    >
                      {selectedStatus === status && <FaCheck className="text-xs" />}
                      <span className={selectedStatus === status ? 'ml-0' : 'ml-6'}>
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </main>

    </div>
  );
};

export default AdminOrderDetails;