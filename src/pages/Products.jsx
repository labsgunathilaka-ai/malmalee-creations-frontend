import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiSearch, FiFilter, FiX, FiChevronDown } from 'react-icons/fi';

const API_BASE = 'http://localhost:5000';

const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];
const sortMap = {
  'Newest':               'newest',
  'Price: Low to High':   'price_low',
  'Price: High to Low':   'price_high',
  'Top Rated':            'newest',
};

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

  // ── State ──────────────────────────────────────────────────────────────────
  const [products,       setProducts]       = useState([]);
  const [categories,     setCategories]     = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [error,          setError]          = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCatId,    setActiveCatId]    = useState('');
  const [sortBy,         setSortBy]         = useState('Newest');
  const [searchQuery,    setSearchQuery]    = useState('');
  const [wishlist,       setWishlist]       = useState([]);
  const [addedToCart,    setAddedToCart]    = useState([]);
  const [showSortMenu,   setShowSortMenu]   = useState(false);
  const [total,          setTotal]          = useState(0);

  // ── Fetch categories from backend ──────────────────────────────────────────
  useEffect(() => {
    fetch(`${API_BASE}/api/categories`)
      .then(r => r.json())
      .then(data => {
        if (data.success) setCategories(data.data);
      })
      .catch(() => {});
  }, []);

  // ── Fetch products from backend ────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (activeCatId)  params.set('category', activeCatId);
    if (searchQuery)  params.set('q', searchQuery);
    params.set('sort',  sortMap[sortBy] || 'newest');
    params.set('limit', '50');

    // Use search endpoint when there's a query, otherwise use products endpoint
    const url = searchQuery
      ? `${API_BASE}/api/search?${params}`
      : `${API_BASE}/api/products?${params}`;

    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setProducts(data.data);
          setTotal(data.total || data.data.length);
        } else {
          setError('Failed to load products');
        }
      })
      .catch(() => setError('Cannot connect to server. Make sure backend is running.'))
      .finally(() => setLoading(false));
  }, [activeCatId, sortBy, searchQuery]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const getImageUrl = (images) => {
    if (!images || images.length === 0) return 'https://placehold.co/400x400?text=No+Image';
    const img = images[0];
    return img.startsWith('http') ? img : `${API_BASE}${img}`;
  };

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat.name || 'All');
    setActiveCatId(cat._id || '');
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleAddToCart = (id) => {
    setAddedToCart(prev => [...prev, id]);
    setTimeout(() => setAddedToCart(prev => prev.filter(i => i !== id)), 1500);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
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
          {/* All button */}
          <button
            onClick={() => { setActiveCategory('All'); setActiveCatId(''); }}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition border ${
              activeCategory === 'All'
                ? 'bg-[#c81e67] text-white border-[#c81e67] shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#c81e67] hover:text-[#c81e67]'
            }`}
          >
            All
          </button>

          {/* Dynamic categories from backend */}
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleCategoryClick(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition border ${
                activeCategory === cat.name
                  ? 'bg-[#c81e67] text-white border-[#c81e67] shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#c81e67] hover:text-[#c81e67]'
              }`}
            >
              {cat.name}
            </button>
          ))}

          <span className="ml-auto text-xs text-gray-400 self-center">{total} items</span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                <div className="aspect-square bg-gray-100" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg font-medium text-red-400">{error}</p>
            <p className="text-sm mt-1">Make sure the backend is running on port 5000</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <FiSearch className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const inCart     = addedToCart.includes(product._id);
              const inWishlist = wishlist.includes(product._id);
              const imageUrl   = getImageUrl(product.images);
              const catName    = product.category?.name || '';
              const tag        = product.tags?.[0] || '';

              return (
                <div
                  key={product._id}
                  onClick={() => { navigate(`/products/${product._id}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-square bg-[#fdf6f9]">
                    {tag && (
                      <span className="absolute top-3 left-3 z-10 bg-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm text-gray-700 tracking-wider uppercase">
                        {tag}
                      </span>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(product._id); }}
                      className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition"
                    >
                      <FiHeart className={`w-4 h-4 transition ${inWishlist ? 'fill-[#c81e67] text-[#c81e67]' : 'text-gray-400'}`} />
                    </button>
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = 'https://placehold.co/400x400?text=No+Image'; }}
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-[10px] text-[#c81e67] font-bold tracking-widest uppercase mb-1">{catName}</p>
                    <h3 className="text-sm font-medium text-gray-800 leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">{product.name}</h3>

                    <StarRating rating={product.rating || 0} />
                    <p className="text-[10px] text-gray-400 mt-0.5 mb-3">{product.reviewCount || 0} reviews</p>

                    {/* Colors */}
                    {product.colors?.length > 0 && (
                      <div className="flex gap-1 mb-3">
                        {product.colors.map((c) => (
                          <span key={c} className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{c}</span>
                        ))}
                      </div>
                    )}

                    {/* Price + Cart */}
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wide">Price</p>
                        <p className="text-base font-bold text-gray-900">Rs {product.price}.00</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product._id); }}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                          inCart ? 'bg-green-500 text-white scale-95' : 'bg-[#c81e67] hover:bg-[#a61352] text-white'
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
