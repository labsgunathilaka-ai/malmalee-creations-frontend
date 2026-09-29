import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import heroMain from '../assets/hero-main.jpg';
import heroCollection from '../assets/hero-collection.jpg';

const API_BASE = 'http://localhost:5000';

const Home = () => {
  const navigate = useNavigate();

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/products/featured`).then(r => r.json()),
      fetch(`${API_BASE}/api/products/new-arrivals`).then(r => r.json()),
    ]).then(([featured, newArr]) => {
      if (featured.success) setFeaturedProducts(featured.data);
      if (newArr.success) setNewArrivals(newArr.data);
      setLoadingProducts(false);
    }).catch(() => setLoadingProducts(false));
  }, []);

  const getImageUrl = (images) => {
    if (!images || images.length === 0) return null;
    const img = images[0];
    return img.startsWith('http') ? img : `${API_BASE}${img}`;
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('malmalee_cart') || '[]');
    const existing = cart.find(i => i.productId === product._id);
    if (existing) { existing.quantity += 1; }
    else { cart.push({ productId: product._id, name: product.name, price: product.price, quantity: 1, image: getImageUrl(product.images), sku: product.sku }); }
    localStorage.setItem('malmalee_cart', JSON.stringify(cart));
  };

  // Combine featured + newArrivals, deduplicate by _id, take up to 8
  const displayProducts = [...featuredProducts, ...newArrivals].reduce((acc, p) => {
    if (!acc.find(x => x._id === p._id)) acc.push(p);
    return acc;
  }, []).slice(0, 8);

  return (
    <div className="font-sans text-gray-800">
      
      {/* 1. Hero Section */}
      <section className="bg-lightBeige px-8 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-darkPurple leading-tight mb-4">
              Handcrafted Elegance<br />for Every Strand
            </h1>
            <h2 className="text-xl text-primaryPurple font-medium mb-4">
              Bespoke Silk Scrunchies &amp; Tailored Hair Bows
            </h2>
            <p className="text-sm text-gray-600 mb-8 max-w-md leading-relaxed">
              Meticulously fashioned from certified 22-Momme pure Mulberry silk and archival cotton velvets. Each couture accessory honors slow-fashion heritage and heirloom craftsmanship for mindful adornment.
            </p>
            <button onClick={() => navigate('/products')} className="bg-primaryPurple text-white px-6 py-3 rounded hover:bg-darkPurple transition text-sm font-medium mb-10">
              Explore The Collection →
            </button>
            <div className="flex space-x-12">
              <div>
                <p className="font-bold text-darkPurple">Zero Damage</p>
                <p className="text-xs text-gray-500">No Frizz, Creaseless Elastic</p>
              </div>
              <div>
                <p className="font-bold text-darkPurple">100%</p>
                <p className="text-xs text-gray-500">Hand-Cut &amp; Sewn</p>
              </div>
            </div>
          </div>
          {/* Hero Images */}
          <div className="flex gap-4">
            <img src={heroMain} alt="Main" className="w-2/3 h-96 object-cover rounded shadow-sm" />
            <img src={heroCollection} alt="Collection" className="w-1/3 h-96 object-cover rounded shadow-sm" />
          </div>
        </div>
      </section>

      {/* 2. Features Banner */}
      <section className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Artisanal Touch', '100% Organic Silk', 'Gift Ready Packaging'].map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded border border-gray-100 flex items-start space-x-4 shadow-sm">
              <div className="text-primaryPurple mt-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2l5 5-5 5-5-5 5-5z"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-darkPurple text-sm mb-1">{feature}</h3>
                <p className="text-xs text-gray-500">Individually patterned and tailored by master needleworkers...</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="max-w-7xl mx-auto px-8 py-10">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-playfair font-bold text-darkPurple">Featured Products</h2>
          <button onClick={() => navigate('/products')} className="bg-primaryPurple text-white px-4 py-1.5 rounded-full text-xs hover:bg-darkPurple transition">All Pieces</button>
        </div>

        {loadingProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-md aspect-square mb-4" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : displayProducts.length === 0 ? (
          <p className="text-center text-gray-500 py-16">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {displayProducts.map((product) => (
              <div key={product._id} onClick={() => { navigate(`/products/${product._id}`); window.scrollTo({top:0,behavior:'smooth'}); }} className="group cursor-pointer">
                <div className="relative bg-white rounded-md overflow-hidden aspect-square mb-4 shadow-sm border border-gray-50">
                  {product.tag && (
                    <span className="absolute top-3 left-3 bg-white text-[10px] font-bold px-2 py-1 rounded shadow-sm text-gray-700 tracking-wider">
                      {product.tag}
                    </span>
                  )}
                  <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-primaryPurple"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </button>
                  {getImageUrl(product.images) ? (
                    <img src={getImageUrl(product.images)} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">No Image</div>
                  )}
                </div>
                <p className="text-[10px] text-primaryPurple font-bold tracking-widest uppercase mb-1">{product.category?.name || ''}</p>
                <h3 className="text-sm font-medium text-gray-800 mb-3 h-10 leading-snug">{product.name}</h3>
                <div className="flex justify-between items-center mt-auto">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase">Price</p>
                    <p className="text-sm font-bold text-gray-800">Rs {product.price}.00</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                    className="bg-primaryPurple text-white px-3 py-1.5 rounded text-xs hover:bg-darkPurple transition flex items-center space-x-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Testimonials */}
      <section className="bg-lightBeige mt-16 px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-primaryPurple font-bold tracking-widest uppercase mb-2">Collector Experiences</p>
            <h2 className="text-3xl font-playfair font-bold text-darkPurple">Cherished by Fine Hair Connoisseurs</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded shadow-sm border border-gray-100">
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="text-xs text-gray-600 mb-4 leading-relaxed italic">
                  &quot;The pure mulberry cloud scrunchie in Rose Quartz has replaced every single hair tie I own...&quot;
                </p>
                <div>
                  <p className="font-bold text-darkPurple text-sm">Pushpa</p>
                  <p className="text-[10px] text-gray-400">Verified Buyer • Paris, France</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
