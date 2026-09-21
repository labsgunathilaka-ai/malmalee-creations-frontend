import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiChevronRight, FiChevronDown, FiChevronUp, FiMinus, FiPlus } from 'react-icons/fi';
import product1 from '../assets/product-1.jpg';
import product2 from '../assets/product-2.jpg';
import product3 from '../assets/product-3.jpg';
import product4 from '../assets/product-4.jpg';
import product5 from '../assets/product-5.jpg';
import product6 from '../assets/product-6.jpg';
import product7 from '../assets/product-7.jpg';
import product8 from '../assets/product-8.jpg';

const allProducts = [
  {
    id: 1, category: 'Scrunchies', tag: 'BESTSELLER',
    title: 'Pure Mulberry Silk Cloud Scrunchie - Rose Quartz',
    price: 280, img: product1,
    description: 'Handcrafted from certified 22-Momme Mulberry silk cultivated in ethically managed organic mulberry groves. This Cloud Scrunchie requires 45 minutes of meticulous hand-gathering and concealed French stitchery to completely shelter delicate hair from friction, creasing, and breakage.',
    details: 'Hypoallergenic natural sericin proteins nourish strands while preserving moisture balance. Elastic strength rated for 2000+ stretch cycles.',
    colors: [
      { name: 'Champagne Pearl', hex: '#f5e6c8' },
      { name: 'Midnight Noir', hex: '#1a1a1a' },
      { name: 'Navy Silk', hex: '#1e3a5f' },
      { name: 'Blush Rose', hex: '#f4a0b0' },
      { name: 'Sage Mist', hex: '#8faa8b' },
    ],
    images: [product1, product2, product3, product4],
    rating: 4.9, reviews: 128,
  },
  {
    id: 2, category: 'Scrunchies', tag: 'LIMITED RUN',
    title: 'Oversized Silk Scrunchie - Midnight Noir',
    price: 340, img: product2,
    description: 'Our most dramatic silhouette — the Oversized Cloud is engineered for thick or long hair. Triple-layered Mulberry silk with a reinforced core elastic ensures zero slippage throughout the day.',
    details: 'Limited seasonal run. Each piece is hand-numbered. Presented in our signature keepsake box.',
    colors: [
      { name: 'Midnight Noir', hex: '#1a1a1a' },
      { name: 'Bordeaux', hex: '#6e1423' },
    ],
    images: [product2, product1, product5, product6],
    rating: 4.8, reviews: 94,
  },
  {
    id: 3, category: 'Velvet Bows', tag: 'NEW SEASON',
    title: 'Velvet Ribbon Hair Bow - Bordeaux',
    price: 420, img: product3,
    description: 'Woven from archival cotton velvet with a 200-thread jacquard pattern. The Bordeaux Bow is finished with a hand-tied French knot and invisible elastic for all-day comfort.',
    details: 'Suitable for fine to thick hair. Interior elastic is latex-free. Spot clean only.',
    colors: [
      { name: 'Bordeaux', hex: '#6e1423' },
      { name: 'Emerald', hex: '#2d6a4f' },
      { name: 'Navy', hex: '#1e3a5f' },
    ],
    images: [product3, product4, product7, product8],
    rating: 4.7, reviews: 76,
  },
  {
    id: 4, category: 'Embroidered Bows', tag: 'BRIDAL ATELIER',
    title: 'Pearl Embroidered French Bow - Ivory',
    price: 580, img: product4,
    description: 'Exclusively crafted for the Bridal Atelier collection. Each bow is embellished with freshwater micro-pearls hand-stitched onto imported French organza. A timeless keepsake for your most precious moments.',
    details: 'Made to order — allow 5–7 business days. Comes in a velvet gift box. Personalised monogram available.',
    colors: [
      { name: 'Ivory', hex: '#fffff0' },
    ],
    images: [product4, product3, product1, product2],
    rating: 5.0, reviews: 52,
  },
  {
    id: 5, category: 'Velvet Bows', tag: '',
    title: 'The Juliette Silk-Velvet Tail Bow',
    price: 380, img: product5,
    description: 'The Juliette features cascading silk tails that add dramatic length and movement. Crafted from a silk-velvet blend exclusive to Malmalee Creations.',
    details: 'Available in three seasonal colourways. Elastic lined for comfortable all-day wear.',
    colors: [
      { name: 'Blush', hex: '#f4a0b0' },
      { name: 'Noir', hex: '#1a1a1a' },
      { name: 'Ivory', hex: '#fffff0' },
    ],
    images: [product5, product6, product7, product8],
    rating: 4.8, reviews: 61,
  },
  {
    id: 6, category: 'Bespoke Sets', tag: '',
    title: 'Petite Silk Trio Gift Vault',
    price: 480, img: product6,
    description: 'A curated trio of our bestselling petite scrunchies presented in a reusable lacquered gift vault. The perfect luxury gift for the discerning collector.',
    details: 'Includes 3 petite scrunchies in a coordinated colourway. Vault dimensions: 18×12×6cm.',
    colors: [
      { name: 'Multi', hex: '#f3e5f5' },
    ],
    images: [product6, product5, product1, product2],
    rating: 4.9, reviews: 43,
  },
  {
    id: 7, category: 'Velvet Bows', tag: '',
    title: 'The Versailles French Lace Ribbon',
    price: 340, img: product7,
    description: 'Inspired by the gardens of Versailles, this ribbon is crafted from imported French lace overlay on a satin base. The result is an ethereal, one-of-a-kind accessory.',
    details: 'Hand-wash only. Delicate lace — handle with care. One size fits all.',
    colors: [
      { name: 'Champagne', hex: '#f5e6c8' },
      { name: 'Blush', hex: '#f4a0b0' },
    ],
    images: [product7, product8, product3, product4],
    rating: 4.6, reviews: 38,
  },
  {
    id: 8, category: 'Scrunchies', tag: '',
    title: 'Emerald Botanical Silk Cloud',
    price: 320, img: product8,
    description: 'A seasonal exclusive inspired by Sri Lanka\'s lush botanical gardens. Deep emerald Mulberry silk with a subtle botanical sheen, hand-gathered into our signature cloud silhouette.',
    details: 'Limited seasonal colourway. Machine wash on delicate cycle in laundry bag.',
    colors: [
      { name: 'Emerald', hex: '#2d6a4f' },
      { name: 'Sage', hex: '#8faa8b' },
    ],
    images: [product8, product7, product5, product6],
    rating: 4.7, reviews: 55,
  },
];

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

  const product = allProducts.find(p => p.id === parseInt(id)) || allProducts[0];
  const related = allProducts.filter(p => p.id !== product.id).slice(0, 4);

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [mainImg, setMainImg] = useState(product.images[0]);
  const [wishlist, setWishlist] = useState(false);
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('craftsmanship');

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const accordions = [
    {
      key: 'craftsmanship',
      title: 'Artisanal Craftsmanship & Silk Quality',
      content: product.description + ' ' + product.details,
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

  return (
    <div className="min-h-screen bg-[#faf8f5] font-sans">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-5 pb-2">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <button onClick={() => navigate('/home')} className="hover:text-primaryPurple transition">Home</button>
          <FiChevronRight className="w-3 h-3" />
          <button onClick={() => navigate('/products')} className="hover:text-primaryPurple transition">{product.category}</button>
          <FiChevronRight className="w-3 h-3" />
          <span className="text-gray-600 font-medium truncate max-w-[200px]">{product.title.split(' - ')[0]}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left — Images */}
        <div>
          {/* Main Image */}
          <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm aspect-square mb-4">
            <img src={mainImg} alt={product.title} className="w-full h-full object-cover" />
          </div>
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, i) => (
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
            {product.title.split(' - ')[0]}
          </h1>

          {/* Rating */}
          <StarRating rating={product.rating} />
          <p className="text-xs text-gray-400 -mt-3">{product.reviews} verified reviews</p>

          {/* Price */}
          <div>
            <p className="text-3xl font-bold text-darkPurple">Rs {product.price}.00</p>
            <p className="text-xs text-gray-400 mt-1">Inclusive of all taxes. Free shipping over Rs 1,000.</p>
          </div>

          {/* Colour Palette */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
              Colour Palette: <span className="text-primaryPurple">{selectedColor.name}</span>
            </p>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  title={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor.name === color.name
                      ? 'border-primaryPurple scale-110 shadow-md'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

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
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-primaryPurple hover:bg-darkPurple text-white shadow-sm hover:shadow-md'
              }`}
            >
              <FiShoppingBag className="w-4 h-4" />
              {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </div>

          {/* Buy Now + Wishlist Row */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/checkout')}
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

      {/* Related Products */}
      <div className="bg-[#fff0f5] mt-12 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-playfair text-2xl font-bold text-gray-800">Related Creations &amp; Sets</h2>
            <button
              onClick={() => navigate('/products')}
              className="text-xs font-semibold text-primaryPurple hover:underline flex items-center gap-1"
            >
              Explore Entire Catalog <FiChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-pink-50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer" onClick={() => { navigate(`/products/${p.id}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <div className="aspect-square overflow-hidden bg-[#fdf6f9]">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-primaryPurple mb-1">{p.category}</p>
                  <h3 className="text-sm font-medium text-gray-800 leading-snug line-clamp-2 mb-3">{p.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-darkPurple">Rs {p.price}.00</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/products/${p.id}`); }}
                      className="text-xs font-semibold bg-primaryPurple text-white px-3 py-1.5 rounded-lg hover:bg-darkPurple transition"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductDetail;
