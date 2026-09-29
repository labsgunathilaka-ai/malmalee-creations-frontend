import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiLock, FiEye, FiEyeOff, FiCheckCircle } from 'react-icons/fi';

const API_BASE = 'http://localhost:5000';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: form.password }),
      });
      const data = await res.json();
      if (data.success) { setSuccess(true); }
      else { setError(data.message || 'Reset failed. Link may have expired.'); }
    } catch { setError('Cannot connect to server.'); }
    setLoading(false);
  };

  if (success) return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md text-center">
        <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Password Reset!</h2>
        <p className="text-gray-500 mb-6">Your password has been updated successfully.</p>
        <button onClick={() => navigate('/login')}
          className="w-full py-3 bg-[#ff0081] hover:bg-[#c40063] text-white rounded-xl font-bold transition">
          Back to Login
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiLock className="w-7 h-7 text-[#ff0081]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Set New Password</h1>
          <p className="text-gray-500 text-sm mt-1">Enter your new password below</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">New Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="At least 6 characters"
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 pr-10 text-sm focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] transition"
                required
              />
              <button type="button" onClick={() => setShowPass(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Confirm Password</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
              placeholder="Repeat new password"
              className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] transition"
              required
            />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-[#ff0081] hover:bg-[#c40063] text-white rounded-xl font-bold transition disabled:opacity-60 mt-2">
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          <button onClick={() => navigate('/login')} className="text-[#ff0081] hover:underline">Back to Login</button>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
