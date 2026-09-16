import React from 'react';

// 1. Images tika assets folder eken import karaganna
import heroMain from '../assets/hero-main.jpg';
import heroCollection from '../assets/hero-collection.jpg';
import product1 from '../assets/product-1.jpg';
import product2 from '../assets/product-2.jpg';
import product3 from '../assets/product-3.jpg';
import product4 from '../assets/product-4.jpg';
import product5 from '../assets/product-5.jpg';
import product6 from '../assets/product-6.jpg';
import product7 from '../assets/product-7.jpg';
import product8 from '../assets/product-8.jpg';

const Home = () => {
  // 2. Import karapu images tika products array ekata link kireema
  const products = [
    { id: 1, tag: 'BESTSELLER', category: 'SILK SCRUNCHIES', title: 'Pure Mulberry Silk Cloud Scrunchie - Rose Quartz', price: 'Rs 280.00', img: product1 },
    { id: 2, tag: 'LIMITED RUN', category: 'OVERSIZED EDITIONS', title: 'Oversized Silk Scrunchie - Midnight Noir', price: 'Rs 340.00', img: product2 },
    { id: 3, tag: 'NEW SEASON', category: 'VELVET HAIR BOWS', title: 'Velvet Ribbon Hair Bow - Bordeaux', price: 'Rs 420.00', img: product3 },
    { id: 4, tag: 'BRIDAL ATELIER', category: 'EMBROIDERED BOWS', title: 'Pearl Embroidered French Bow - Ivory', price: 'Rs 580.00', img: product4 },
    { id: 5, tag: '', category: 'HAIR BOWS', title: 'The Juliette Silk-Velvet Tail Bow', price: 'Rs 380.00', img: product5 },
    { id: 6, tag: '', category: 'BESPOKE SETS', title: 'Petite Silk Trio Gift Vault', price: 'Rs 480.00', img: product6 },
    { id: 7, tag: '', category: 'HAIR BOWS', title: 'The Versailles French Lace Ribbon', price: 'Rs 340.00', img: product7 },
    { id: 8, tag: '', category: 'SCRUNCHIES', title: 'Emerald Botanical Silk Cloud', price: 'Rs 320.00', img: product8 },
  ];

  return (
    <div className="font-sans text-gray-800 pb-20">
      
      {/* 1. Hero Section */}
      <section className="bg-lightBeige px-8 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-darkPurple leading-tight mb-4">
              Handcrafted Elegance<br />for Every Strand
            </h1>
            <h2 className="text-xl text-primaryPurple font-medium mb-4">
              Bespoke Silk Scrunchies & Tailored Hair Bows
            </h2>
            <p className="text-sm text-gray-600 mb-8 max-w-md leading-relaxed">
              Meticulously fashioned from certified 22-Momme pure Mulberry silk and archival cotton velvets. Each couture accessory honors slow-fashion heritage and heirloom craftsmanship for mindful adornment.
            </p>
            <button className="bg-primaryPurple text-white px-6 py-3 rounded hover:bg-darkPurple transition text-sm font-medium mb-10">
              Explore The Collection →
            </button>
            <div className="flex space-x-12">
              <div>
                <p className="font-bold text-darkPurple">Zero Damage</p>
                <p className="text-xs text-gray-500">No Frizz, Creaseless Elastic</p>
              </div>
              <div>
                <p className="font-bold text-darkPurple">100%</p>
                <p className="text-xs text-gray-500">Hand-Cut & Sewn</p>
              </div>
            </div>
          </div>
          {/* Hero Images with actual assets */}
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
            <div key={idx} className="bg-[#fdfbf7] p-6 rounded border border-[#f0ebe1] flex items-start space-x-4">
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
          <button className="bg-primaryPurple text-white px-4 py-1.5 rounded-full text-xs hover:bg-darkPurple transition">All Pieces</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative bg-[#fdfbf7] rounded-md overflow-hidden aspect-square mb-4">
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-white text-[10px] font-bold px-2 py-1 rounded shadow-sm text-gray-700 tracking-wider">
                    {product.tag}
                  </span>
                )}
                <button className="absolute top-3 right-3 text-gray-400 hover:text-primaryPurple">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
                <img src={product.img} alt={product.title} className="w-full h-full object-cover mix-blend-multiply" />
              </div>
              <p className="text-[10px] text-primaryPurple font-bold tracking-widest uppercase mb-1">{product.category}</p>
              <h3 className="text-sm font-medium text-gray-800 mb-3 h-10 leading-snug">{product.title}</h3>
              <div className="flex justify-between items-center mt-auto">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase">Price</p>
                  <p className="text-sm font-bold text-gray-800">{product.price}</p>
                </div>
                <button className="bg-primaryPurple text-white px-3 py-1.5 rounded text-xs hover:bg-darkPurple transition flex items-center space-x-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
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
              <div key={item} className="bg-white p-6 rounded shadow-sm">
                <div className="flex text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="text-xs text-gray-600 mb-4 leading-relaxed italic">
                  "The pure mulberry cloud scrunchie in Rose Quartz has replaced every single hair tie I own..."
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