import React from 'react';

const Header = ({ onNavigate = () => {}, currentView = 'home', isLoggedIn = true }) => {
  return (
    <header className="bg-darkPurple text-white py-4 px-8 font-sans border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="text-3xl font-playfair font-medium tracking-wide cursor-pointer hover:opacity-90 transition"
        >
          Malmalee Creations
        </div>

        {/* Center: Navigation Links */}
        <nav className="flex items-center space-x-8 text-[15px]">
          {/* Active Link */}
          <button 
            onClick={() => onNavigate('home')} 
            className={`pb-1 font-medium transition cursor-pointer ${currentView === 'home' ? 'border-b-2 border-white' : 'text-gray-300 hover:text-white'}`}
          >
            Home
          </button>
          <a href="#" className="text-gray-300 hover:text-white transition">Products</a>
          <button 
            onClick={() => onNavigate('about')} 
            className={`pb-1 font-medium transition cursor-pointer ${currentView === 'about' ? 'border-b-2 border-white' : 'text-gray-300 hover:text-white'}`}
          >
            About
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`pb-1 font-medium transition cursor-pointer ${currentView === 'contact' ? 'border-b-2 border-white' : 'text-gray-300 hover:text-white'}`}
          >
            Contact us
          </button>
        </nav>

        {/* Right: Search & Icons */}
        <div className="flex items-center space-x-6">
          
          {/* Search Bar */}
          <div className="flex items-center bg-white/5 border border-white/20 rounded-md px-3 py-1.5 w-64 hover:bg-white/10 transition">
            <svg className="w-4 h-4 text-white font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search silk, bows..." 
              className="bg-transparent outline-none text-white text-sm ml-2 w-full placeholder-gray-300"
            />
          </div>

          {/* Profile Icon -> Opens User Profile if Logged In, or Sign In if Logged Out */}
          <button 
            onClick={() => onNavigate(isLoggedIn ? 'profile' : 'login')}
            title={isLoggedIn ? "My Profile" : "Customer Sign In"}
            className={`transition cursor-pointer p-1.5 rounded-full hover:bg-white/10 ${
              currentView === 'profile' ? 'text-softLilac bg-white/15 ring-1 ring-white/30' : 'text-white hover:text-softLilac'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          
          {/* Shopping Bag / Cart Icon -> Navigates to Cart Page */}
          <button 
            onClick={() => onNavigate('cart')}
            title="Shopping Cart"
            className={`relative transition cursor-pointer p-1.5 rounded-full hover:bg-white/10 mt-1 ${
              currentView === 'cart' ? 'text-softLilac bg-white/15 ring-1 ring-white/30' : 'text-white hover:text-softLilac'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 bg-primaryPurple text-white text-[10px] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full border border-darkPurple">
              3
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;