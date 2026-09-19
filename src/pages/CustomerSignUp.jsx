import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiCheck, FiShield } from 'react-icons/fi';

const CustomerSignUp = ({ onNavigate = () => { }, onLogin = () => { } }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Password validation: at least 8 chars, at least one letter and one number
  const isPasswordValid = password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !email.trim() || !password) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      setErrorMsg('Password must contain both letters and numbers.');
      return;
    }

    setIsLoading(true);
    // Simulate sign up registration
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg('Account created successfully! Welcome to Malmalee Creations.');
      if (onLogin) onLogin();
      setTimeout(() => {
        if (onNavigate) onNavigate('profile');
      }, 1200);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col justify-between relative overflow-hidden font-sans">

      {/* Decorative subtle ambient background accents */}
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

      {/* Main Sign Up Card Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[430px] bg-white rounded-2xl border border-[#efe7dd] p-7 sm:p-9 shadow-[0_12px_35px_-10px_rgba(61,0,91,0.07)] transition-all duration-300">

          {/* Header Title & Subtitle */}
          <div className="text-center mb-6">
            <h1 className="font-playfair text-3xl font-bold text-darkPurple tracking-tight">
              Create an Account
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed mt-1.5 max-w-xs mx-auto">
              Join the Malmalee atelier for handcrafted releases and bespoke perks.
            </p>
          </div>

          {/* Success / Error Messages */}
          {successMsg && (
            <div className="mb-5 bg-green-50 border border-green-200 text-green-800 text-xs px-3.5 py-2.5 rounded-lg flex items-center space-x-2 animate-fadeIn">
              <FiCheck className="text-green-600 w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2.5 rounded-lg flex items-center space-x-2 animate-fadeIn">
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Clara Beauchamp"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primaryPurple focus:ring-1 focus:ring-primaryPurple transition duration-200"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="clara@atelier.com"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primaryPurple focus:ring-1 focus:ring-primaryPurple transition duration-200"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Password
              </label>
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

              {/* Password Requirement Hint */}
              <div className="flex items-center space-x-1.5 mt-2">
                <FiShield className={`w-3.5 h-3.5 flex-shrink-0 ${isPasswordValid ? 'text-green-600' : 'text-primaryPurple'}`} />
                <p className={`text-[11px] leading-tight ${isPasswordValid ? 'text-green-700 font-medium' : 'text-primaryPurple'}`}>
                  Must be at least 8 characters with letters and numbers.
                </p>
              </div>
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
                  <span>Register</span>
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

          {/* Bottom Switch to Login Link */}
          <div className="text-center text-xs sm:text-sm text-gray-600">
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="text-primaryPurple font-semibold hover:text-darkPurple hover:underline ml-1 cursor-pointer transition"
              >
                Login here
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

export default CustomerSignUp;
