import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiChevronRight, FiChevronDown, FiChevronUp, FiMinus, FiPlus } from 'react-icons/fi';

const API_BASE = 'http://localhost:5000';

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[1,2,3,4,5].map((s) => (
      <svg key={s} className={`w-4 h-4 ${s <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
    <span className="text-sm text-gray-500 ml-1">{rating} ({rating >= 4.9 ? 'Exceptional' : rating >= 4.7 ? 'Excellent' : 'Very Good'})</span>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImg, setMainImg] = useState(null);
  const [wishlist, setWishlist] = useState(false);
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('craftsmanship');

  const getImageUrl = (img) => {
    if (!img) return null;
    return img.startsWith('http') ? img : `${API_BASE}${img}`;
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/products/${id}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setProduct(d.data);
          if (d.data.colors && d.data.colors.length > 0) setSelectedColor(d.data.colors[0]);
          if (d.data.images && d.data.images.length > 0) {
            const firstImg = d.data.images[0];
            setMainImg(firstImg.startsWith('http') ? firstImg : `${API_BASE}${firstImg}`);
          }
        } else {
          setError('Product not found');
        }
        setLoading(false);
      })
      .catch(() => { setError('Cannot connect to server'); setLoading(false); });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem('malmalee_cart') || '[]');
    const existing = cart.find(i => i.productId === product._id);
    if (existing) { existing.quantity += quantity; }
    else {
      const imgUrl = product.images?.[0];
      const finalImg = imgUrl ? getImageUrl(imgUrl) : '';
      cart.push({ productId: product._id, name: product.name, price: product.price, quantity: quantity, image: finalImg, sku: product.sku });
    }
    localStorage.setItem('malmalee_cart', JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] font-sans">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
            <div className="rounded-2xl bg-gray-200 aspect-square" />
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/3" />
              <div className="h-10 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-8 bg-gray-200 rounded w-1/3" />
              <div className="h-20 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#faf8f5] font-sans flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg font-medium mb-4">{error}</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-primaryPurple text-white px-5 py-2.5 rounded-lg text-sm hover:bg-darkPurple transition"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const productImages = (product.images || []).map(img => getImageUrl(img));
  const displayMain = mainImg || productImages[0] || null;

  const accordions = [
    {
      key: 'craftsmanship',
      title: 'Artisanal Craftsmanship & Silk Quality',
      content: (product.description || '') + (product.details ? ' ' + product.details : ''),
    },
    {
      key: 'care',
      title: 'Care Instructions',
      content: 'Hand wash in cool water with mild silk-specific detergent. Lay flat to dry away from direct sunlight. Do not tumble dry or iron. Store in the provided dust bag.',
    },
    {
      key: 'shipping',
      title: 'Shipping & Returns',
      content: 'Free shipping on orders over Rs 1,000. Standard delivery 3–5 business days. Express available. Returns accepted within 14 days in original condition.',
    },
  ];

  const colors = product.colors || [];

  return (
    <div className="min-h-screen bg-[#faf8f5] font-sans">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-5 pb-2">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <button onClick={() => navigate('/home')} className="hover:text-primaryPurple transition">Home</button>
          <FiChevronRight className="w-3 h-3" />
          <button onClick={() => navigate('/products')} className="hover:text-primaryPurple transition">{product.category?.name || 'Products'}</button>
          <FiChevronRight className="w-3 h-3" />
          <span className="text-gray-600 font-medium truncate max-w-[200px]">{(product.name || '').split(' - ')[0]}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left — Images */}
        <div>
          {/* Main Image */}
          <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm aspect-square mb-4">
            {displayMain ? (
              <img src={displayMain} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
            )}
          </div>
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {productImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImg(img)}
                className={`rounded-xl overflow-hidden border-2 aspect-square transition ${
                  mainImg === img ? 'border-primaryPurple shadow-sm' : 'border-transparent hover:border-gray-200'
                }`}
              >
                <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right — Info */}
        <div className="flex flex-col gap-5">

          {/* Tag */}
          {product.tag && (
            <span className="inline-block bg-pink-100 text-primaryPurple text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest w-fit">
              {product.tag}
            </span>
          )}

          {/* Title */}
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {(product.name || '').split(' - ')[0]}
          </h1>

          {/* Rating */}
          {product.rating != null && (
            <>
              <StarRating rating={product.rating} />
              {product.reviews != null && (
                <p className="text-xs text-gray-400 -mt-3">{product.reviews} verified reviews</p>
              )}
            </>
          )}

          {/* Stock */}
          {product.stock != null && (
            <p className={`text-xs font-semibold -mt-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </p>
          )}

          {/* Price */}
          <div>
            <p className="text-3xl font-bold text-darkPurple">Rs {product.price}.00</p>
            <p className="text-xs text-gray-400 mt-1">Inclusive of all taxes. Free shipping over Rs 1,000.</p>
          </div>

          {colors.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                Colour: <span className="text-[#ff0081]">{selectedColor || colors[0]}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    title={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 rounded-full border text-xs font-medium transition-all ${
                      selectedColor === color
                        ? 'border-[#ff0081] bg-pink-50 text-[#ff0081] shadow-sm'
                        : 'border-gray-200 text-gray-600 hover:border-[#ff0081] hover:text-[#ff0081]'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, i) => (
                <span key={i} className="text-[10px] bg-pink-50 text-primaryPurple border border-pink-200 px-2 py-0.5 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Quantity */}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-2.5 text-gray-500 hover:bg-gray-50 hover:text-primaryPurple transition"
              >
                <FiMinus className="w-4 h-4" />
              </button>
              <span className="px-5 py-2.5 text-sm font-semibold text-gray-800 min-w-[3rem] text-center border-x border-gray-200">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-2.5 text-gray-500 hover:bg-gray-50 hover:text-primaryPurple transition"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 ${
                product.stock === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : added
                  ? 'bg-green-500 text-white'
                  : 'bg-primaryPurple hover:bg-darkPurple text-white shadow-sm hover:shadow-md'
              }`}
            >
              <FiShoppingBag className="w-4 h-4" />
              {product.stock === 0 ? 'Out of Stock' : added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </div>

          {/* Buy Now + Wishlist Row */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                // Add to cart first, then go to checkout
                handleAddToCart();
                navigate('/checkout');
              }}
              className="flex-1 py-3 px-6 border-2 border-primaryPurple text-primaryPurple rounded-lg font-semibold text-sm hover:bg-pink-50 transition"
            >
              Buy Now
            </button>
            <button
              onClick={() => setWishlist(!wishlist)}
              className={`flex items-center gap-2 py-3 px-5 border-2 rounded-lg font-semibold text-sm transition ${
                wishlist
                  ? 'border-primaryPurple bg-pink-50 text-primaryPurple'
                  : 'border-gray-200 text-gray-500 hover:border-primaryPurple hover:text-primaryPurple'
              }`}
            >
              <FiHeart className={`w-4 h-4 ${wishlist ? 'fill-primaryPurple' : ''}`} />
              {wishlist ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
          </div>

          {/* Divider */}
          <hr className="border-gray-100" />

          {/* Accordion */}
          <div className="space-y-2">
            {accordions.map(({ key, title, content }) => (
              <div key={key} className="border border-gray-100 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setOpenAccordion(openAccordion === key ? null : key)}
                  className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition"
                >
                  <span>{title}</span>
                  {openAccordion === key
                    ? <FiChevronUp className="w-4 h-4 text-primaryPurple" />
                    : <FiChevronDown className="w-4 h-4 text-gray-400" />
                  }
                </button>
                {openAccordion === key && (
                  <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-50">
                    {content}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};

export default ProductDetail;
