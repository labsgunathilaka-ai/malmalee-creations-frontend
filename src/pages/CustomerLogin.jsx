import React, { useState } from 'react';
import { FiLock, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi';

const CustomerLogin = ({ onNavigate = () => {}, onLogin = () => {} }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg('Welcome back! You are now logged in.');
      if (onLogin) onLogin();
      setTimeout(() => {
        setSuccessMsg('');
        if (onNavigate) onNavigate('profile');
      }, 1200);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col justify-between relative overflow-hidden font-sans">
      
      {/* Decorative subtle background accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-100/60 rounded-full blur-3xl"></div>
        {/* Delicate grid pattern */}
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#3d005b 0.5px, transparent 0.5px)`,
            backgroundSize: '32px 32px',
            opacity: 0.04
          }}
        />
      </div>

      {/* Top Header: Logo with ONLY letters in Purple on Top-Left */}
      <header className="relative z-10 w-full px-8 sm:px-12 pt-8 pb-4 flex items-center">
        <div 
          onClick={() => onNavigate('home')}
          className="cursor-pointer group inline-block"
        >
          <span className="font-playfair text-2xl sm:text-3xl font-semibold tracking-wide text-darkPurple transition-colors duration-200">
            Malmalee Creations
          </span>
        </div>
      </header>

      {/* Main Login Card Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[430px] bg-white rounded-2xl border border-[#efe7dd] p-7 sm:p-9 shadow-[0_12px_35px_-10px_rgba(61,0,91,0.07)] transition-all duration-300">
          
          {/* Lock Icon Badge */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#fdf3e2] border border-[#f7e4c8] flex items-center justify-center text-darkPurple shadow-sm">
              <FiLock className="w-5 h-5 text-darkPurple stroke-[2.2]" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="font-playfair text-3xl font-bold text-darkPurple tracking-tight">
              Login
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed mt-1.5 max-w-xs mx-auto">
              Sign in to access your bespoke orders and saved atelier items.
            </p>
          </div>

          {/* Success Banner */}
          {successMsg && (
            <div className="mb-5 bg-green-50 border border-green-200 text-green-800 text-xs px-3.5 py-2.5 rounded-lg flex items-center space-x-2 animate-fadeIn">
              <FiCheck className="text-green-600 w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. eleanor@atelier.com"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primaryPurple focus:ring-1 focus:ring-primaryPurple transition duration-200"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => onNavigate('forgot-password')}
                  className="text-xs font-medium text-primaryPurple hover:text-darkPurple transition hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primaryPurple focus:ring-1 focus:ring-primaryPurple transition duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <FiEyeOff className="w-4 h-4" />
                  ) : (
                    <FiEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center pt-0.5">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-primaryPurple accent-primaryPurple border-gray-300 rounded focus:ring-primaryPurple cursor-pointer"
              />
              <label 
                htmlFor="rememberMe" 
                className="ml-2 text-xs text-gray-600 font-normal cursor-pointer select-none"
              >
                Keep me signed in on this device
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primaryPurple hover:bg-darkPurple active:scale-[0.99] text-white font-medium text-sm py-2.5 sm:py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#f0eae1]"></div>
            </div>
          </div>

          {/* Toggle Register / Login link */}
          <div className="text-center text-xs sm:text-sm text-gray-600">
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => onNavigate('signup')}
                className="text-primaryPurple font-semibold hover:text-darkPurple hover:underline ml-1 cursor-pointer transition"
              >
                Register here
              </button>
            </p>
          </div>

        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Malmalee Creations. Handcrafted Bespoke Hair Couture.
      </footer>

    </div>
  );
};

export default CustomerLogin;
