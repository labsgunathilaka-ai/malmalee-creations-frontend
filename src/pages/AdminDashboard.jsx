import React, { useState } from 'react';
import { 
  FaThLarge, 
  FaShapes, 
  FaBox, 
  FaClipboardList, 
  FaCog, 
  FaSignOutAlt,
  FaShoppingCart,
  FaDollarSign,
  FaClock,
  FaExclamationTriangle
} from 'react-icons/fa';


import AdminOrderDetails from './AdminOrderDetails';

const AdminDashboard = () => {
  
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample Data matching Figma wireframe
  const orders = [
    { id: 'Order #001', customer: 'Saman Perera', date: '2026-03-10', payment: 'COD', total: '1650/-', status: 'Pending' },
    { id: 'Order #002', customer: 'Nimal Silva', date: '2026-03-09', payment: 'Card', total: '3450/-', status: 'Complete' },
    { id: 'Order #003', customer: 'Kasun Jay', date: '2026-03-08', payment: 'COD', total: '1200/-', status: 'Pending' },
    { id: 'Order #004', customer: 'Dilini Perera', date: '2026-03-07', payment: 'COD', total: '2450/-', status: 'Complete' },
    { id: 'Order #005', customer: 'Amal Perera', date: '2026-03-06', payment: 'Card', total: '750/-', status: 'Pending' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      
      {/* Main Sidebar - එක් Sidebar එකක් පමණි */}
      <aside className="w-64 bg-[#ffaed7] text-gray-900 flex flex-col justify-between p-6">
        <div>
          <div className="text-center mb-10">
            <h2 className="text-xl font-bold tracking-wider uppercase">Malmalee</h2>
            <p className="text-xs text-pink-950">Creations</p>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition cursor-pointer ${
                activeTab === 'dashboard' ? 'bg-[#ff0081] text-white' : 'text-pink-950 hover:bg-[#ff77bc]'
              }`}
            >
              <FaThLarge /> Dashboard
            </button>

            <button 
              onClick={() => setActiveTab('categories')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition cursor-pointer ${
                activeTab === 'categories' ? 'bg-[#ff0081] text-white' : 'text-pink-950 hover:bg-[#ff77bc]'
              }`}
            >
              <FaShapes /> Categories
            </button>

            <button 
              onClick={() => setActiveTab('products')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition cursor-pointer ${
                activeTab === 'products' ? 'bg-[#ff0081] text-white' : 'text-pink-950 hover:bg-[#ff77bc]'
              }`}
            >
              <FaBox /> Products
            </button>

            {/* Orders Tab Button */}
            <button 
              onClick={() => setActiveTab('orders')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition cursor-pointer ${
                activeTab === 'orders' ? 'bg-[#ff0081] text-white' : 'text-pink-950 hover:bg-[#ff77bc]'
              }`}
            >
              <FaClipboardList /> Orders
            </button>
          </nav>
        </div>

        <div className="space-y-2 border-t border-pink-300 pt-4">
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition cursor-pointer ${
              activeTab === 'settings' ? 'text-[#ff0081] font-bold' : 'text-pink-950 hover:text-white'
            }`}
          >
            <FaCog /> Settings
          </button>
          <button className="w-full flex items-center gap-3 text-pink-950 hover:text-white px-4 py-2 text-sm transition cursor-pointer">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Dynamic View Content */}
      <main className="flex-1 bg-white">
        
        {/* 1. DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-[#ff0081] mb-6">Admin Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#EFE8D8] p-5 rounded-xl flex flex-col justify-between border border-[#E5DB8]">
                <div className="flex justify-between items-center text-gray-700 text-xs font-semibold">
                  <span>Total Orders</span>
                  <FaShoppingCart className="text-[#ff0081] text-base" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mt-4">84</h2>
              </div>

              <div className="bg-[#EFE8D8] p-5 rounded-xl flex flex-col justify-between border border-[#E5DB8]">
                <div className="flex justify-between items-center text-gray-700 text-xs font-semibold">
                  <span>Total Revenue (Rs)</span>
                  <FaDollarSign className="text-[#ff0081] text-base" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mt-4">65,000</h2>
              </div>

              <div className="bg-[#EFE8D8] p-5 rounded-xl flex flex-col justify-between border border-[#E5DB8]">
                <div className="flex justify-between items-center text-gray-700 text-xs font-semibold">
                  <span>Pending Orders</span>
                  <FaClock className="text-[#ff0081] text-base" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mt-4">11</h2>
              </div>

              <div className="bg-[#EFE8D8] p-5 rounded-xl flex flex-col justify-between border border-[#E5DB8]">
                <div className="flex justify-between items-center text-gray-700 text-xs font-semibold">
                  <span>Out Stock Products</span>
                  <FaExclamationTriangle className="text-[#ff0081] text-base" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mt-4">2</h2>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 bg-white border-b border-gray-100">
                <h2 className="font-bold text-gray-800 text-sm">Recently Placed Orders</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="bg-[#ff0081] text-white font-medium">
                    <tr>
                      <th className="px-6 py-3">Order ID</th>
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Date Placed</th>
                      <th className="px-6 py-3 text-center">Payment</th>
                      <th className="px-6 py-3">Total (Rs)</th>
                      <th className="px-6 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((order, idx) => (
                      <tr key={idx} className="hover:bg-pink-50/50 transition">
                        <td className="px-6 py-4 font-semibold text-gray-800">{order.id}</td>
                        <td className="px-6 py-4">{order.customer}</td>
                        <td className="px-6 py-4">{order.date}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-pink-100 text-pink-950">
                            {order.payment}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-700">{order.total}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-4 py-1 rounded-full text-[10px] font-semibold ${
                            order.status === 'Complete' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. CATEGORIES VIEW */}
        {activeTab === 'categories' && (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-[#ff0081]">Categories Management</h1>
          </div>
        )}

        {/* 3. PRODUCTS VIEW */}
        {activeTab === 'products' && (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-[#ff0081]">Products Management</h1>
          </div>
        )}

        {/* 4. ORDERS VIEW - මෙතැනදී Sidebar නොමැති AdminOrderDetails Component එක Render වේ */}
        {activeTab === 'orders' && (
          <div>
            <AdminOrderDetails />
          </div>
        )}

        {/* 5. SETTINGS VIEW */}
        {activeTab === 'settings' && (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-[#ff0081]">Settings</h1>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;