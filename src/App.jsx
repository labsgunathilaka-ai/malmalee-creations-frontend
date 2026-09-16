import React, { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  
  const [isAdminView, setIsAdminView] = useState(true);

  return (
    <div className="font-sans min-h-screen flex flex-col justify-between">
      
      <div className="bg-purple-900 text-white text-xs px-4 py-1 flex justify-between items-center">
        <span>Malmalee Creations Preview Mode</span>
        <button 
          onClick={() => setIsAdminView(!isAdminView)}
          className="bg-white text-[#660099] px-3 py-1 rounded font-bold hover:bg-purple-100 transition"
        >
          {isAdminView ? "Switch to Home Page" : "Switch to Admin Dashboard"}
        </button>
      </div>

      
      {isAdminView ? (
        <AdminDashboard />
      ) : (
        <div>
          <Header />
          <Home />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;