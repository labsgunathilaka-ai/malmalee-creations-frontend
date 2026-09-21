import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiSearch, FiFilter, FiX, FiChevronDown } from 'react-icons/fi';
import product1 from '../assets/product-1.jpg';
import product2 from '../assets/product-2.jpg';
import product3 from '../assets/product-3.jpg';
import product4 from '../assets/product-4.jpg';
import product5 from '../assets/product-5.jpg';
import product6 from '../assets/product-6.jpg';
import product7 from '../assets/product-7.jpg';
import product8 from '../assets/product-8.jpg';

const allProducts = [
  { id: 1, tag: 'BESTSELLER', category: 'Silk Scrunchies', title: 'Pure Mulberry Silk Cloud Scrunchie - Rose Quartz', price: 280, img: product1, colors: ['Rose', 'Ivory', 'Noir'], rating: 4.9, reviews: 128 },
  { id: 2, tag: 'LIMITED RUN', category: 'Silk Scrunchies', title: 'Oversized Silk Scrunchie - Midnight Noir', price: 340, img: product2, colors: ['Noir', 'Bordeaux'], rating: 4.8, reviews: 94 },
  { id: 3, tag: 'NEW SEASON', category: 'Velvet Hair Bows', title: 'Velvet Ribbon Hair Bow - Bordeaux', price: 420, img: product3, colors: ['Bordeaux', 'Emerald', 'Navy'], rating: 4.7, reviews: 76 },
  { id: 4, tag: 'BRIDAL ATELIER', category: 'Embroidered Bows', title: 'Pearl Embroidered French Bow - Ivory', price: 580, img: product4, colors: ['Ivory'], rating: 5.0, reviews: 52 },
  { id: 5, tag: '', category: 'Velvet Hair Bows', title: 'The Juliette Silk-Velvet Tail Bow', price: 380, img: product5, colors: ['Blush', 'Noir', 'Ivory'], rating: 4.8, reviews: 61 },
  { id: 6, tag: '', category: 'Bespoke Sets', title: 'Petite Silk Trio Gift Vault', price: 480, img: product6, colors: ['Multi'], rating: 4.9, reviews: 43 },
  { id: 7, tag: '', category: 'Velvet Hair Bows', title: 'The Versailles French Lace Ribbon', price: 340, img: product7, colors: ['Champagne', 'Blush'], rating: 4.6, reviews: 38 },
  { id: 8, tag: '', category: 'Silk Scrunchies', title: 'Emerald Botanical Silk Cloud', price: 320, img: product8, colors: ['Emerald', 'Sage'], rating: 4.7, reviews: 55 },
];

const categories = ['All', 'Silk Scrunchies', 'Velvet Hair Bows', 'Embroidered Bows', 'Bespoke Sets'];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Newest'];

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
    <span className="text-[10px] text-gray-400 ml-1">({rating})</span>
  </div>
);

const Products = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const toggleWishlist = (id) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleAddToCart = (id) => {
    setAddedToCart((prev) => [...prev, id]);
    setTimeout(() => setAddedToCart((prev) => prev.filter((i) => i !== id)), 1500);
  };

  const filtered = allProducts
    .filter((p) => activeCategory === 'All' || p.category === activeCategory)
    .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      if (sortBy === 'Top Rated') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#faf8f5] font-sans">

      {/* Page Banner */}
      <div className="bg-[#c81e67] text-white py-12 px-8 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-white/70 mb-2">Handcrafted with Love</p>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold tracking-tight">Our Collection</h1>
        <p className="text-sm text-white/80 mt-3 max-w-md mx-auto">
          Bespoke silk scrunchies, velvet bows and embroidered hair accessories crafted for the discerning collector.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Search + Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          {/* Search */}
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2.5 w-full md:w-80 shadow-sm">
            <FiSearch className="text-gray-400 w-4 h-4 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 shadow-sm hover:border-[#c81e67] transition"
            >
              <FiFilter className="w-4 h-4 text-gray-400" />
              <span>Sort: <strong>{sortBy}</strong></span>
              <FiChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {showSortMenu && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 w-52 py-2">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setSortBy(opt); setShowSortMenu(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition ${sortBy === opt ? 'text-[#c81e67] font-semibold bg-pink-50' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition border ${
                activeCategory === cat
                  ? 'bg-[#c81e67] text-white border-[#c81e67] shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#c81e67] hover:text-[#c81e67]'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400 self-center">{filtered.length} items</span>
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <FiSearch className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => {
              const inCart = addedToCart.includes(product.id);
              const inWishlist = wishlist.includes(product.id);
              return (
                <div key={product.id} onClick={() => { navigate(`/products/${product.id}`); window.scrollTo({top:0,behavior:"smooth"}); }} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-square bg-[#fdf6f9]">
                    {product.tag && (
                      <span className="absolute top-3 left-3 z-10 bg-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm text-gray-700 tracking-wider uppercase">
                        {product.tag}
                      </span>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                      className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition"
                    >
                      <FiHeart className={`w-4 h-4 transition ${inWishlist ? 'fill-[#c81e67] text-[#c81e67]' : 'text-gray-400'}`} />
                    </button>
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-[10px] text-[#c81e67] font-bold tracking-widest uppercase mb-1">{product.category}</p>
                    <h3 className="text-sm font-medium text-gray-800 leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">{product.title}</h3>
                    
                    {/* Rating */}
                    <StarRating rating={product.rating} />
                    <p className="text-[10px] text-gray-400 mt-0.5 mb-3">{product.reviews} reviews</p>

                    {/* Colors */}
                    <div className="flex gap-1 mb-3">
                      {product.colors.map((c) => (
                        <span key={c} className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{c}</span>
                      ))}
                    </div>

                    {/* Price + Cart */}
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wide">Price</p>
                        <p className="text-base font-bold text-gray-900">Rs {product.price}.00</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product.id); }}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                          inCart
                            ? 'bg-green-500 text-white scale-95'
                            : 'bg-[#c81e67] hover:bg-[#a61352] text-white'
                        }`}
                      >
                        <FiShoppingBag className="w-3.5 h-3.5" />
                        {inCart ? 'Added!' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-white border border-gray-100 rounded-2xl py-12 px-6 shadow-sm">
          <p className="text-xs text-[#c81e67] font-bold tracking-widest uppercase mb-2">Bespoke Orders</p>
          <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-3">Can't find what you're looking for?</h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
            We create custom pieces tailored to your style. Get in touch for a bespoke consultation.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-[#c81e67] hover:bg-[#a61352] text-white px-8 py-3 rounded-lg text-sm font-semibold transition"
          >
            Request a Custom Piece
          </button>
        </div>

      </div>
    </div>
  );
};

export default Products;
