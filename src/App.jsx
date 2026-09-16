import React, { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import AdminOrderDetails from './pages/AdminOrderDetails';

function App() {
  const [currentView, setCurrentView] = useState('adminOrders');

  return (
    <div className="font-sans min-h-screen flex flex-col justify-between">
      
      {/* Top Preview Navigation Bar */}
      <div className="bg-purple-900 text-white text-xs px-4 py-1.5 flex justify-between items-center z-50">
        <span>Malmalee Creations Preview Mode</span>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentView('home')}
            className={`px-3 py-1 rounded font-bold transition ${
              currentView === 'home' ? 'bg-white text-[#660099]' : 'bg-purple-800 text-white hover:bg-purple-700'
            }`}
          >
            Home Page
          </button>
          <button 
            onClick={() => setCurrentView('cart')}
            className={`px-3 py-1 rounded font-bold transition ${
              currentView === 'cart' ? 'bg-white text-[#660099]' : 'bg-purple-800 text-white hover:bg-purple-700'
            }`}
          >
            Shopping Cart
          </button>
          <button 
            onClick={() => setCurrentView('checkout')}
            className={`px-3 py-1 rounded font-bold transition ${
              currentView === 'checkout' ? 'bg-white text-[#660099]' : 'bg-purple-800 text-white hover:bg-purple-700'
            }`}
          >
            Checkout Form
          </button>
          <button 
            onClick={() => setCurrentView('orderConfirmation')}
            className={`px-3 py-1 rounded font-bold transition ${
              currentView === 'orderConfirmation' ? 'bg-white text-[#660099]' : 'bg-purple-800 text-white hover:bg-purple-700'
            }`}
          >
            Order Confirmation
          </button>
          <button 
            onClick={() => setCurrentView('admin')}
            className={`px-3 py-1 rounded font-bold transition ${
              currentView === 'admin' ? 'bg-white text-[#660099]' : 'bg-purple-800 text-white hover:bg-purple-700'
            }`}
          >
            Admin Dashboard
          </button>
          <button 
            onClick={() => setCurrentView('adminOrders')}
            className={`px-3 py-1 rounded font-bold transition ${
              currentView === 'adminOrders' ? 'bg-white text-[#660099]' : 'bg-purple-800 text-white hover:bg-purple-700'
            }`}
          >
            Admin Order Details
          </button>
        </div>
      </div>

      {/* Pages Conditional Display */}
      <div className="flex-1">
        {currentView === 'home' && (
          <div>
            <Header />
            <Home />
            <Footer />
          </div>
        )}

        {currentView === 'cart' && (
          <div>
            <Header />
            <Cart />
            <Footer />
          </div>
        )}

        {currentView === 'checkout' && (
          <div>
            <Header />
            <Checkout />
            <Footer />
          </div>
        )}

        {currentView === 'orderConfirmation' && (
          <div>
            <Header />
            <OrderConfirmation />
            <Footer />
          </div>
        )}

        {currentView === 'admin' && (
          <div>
            <AdminDashboard />
            <Footer />
          </div>
        )}

        {currentView === 'adminOrders' && (
          <div>
            <AdminOrderDetails />
            <Footer />
          </div>
        )}
      </div>

    </div>
  );
}

export default App;