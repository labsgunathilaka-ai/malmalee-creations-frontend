import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/home' },
    { label: 'Products', path: '/products' },
    { label: 'About', path: '/about' },
    { label: 'Contact us', path: '/contact' },
  ];

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate('/login');
  };

  return (
    <header className="bg-[#c81e67] text-white py-4 px-8 font-sans border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Left: Logo */}
        <Link to="/home" className="text-3xl font-playfair font-medium tracking-wide cursor-pointer hover:opacity-90 transition">
          Malmalee Creations
        </Link>

        {/* Center: Navigation Links */}
        <nav className="flex items-center space-x-8 text-[15px]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={`transition ${
                location.pathname === link.path
                  ? 'border-b-2 border-white pb-1 font-medium'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Search & Icons */}
        <div className="flex items-center space-x-6">

          {/* Search Bar */}
          <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-3 py-1.5 w-64 hover:bg-white/20 transition">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search silk, bows..."
              className="bg-transparent outline-none text-white text-sm ml-2 w-full placeholder-white/60"
            />
          </div>

          {/* User Profile Icon — always links to /profile */}
          <Link to="/profile" className="text-white hover:text-white/80 transition" title="My Profile">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="relative text-white hover:text-white/80 transition mt-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-white text-[#c81e67] text-[10px] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full">
              3
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;
