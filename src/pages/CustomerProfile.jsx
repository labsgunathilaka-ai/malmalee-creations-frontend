import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiUser, 
  FiPackage, 
  FiMapPin, 
  FiHeart, 
  FiLock, 
  FiLogOut, 
  FiEdit2, 
  FiCheck, 
  FiClock, 
  FiTruck, 
  FiPlus, 
  FiTrash2, 
  FiChevronRight,
  FiShoppingBag,
  FiAward
} from 'react-icons/fi';

const CustomerProfile = ({ onLogout = () => {} }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders'); // 'profile' | 'orders' | 'addresses' | 'wishlist' | 'security'
  const [saveToast, setSaveToast] = useState('');

  // User details state
  const [userProfile, setUserProfile] = useState({
    fullName: 'Clara Beauchamp',
    email: 'clara@atelier.com',
    phone: '+94 77 123 4567',
    birthday: '1996-05-14',
    favoriteCategory: 'Bespoke Mulberry Silk Scrunchies',
    tier: 'Gold Atelier Patron',
    points: 650,
  });

  // Edit mode for profile
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...userProfile });

  // Sample Orders Data matching Malmalee luxury theme
  const [orders] = useState([
    {
      id: 'MC-84920',
      date: 'March 14, 2026',
      status: 'In Tailoring', // 'In Tailoring' | 'Dispatched' | 'Delivered'
      total: 'Rs 1,280.00',
      payment: 'Credit Card (Paid)',
      items: [
        {
          name: 'Pure Mulberry Silk Cloud Scrunchie - Rose Quartz',
          qty: 2,
          price: 'Rs 280.00',
          img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150&auto=format&fit=crop&q=60'
        },
        {
          name: 'Pearl Embroidered French Bow - Ivory',
          qty: 1,
          price: 'Rs 580.00',
          img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&auto=format&fit=crop&q=60'
        }
      ]
    },
    {
      id: 'MC-79104',
      date: 'February 26, 2026',
      status: 'Delivered',
      total: 'Rs 960.00',
      payment: 'Cash on Delivery',
      items: [
        {
          name: 'Oversized Silk Scrunchie - Midnight Noir',
          qty: 2,
          price: 'Rs 340.00',
          img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&auto=format&fit=crop&q=60'
        },
        {
          name: 'The Juliette Silk-Velvet Tail Bow',
          qty: 1,
          price: 'Rs 380.00',
          img: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=150&auto=format&fit=crop&q=60'
        }
      ]
    }
  ]);

  // Saved Addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Clara Beauchamp',
      type: 'Home (Default)',
      street: '42 Lotus Grove, Cinnamon Gardens',
      city: 'Colombo 07',
      postal: '00700',
      phone: '+94 77 123 4567',
      isDefault: true
    },
    {
      id: 2,
      name: 'Clara Beauchamp (Atelier Studio)',
      type: 'Studio / Work',
      street: '18 Horton Place, Suite 4B',
      city: 'Colombo 07',
      postal: '00700',
      phone: '+94 71 987 6543',
      isDefault: false
    }
  ]);

  // Wishlist Items
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      title: 'Velvet Ribbon Hair Bow - Bordeaux',
      category: 'VELVET HAIR BOWS',
      price: 'Rs 420.00',
      inStock: true,
      img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=60'
    },
    {
      id: 2,
      title: 'Emerald Botanical Silk Cloud',
      category: 'ORGANIC SILK SCRUNCHIES',
      price: 'Rs 320.00',
      inStock: true,
      img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=60'
    },
    {
      id: 3,
      title: 'The Versailles French Lace Ribbon',
      category: 'HAIR BOWS',
      price: 'Rs 340.00',
      inStock: false,
      img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&auto=format&fit=crop&q=60'
    }
  ]);

  // Security Form
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const triggerToast = (msg) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserProfile({ ...tempProfile });
    setIsEditingProfile(false);
    triggerToast('Personal profile updated successfully.');
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    })));
    triggerToast('Default delivery address updated.');
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
    triggerToast('Address removed.');
  };

  const handleRemoveWishlistItem = (id) => {
    setWishlist(wishlist.filter(w => w.id !== id));
    triggerToast('Item removed from wishlist.');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (securityForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters.');
      return;
    }
    setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    triggerToast('Security password updated successfully.');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-gray-800 font-sans pb-16">
      
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-6 right-6 z-50 bg-darkPurple text-white px-5 py-3 rounded-xl shadow-xl flex items-center space-x-2 text-sm animate-fadeIn border border-white/20">
          <FiCheck className="text-emerald-300 w-4 h-4" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Top Breadcrumb & User Welcome Banner */}
      <div className="bg-lightBeige/60 border-b border-[#ece2d0] pt-6 pb-8 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Breadcrumb */}
          <div className="text-xs text-gray-500 mb-4 flex items-center space-x-2">
            <button onClick={() => navigate('/home')} className="hover:text-darkPurple transition">Home</button>
            <span>/</span>
            <span className="text-darkPurple font-medium">Customer Account</span>
          </div>

          {/* Profile Header Card */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#efe7dd] shadow-sm">
            
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Initials Avatar */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-darkPurple text-white flex items-center justify-center font-playfair text-2xl sm:text-3xl font-bold shadow-md shadow-purple-950/20">
                CB
              </div>
              
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-darkPurple">
                    {userProfile.fullName}
                  </h1>
                  <span className="bg-amber-100/80 text-amber-900 border border-amber-300/60 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <FiAward className="text-amber-700" />
                    {userProfile.tier}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {userProfile.email} • {userProfile.phone}
                </p>
              </div>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex items-center gap-3 sm:gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
              <div className="bg-[#faf8f5] px-4 py-2.5 rounded-xl border border-[#efe7dd] text-center min-w-[90px]">
                <span className="block font-bold text-darkPurple text-lg sm:text-xl">
                  {orders.length}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                  Orders
                </span>
              </div>

              <div className="bg-[#faf8f5] px-4 py-2.5 rounded-xl border border-[#efe7dd] text-center min-w-[90px]">
                <span className="block font-bold text-darkPurple text-lg sm:text-xl">
                  {wishlist.length}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                  Saved
                </span>
              </div>

              <div className="bg-[#faf8f5] px-4 py-2.5 rounded-xl border border-[#efe7dd] text-center min-w-[100px]">
                <span className="block font-bold text-primaryPurple text-lg sm:text-xl">
                  {userProfile.points}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                  Atelier Pts
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Navigation Sidebar */}
          <aside className="bg-white rounded-2xl border border-[#efe7dd] p-3 sm:p-4 shadow-sm space-y-1">
            
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-primaryPurple text-white shadow-sm'
                  : 'text-gray-600 hover:bg-[#faf8f5] hover:text-darkPurple'
              }`}
            >
              <div className="flex items-center space-x-3">
                <FiPackage className="text-base" />
                <span>Orders & Tracking</span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-primaryPurple text-white shadow-sm'
                  : 'text-gray-600 hover:bg-[#faf8f5] hover:text-darkPurple'
              }`}
            >
              <div className="flex items-center space-x-3">
                <FiUser className="text-base" />
                <span>Personal Details</span>
              </div>
              <FiChevronRight className="text-xs opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                activeTab === 'addresses'
                  ? 'bg-primaryPurple text-white shadow-sm'
                  : 'text-gray-600 hover:bg-[#faf8f5] hover:text-darkPurple'
              }`}
            >
              <div className="flex items-center space-x-3">
                <FiMapPin className="text-base" />
                <span>Saved Addresses</span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${activeTab === 'addresses' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {addresses.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                activeTab === 'wishlist'
                  ? 'bg-primaryPurple text-white shadow-sm'
                  : 'text-gray-600 hover:bg-[#faf8f5] hover:text-darkPurple'
              }`}
            >
              <div className="flex items-center space-x-3">
                <FiHeart className="text-base" />
                <span>Wishlist</span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${activeTab === 'wishlist' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {wishlist.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-primaryPurple text-white shadow-sm'
                  : 'text-gray-600 hover:bg-[#faf8f5] hover:text-darkPurple'
              }`}
            >
              <div className="flex items-center space-x-3">
                <FiLock className="text-base" />
                <span>Security & Password</span>
              </div>
              <FiChevronRight className="text-xs opacity-60" />
            </button>

            <div className="border-t border-gray-100 pt-2 mt-2">
              <button
                onClick={() => {
                  if (onLogout) {
                    onLogout();
                  } else {
                    navigate('/login');
                  }
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium text-red-600 hover:bg-red-50 transition cursor-pointer"
              >
                <FiLogOut className="text-base" />
                <span>Log Out</span>
              </button>
            </div>

          </aside>

          {/* Right Main Section Details */}
          <section className="lg:col-span-3">

            {/* TAB 1: ORDERS & TRACKING */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-playfair text-2xl font-bold text-darkPurple">
                    Bespoke Orders & History
                  </h2>
                  <span className="text-xs text-gray-500">
                    Showing {orders.length} recent creations
                  </span>
                </div>

                {orders.map((order) => (
                  <div 
                    key={order.id} 
                    className="bg-white rounded-2xl border border-[#efe7dd] p-6 shadow-sm hover:shadow-md transition duration-200"
                  >
                    {/* Order Meta Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
                      <div>
                        <div className="flex items-center space-x-3">
                          <span className="font-bold text-darkPurple text-sm sm:text-base">
                            {order.id}
                          </span>
                          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                            order.status === 'Delivered'
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : 'bg-purple-50 text-primaryPurple border border-purple-200'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">Placed on {order.date}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-gray-400 block uppercase">Total Amount</span>
                        <span className="font-bold text-gray-800 text-sm sm:text-base">{order.total}</span>
                      </div>
                    </div>

                    {/* Order Progress Tracker */}
                    <div className="py-4 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
                        <FiTruck className="text-primaryPurple" />
                        <span>Fulfillment Timeline</span>
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs mb-1">✓</div>
                          <span className="font-medium text-gray-800">Pattern Cut & Handcrafted</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mb-1 ${
                            order.status === 'Delivered' ? 'bg-emerald-500 text-white' : 'bg-primaryPurple text-white animate-pulse'
                          }`}>
                            {order.status === 'Delivered' ? '✓' : '●'}
                          </div>
                          <span className="font-medium text-gray-800">Quality Inspection</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mb-1 ${
                            order.status === 'Delivered' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'
                          }`}>
                            {order.status === 'Delivered' ? '✓' : '○'}
                          </div>
                          <span className="font-medium text-gray-500">Delivered to Doorstep</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items List */}
                    <div className="pt-4 space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={item.img} 
                              alt={item.name} 
                              className="w-12 h-12 rounded-lg object-cover border border-gray-100 shadow-xs"
                            />
                            <div>
                              <p className="text-xs sm:text-sm font-medium text-gray-800">{item.name}</p>
                              <p className="text-[11px] text-gray-400">Qty: {item.qty}</p>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-gray-700">{item.price}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action footer */}
                    <div className="mt-5 pt-3 border-t border-gray-100 flex justify-end space-x-3">
                      <button 
                        onClick={() => triggerToast('Invoice downloaded successfully.')}
                        className="text-xs font-medium text-primaryPurple hover:text-darkPurple transition hover:underline"
                      >
                        Download Invoice
                      </button>
                      <button 
                        onClick={() => triggerToast('Order item added to your active bag.')}
                        className="text-xs font-medium bg-[#fdf3e2] text-darkPurple px-3 py-1.5 rounded-lg border border-[#f7e4c8] hover:bg-[#faebd0] transition cursor-pointer"
                      >
                        Reorder Selection
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: PERSONAL DETAILS */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl border border-[#efe7dd] p-6 sm:p-8 shadow-sm">
                
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="font-playfair text-2xl font-bold text-darkPurple">Personal Details</h2>
                    <p className="text-xs text-gray-500 mt-1">Manage your identity and bespoke preferences.</p>
                  </div>
                  {!isEditingProfile && (
                    <button
                      onClick={() => {
                        setTempProfile({ ...userProfile });
                        setIsEditingProfile(true);
                      }}
                      className="flex items-center space-x-1.5 text-xs font-semibold text-primaryPurple hover:text-darkPurple transition bg-purple-50 px-3.5 py-1.5 rounded-lg border border-purple-200 cursor-pointer"
                    >
                      <FiEdit2 className="text-xs" />
                      <span>Edit Info</span>
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={tempProfile.fullName}
                          onChange={(e) => setTempProfile({ ...tempProfile, fullName: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-primaryPurple focus:ring-1 focus:ring-primaryPurple"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={tempProfile.email}
                          onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-primaryPurple focus:ring-1 focus:ring-primaryPurple"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={tempProfile.phone}
                          onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-primaryPurple focus:ring-1 focus:ring-primaryPurple"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={tempProfile.birthday}
                          onChange={(e) => setTempProfile({ ...tempProfile, birthday: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-primaryPurple focus:ring-1 focus:ring-primaryPurple"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-800 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-medium bg-primaryPurple text-white rounded-lg hover:bg-darkPurple transition shadow-sm"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                        Full Legal Name
                      </span>
                      <p className="text-sm font-medium text-gray-800 mt-1">{userProfile.fullName}</p>
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                        Email Address
                      </span>
                      <p className="text-sm font-medium text-gray-800 mt-1">{userProfile.email}</p>
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                        Contact Phone
                      </span>
                      <p className="text-sm font-medium text-gray-800 mt-1">{userProfile.phone}</p>
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                        Date of Birth
                      </span>
                      <p className="text-sm font-medium text-gray-800 mt-1">{userProfile.birthday}</p>
                    </div>

                    <div className="sm:col-span-2 pt-4 border-t border-gray-100">
                      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                        Patron Category Preference
                      </span>
                      <p className="text-sm font-medium text-darkPurple mt-1">{userProfile.favoriteCategory}</p>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB 3: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-playfair text-2xl font-bold text-darkPurple">Saved Delivery Addresses</h2>
                  <button 
                    onClick={() => triggerToast('New address form modal opened.')}
                    className="flex items-center space-x-1.5 text-xs font-semibold bg-primaryPurple text-white px-3.5 py-2 rounded-xl hover:bg-darkPurple transition shadow-sm cursor-pointer"
                  >
                    <FiPlus className="text-sm" />
                    <span>Add Address</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((address) => (
                    <div 
                      key={address.id}
                      className={`bg-white rounded-2xl border p-5 shadow-sm relative transition ${
                        address.isDefault ? 'border-primaryPurple/50 bg-[#faf7fc]' : 'border-[#efe7dd]'
                      }`}
                    >
                      {address.isDefault && (
                        <span className="absolute top-4 right-4 bg-primaryPurple text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                      <h3 className="font-bold text-darkPurple text-sm mb-1">{address.name}</h3>
                      <p className="text-xs text-primaryPurple font-medium mb-3">{address.type}</p>
                      <p className="text-xs text-gray-600 leading-relaxed mb-1">{address.street}</p>
                      <p className="text-xs text-gray-600 leading-relaxed mb-1">{address.city} • {address.postal}</p>
                      <p className="text-xs text-gray-500 mt-2">Tel: {address.phone}</p>

                      <div className="flex items-center space-x-3 mt-4 pt-3 border-t border-gray-100 text-xs">
                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefaultAddress(address.id)}
                            className="font-medium text-primaryPurple hover:underline cursor-pointer"
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="font-medium text-red-600 hover:underline flex items-center space-x-1 cursor-pointer ml-auto"
                        >
                          <FiTrash2 className="text-xs" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: WISHLIST / SAVED ITEMS */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-playfair text-2xl font-bold text-darkPurple">Saved Atelier Pieces</h2>
                  <span className="text-xs text-gray-500">{wishlist.length} items saved</span>
                </div>

                {wishlist.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-[#efe7dd] p-12 text-center">
                    <FiHeart className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="font-playfair text-lg text-darkPurple font-bold">Your Wishlist is Empty</p>
                    <p className="text-xs text-gray-500 mt-1 mb-4">Discover bespoke hair accessories and bookmark your favorites.</p>
                    <button 
                      onClick={() => navigate('/home')}
                      className="bg-primaryPurple text-white px-5 py-2 rounded-lg text-xs font-medium hover:bg-darkPurple transition"
                    >
                      Explore Collections
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {wishlist.map((item) => (
                      <div key={item.id} className="bg-white rounded-2xl border border-[#efe7dd] overflow-hidden shadow-sm group">
                        <div className="relative aspect-square overflow-hidden bg-gray-50">
                          <img 
                            src={item.img} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                          <button
                            onClick={() => handleRemoveWishlistItem(item.id)}
                            title="Remove from saved"
                            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-red-600 p-2 rounded-full shadow-sm transition"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="p-4">
                          <p className="text-[10px] text-primaryPurple font-bold tracking-widest uppercase mb-1">
                            {item.category}
                          </p>
                          <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 h-8">
                            {item.title}
                          </h3>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                            <span className="font-bold text-gray-900 text-sm">{item.price}</span>
                            <button
                              onClick={() => triggerToast(`"${item.title}" added to your bag!`)}
                              className="bg-primaryPurple hover:bg-darkPurple text-white px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1 cursor-pointer"
                            >
                              <FiShoppingBag className="text-xs" />
                              <span>Add to Bag</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: SECURITY & PASSWORD */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-2xl border border-[#efe7dd] p-6 sm:p-8 shadow-sm max-w-lg">
                <h2 className="font-playfair text-2xl font-bold text-darkPurple mb-2">Change Password</h2>
                <p className="text-xs text-gray-500 mb-6">
                  Ensure your atelier customer account is protected with a secure password.
                </p>

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={securityForm.currentPassword}
                      onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-primaryPurple focus:ring-1 focus:ring-primaryPurple"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={securityForm.newPassword}
                      onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-primaryPurple focus:ring-1 focus:ring-primaryPurple"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={securityForm.confirmPassword}
                      onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-primaryPurple focus:ring-1 focus:ring-primaryPurple"
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-primaryPurple hover:bg-darkPurple active:scale-[0.99] text-white font-medium text-sm py-2.5 sm:py-3 rounded-lg shadow-sm transition duration-200 cursor-pointer"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}

          </section>

        </div>
      </div>

    </div>
  );
};

export default CustomerProfile;
