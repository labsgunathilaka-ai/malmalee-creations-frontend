import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import CustomerLogin from './pages/CustomerLogin';
import CustomerSignUp from './pages/CustomerSignUp';
import ForgotPassword from './pages/ForgotPassword';
import CustomerProfile from './pages/CustomerProfile';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/CustomerContact';
import Cart from './pages/CustomerCart';
import Checkout from './pages/CustomerCheckout';
import OrderConfirmation from './pages/CustomerOrderConfirmation';
import AdminOrderDetails from './pages/AdminOrderDetails';

// Layout wrapper for customer-facing pages (with Header + Footer)
const CustomerLayout = ({ children, isLoggedIn, onLogout }) => (
  <div className="flex flex-col min-h-screen">
    <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />
    <div className="flex-1">{children}</div>
    <Footer />
  </div>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages — no Header/Footer */}
        <Route path="/login" element={<CustomerLogin onLogin={handleLogin} />} />
        <Route path="/signup" element={<CustomerSignUp onLogin={handleLogin} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin pages */}
        <Route path="/admin" element={<div className="flex flex-col min-h-screen"><AdminDashboard /><Footer /></div>} />
        <Route path="/admin/orders" element={<div className="flex flex-col min-h-screen"><AdminOrderDetails /><Footer /></div>} />

        {/* Customer-facing pages */}
        <Route path="/home" element={<CustomerLayout isLoggedIn={isLoggedIn} onLogout={handleLogout}><Home /></CustomerLayout>} />
        <Route path="/products" element={<CustomerLayout isLoggedIn={isLoggedIn} onLogout={handleLogout}><Products /></CustomerLayout>} />
        <Route path="/products/:id" element={<CustomerLayout isLoggedIn={isLoggedIn} onLogout={handleLogout}><ProductDetail /></CustomerLayout>} />
        <Route path="/about" element={<CustomerLayout isLoggedIn={isLoggedIn} onLogout={handleLogout}><About /></CustomerLayout>} />
        <Route path="/contact" element={<CustomerLayout isLoggedIn={isLoggedIn} onLogout={handleLogout}><Contact /></CustomerLayout>} />
        <Route path="/cart" element={<CustomerLayout isLoggedIn={isLoggedIn} onLogout={handleLogout}><Cart /></CustomerLayout>} />
        <Route path="/checkout" element={<CustomerLayout isLoggedIn={isLoggedIn} onLogout={handleLogout}><Checkout /></CustomerLayout>} />
        <Route path="/order-confirmation" element={<CustomerLayout isLoggedIn={isLoggedIn} onLogout={handleLogout}><OrderConfirmation /></CustomerLayout>} />
        <Route path="/profile" element={<CustomerLayout isLoggedIn={isLoggedIn} onLogout={handleLogout}><CustomerProfile onLogout={handleLogout} /></CustomerLayout>} />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
