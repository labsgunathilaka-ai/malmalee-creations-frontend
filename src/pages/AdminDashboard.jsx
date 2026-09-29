import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import AdminCategoryManager from './AdminCategoryManager';
import AdminProductManager from './AdminProductManager';

const API_BASE = 'http://localhost:5000';

const AdminDashboard = () => {
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  // --- Stats State ---
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    setStatsLoading(true);
    fetch(`${API_BASE}/api/admin/dashboard/stats`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setStats(d.data);
        setStatsLoading(false);
      })
      .catch(() => setStatsLoading(false));
  }, []);

  // --- Recent orders for dashboard table ---
  const [recentOrders, setRecentOrders] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE}/api/admin/orders`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setRecentOrders(d.data.slice(0, 5));
      })
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  // Skeleton card component
  const SkeletonCard = () => (
    <div className="bg-[#EFE8D8] p-5 rounded-xl flex flex-col justify-between border border-[#E5DB8] animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-3 bg-gray-300 rounded w-24"></div>
        <div className="h-4 w-4 bg-gray-300 rounded"></div>
      </div>
      <div className="h-8 bg-gray-300 rounded w-16 mt-4"></div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      
     
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
          <button onClick={handleLogout} className="w-full flex items-center gap-3 text-pink-950 hover:text-white px-4 py-2 text-sm transition cursor-pointer">
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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {statsLoading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : (
                <>
                  <div className="bg-[#EFE8D8] p-5 rounded-xl flex flex-col justify-between border border-[#E5DB8]">
                    <div className="flex justify-between items-center text-gray-700 text-xs font-semibold">
                      <span>Total Orders</span>
                      <FaShoppingCart className="text-[#ff0081] text-base" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mt-4">
                      {stats ? stats.orders?.total ?? 0 : 0}
                    </h2>
                  </div>

                  <div className="bg-[#EFE8D8] p-5 rounded-xl flex flex-col justify-between border border-[#E5DB8]">
                    <div className="flex justify-between items-center text-gray-700 text-xs font-semibold">
                      <span>Total Revenue (Rs)</span>
                      <FaDollarSign className="text-[#ff0081] text-base" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mt-4">
                      {stats ? (stats.revenue?.total ?? 0).toLocaleString() : 0}
                    </h2>
                  </div>

                  <div className="bg-[#EFE8D8] p-5 rounded-xl flex flex-col justify-between border border-[#E5DB8]">
                    <div className="flex justify-between items-center text-gray-700 text-xs font-semibold">
                      <span>Pending Orders</span>
                      <FaClock className="text-[#ff0081] text-base" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mt-4">
                      {stats ? stats.orders?.pending ?? 0 : 0}
                    </h2>
                  </div>

                  <div className="bg-[#EFE8D8] p-5 rounded-xl flex flex-col justify-between border border-[#E5DB8]">
                    <div className="flex justify-between items-center text-gray-700 text-xs font-semibold">
                      <span>Out Stock Products</span>
                      <FaExclamationTriangle className="text-[#ff0081] text-base" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mt-4">
                      {stats ? stats.products?.outOfStock ?? 0 : 0}
                    </h2>
                  </div>
                </>
              )}
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
                    {recentOrders.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-gray-400">No orders yet</td>
                      </tr>
                    ) : (
                      recentOrders.map((order, idx) => (
                        <tr key={order._id || idx} className="hover:bg-pink-50/50 transition">
                          <td className="px-6 py-4 font-semibold text-gray-800">
                            {order.orderNumber || `#${String(order._id).slice(-4).toUpperCase()}`}
                          </td>
                          <td className="px-6 py-4">
                            {order.customer?.name
                              || order.shippingAddress?.fullName
                              || 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : order.date || ''}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-pink-100 text-pink-950">
                              {order.paymentMethod || order.payment || 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-700">
                            {order.totalAmount != null
                              ? Number(order.totalAmount).toLocaleString()
                              : order.total || '0'}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-4 py-1 rounded-full text-[10px] font-semibold ${
                              order.status === 'delivered' || order.status === 'Complete'
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {order.status || 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. CATEGORIES VIEW */}
        {activeTab === 'categories' && (
          <AdminCategoryManager />
        )}

        {/* 3. PRODUCTS VIEW */}
        {activeTab === 'products' && (
          <AdminProductManager />
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
