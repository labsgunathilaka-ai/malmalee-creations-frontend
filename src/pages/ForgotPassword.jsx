import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiKey, FiMail, FiCheck, FiArrowLeft } from 'react-icons/fi';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    // Simulate sending password reset email
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleResend = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('A new password reset link has been dispatched to your email.');
    }, 600);
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
          onClick={() => navigate('/home')}
          className="cursor-pointer group inline-block"
        >
          <span className="font-playfair text-2xl sm:text-3xl font-semibold tracking-wide text-darkPurple transition-colors duration-200">
            Malmalee Creations
          </span>
        </div>
      </header>

      {/* Main Card Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[430px] bg-white rounded-2xl border border-[#efe7dd] p-7 sm:p-9 shadow-[0_12px_35px_-10px_rgba(61,0,91,0.07)] transition-all duration-300">
          
          {/* Top Key Icon Badge */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#fdf3e2] border border-[#f7e4c8] flex items-center justify-center text-darkPurple shadow-sm">
              <FiKey className="w-5 h-5 text-darkPurple stroke-[2.2]" />
            </div>
          </div>

          {!isSubmitted ? (
            <>
              {/* Header Title & Subtitle */}
              <div className="text-center mb-6">
                <h1 className="font-playfair text-3xl font-bold text-darkPurple tracking-tight">
                  Forgot Password?
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed mt-1.5 max-w-xs mx-auto">
                  Enter your registered email address and we'll send you an atelier link to securely reset your password.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2.5 rounded-lg flex items-center space-x-2 animate-fadeIn">
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Email Address
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

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primaryPurple hover:bg-darkPurple active:scale-[0.99] text-white font-medium text-sm py-2.5 sm:py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <span>Send Reset Link</span>
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* Submission Confirmation Screen */
            <div className="text-center animate-fadeIn py-2">
              <div className="w-14 h-14 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-7 h-7 text-green-600 stroke-[2.5]" />
              </div>
              <h2 className="font-playfair text-2xl font-bold text-darkPurple mb-2">
                Check Your Inbox
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xs mx-auto mb-6">
                We've sent password reset instructions to <span className="font-semibold text-darkPurple">{email}</span>. Please check your inbox and spam folder.
              </p>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="w-full bg-primaryPurple hover:bg-darkPurple active:scale-[0.99] text-white font-medium text-sm py-2.5 sm:py-3 rounded-lg shadow-sm transition duration-200 cursor-pointer"
                >
                  Return to Login
                </button>
                <p className="text-xs text-gray-500">
                  Didn't receive the email?{' '}
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isLoading}
                    className="text-primaryPurple font-semibold hover:text-darkPurple hover:underline cursor-pointer transition"
                  >
                    Click to resend
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#f0eae1]"></div>
            </div>
          </div>

          {/* Bottom Back to Login Link */}
          <div className="text-center text-xs sm:text-sm text-gray-600">
            <p>
              Remember your password?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-primaryPurple font-semibold hover:text-darkPurple hover:underline ml-1 cursor-pointer transition"
              >
                Back to Login
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

export default ForgotPassword;
