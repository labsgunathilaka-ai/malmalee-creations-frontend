import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiEye, FiEyeOff, FiCheck, FiUser, FiShield } from 'react-icons/fi';

const CustomerLogin = ({ onLogin = () => {} }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState('customer'); // 'customer' | 'admin'
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
      setSuccessMsg(`Welcome back! You are now logged in as ${role === 'admin' ? 'Admin' : 'Customer'}.`);
      
      if (onLogin) onLogin(role);

      setTimeout(() => {
        setSuccessMsg('');
        if (true) {
          navigate(role === 'admin' ? '/admin' : '/home');
        }
      }, 1200);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f5efe6] flex flex-col justify-between relative overflow-hidden font-sans">
      
      {/* Decorative background accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#c81e67]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#c81e67]/5 rounded-full blur-3xl"></div>
        {/* Subtle grid pattern */}
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#c81e67 0.5px, transparent 0.5px)`,
            backgroundSize: '32px 32px',
            opacity: 0.05
          }}
        />
      </div>

      {/* Top Header Navigation Bar - Screenshot එකේ වගේ Magenta Header එක */}
      <header className="relative z-10 w-full bg-[#c81e67] text-white px-8 sm:px-12 py-4 shadow-sm flex items-center justify-between">
        <div 
          onClick={() => navigate('/home')}
          className="cursor-pointer font-playfair text-2xl sm:text-3xl font-bold tracking-wide"
        >
          Malmalee Creations
        </div>

      </header>

      {/* Main Login Card Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[430px] bg-white rounded-2xl border border-[#e8ded1] p-7 sm:p-9 shadow-[0_12px_35px_-10px_rgba(200,30,103,0.12)] transition-all duration-300">
          
          {/* Animated Role Switcher Toggle */}
          <div className="relative bg-[#fbf7f2] p-1.5 rounded-xl flex items-center mb-6 border border-[#e8ded1]">
            {/* Sliding Background Accent - Magenta / Deep Pink */}
            <div 
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-[#c81e67] rounded-lg transition-all duration-300 ease-in-out shadow-sm ${
                role === 'admin' ? 'translate-x-[calc(100%+6px)]' : 'translate-x-0'
              }`}
            />
            
            <button
              type="button"
              onClick={() => setRole('customer')}
              className={`relative z-10 w-1/2 py-2 text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors duration-200 cursor-pointer ${
                role === 'customer' ? 'text-white' : 'text-gray-600 hover:text-[#c81e67]'
              }`}
            >
              <FiUser className="w-3.5 h-3.5" />
              <span>Customer</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`relative z-10 w-1/2 py-2 text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors duration-200 cursor-pointer ${
                role === 'admin' ? 'text-white' : 'text-gray-600 hover:text-[#c81e67]'
              }`}
            >
              <FiShield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {/* Lock Icon Badge */}
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-xl bg-[#fdf2f6] border border-[#f5d0e0] flex items-center justify-center text-[#c81e67] shadow-xs">
              <FiLock className="w-5 h-5 text-[#c81e67] stroke-[2.2]" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="font-playfair text-3xl font-bold text-[#c81e67] tracking-tight">
              {role === 'admin' ? 'Admin Access' : 'Login'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed mt-1.5 max-w-xs mx-auto">
              {role === 'admin' 
                ? 'Sign in to manage orders, inventory, and atelier settings.' 
                : 'Sign in to access your bespoke orders and saved atelier items.'}
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
                placeholder={role === 'admin' ? 'e.g. admin@malmalee.com' : 'e.g. eleanor@atelier.com'}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#c81e67] focus:ring-1 focus:ring-[#c81e67] transition duration-200"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                {role === 'customer' && (
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-xs font-medium text-[#c81e67] hover:underline cursor-pointer transition"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#c81e67] focus:ring-1 focus:ring-[#c81e67] transition duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition cursor-pointer"
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
                className="w-4 h-4 text-[#c81e67] accent-[#c81e67] border-gray-300 rounded focus:ring-[#c81e67] cursor-pointer"
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
                className="w-full bg-[#c81e67] hover:bg-[#a61352] active:scale-[0.99] text-white font-medium text-sm py-2.5 sm:py-3 rounded-lg shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>{role === 'admin' ? 'Sign In to Dashboard' : 'Sign In'}</span>
                )}
              </button>
            </div>
          </form>

          {/* Register Link (Only for Customer) */}
          {role === 'customer' && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#e8ded1]"></div>
                </div>
              </div>

              <div className="text-center text-xs sm:text-sm text-gray-600">
                <p>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/signup')}
                    className="text-[#c81e67] font-semibold hover:underline ml-1 cursor-pointer transition"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Malmalee Creations. Handcrafted Bespoke Hair Couture.
      </footer>

    </div>
  );
};

export default CustomerLogin;