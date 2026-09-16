import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <Home />
      </div>

      <Footer />
    </div>
  );
}

export default App;