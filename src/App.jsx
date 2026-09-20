import React, { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import CustomerLogin from './pages/CustomerLogin';
import CustomerSignUp from './pages/CustomerSignUp';
import ForgotPassword from './pages/ForgotPassword';
import CustomerProfile from './pages/CustomerProfile';
import About from './pages/About';
import Contact from './pages/CustomerContact';
import Cart from './pages/CustomerCart';
import Checkout from './pages/CustomerCheckout';
import OrderConfirmation from './pages/CustomerOrderConfirmation';
import AdminOrderDetails from './pages/AdminOrderDetails';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigateTo = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    if (role === 'admin') {
      navigateTo('admin');
    } else {
      navigateTo('home');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigateTo('login');
  };

  return (
    <div className="font-sans min-h-screen flex flex-col justify-between bg-white">
      
      {/* Dynamic View Navigation */}
      {currentView === 'login' ? (
        <CustomerLogin 
          onNavigate={navigateTo} 
          onLogin={handleLogin} 
        />
      ) : currentView === 'signup' ? (
        <CustomerSignUp 
          onNavigate={navigateTo} 
          onLogin={handleLogin} 
        />
      ) : currentView === 'forgot-password' ? (
        <ForgotPassword onNavigate={navigateTo} />
      ) : currentView === 'cart' ? (
        <div className="flex-1 flex flex-col justify-between">
          <Header onNavigate={navigateTo} currentView={currentView} isLoggedIn={isLoggedIn} />
          <div className="flex-1">
            <Cart onNavigate={navigateTo} />
          </div>
          <Footer />
        </div>
      ) : currentView === 'checkout' ? (
        <div className="flex-1 flex flex-col justify-between">
          <Header onNavigate={navigateTo} currentView={currentView} isLoggedIn={isLoggedIn} />
          <div className="flex-1">
            <Checkout onNavigate={navigateTo} />
          </div>
          <Footer />
        </div>
      ) : currentView === 'order-confirmation' ? (
        <div className="flex-1 flex flex-col justify-between">
          <Header onNavigate={navigateTo} currentView={currentView} isLoggedIn={isLoggedIn} />
          <div className="flex-1">
            <OrderConfirmation onNavigate={navigateTo} />
          </div>
          <Footer />
        </div>
      ) : currentView === 'profile' ? (
        <div className="flex-1 flex flex-col justify-between">
          <Header onNavigate={navigateTo} currentView={currentView} isLoggedIn={isLoggedIn} />
          <div className="flex-1">
            <CustomerProfile onNavigate={navigateTo} onLogout={handleLogout} />
          </div>
          <Footer />
        </div>
      ) : currentView === 'about' ? (
        <div className="flex-1 flex flex-col justify-between">
          <Header onNavigate={navigateTo} currentView={currentView} isLoggedIn={isLoggedIn} />
          <div className="flex-1">
            <About onNavigate={navigateTo} />
          </div>
          <Footer />
        </div>
      ) : currentView === 'contact' ? (
        <div className="flex-1 flex flex-col justify-between">
          <Header onNavigate={navigateTo} currentView={currentView} isLoggedIn={isLoggedIn} />
          <div className="flex-1">
            <Contact />
          </div>
          <Footer />
        </div>
      ) : currentView === 'admin' ? (
        <div className="flex-1">
          <AdminDashboard onNavigate={navigateTo} />
          <Footer />
        </div>
      ) : currentView === 'admin-orders' ? (
        <div className="flex-1">
          <AdminOrderDetails onNavigate={navigateTo} />
          <Footer />
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between">
          <Header onNavigate={navigateTo} currentView={currentView} isLoggedIn={isLoggedIn} />
          <div className="flex-1">
            <Home onNavigate={navigateTo} />
          </div>
          <Footer />
        </div>
      )}

    </div>
  );
}

export default App;