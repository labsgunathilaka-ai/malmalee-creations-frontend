import React, { useState, useRef } from 'react';
import {
  FiSearch, FiFilter, FiUploadCloud, FiEdit2, FiTrash2,
  FiChevronRight, FiSave, FiX, FiPlus
} from 'react-icons/fi';
import product1 from '../assets/product-1.jpg';
import product2 from '../assets/product-2.jpg';
import product3 from '../assets/product-3.jpg';
import product4 from '../assets/product-4.jpg';
import product5 from '../assets/product-5.jpg';

const CATEGORIES = ['Scrunchies', 'Hair Bows', 'Handbags', 'Headbands', 'Silk Accessories'];

const CATEGORY_COLORS = {
  Scrunchies:       'bg-pink-100 text-pink-700',
  'Hair Bows':      'bg-purple-100 text-purple-700',
  Handbags:         'bg-amber-100 text-amber-700',
  Headbands:        'bg-blue-100 text-blue-700',
  'Silk Accessories':'bg-green-100 text-green-700',
};

const INITIAL_PRODUCTS = [
  { id: 1,  name: 'Celestial Silk Scrunchie',         sku: 'MAL-SCR-001', category: 'Scrunchies', price: 320,  stock: 48, status: 'Active',    img: product1 },
  { id: 2,  name: 'Imperial Damask Velvet Bow',        sku: 'MAL-BOW-889', category: 'Hair Bows',  price: 480,  stock: 18, status: 'Active',    img: product2 },
  { id: 3,  name: 'Petit Fleur Silk Minaudière',       sku: 'MAL-BAG-914', category: 'Handbags',   price: 185,  stock: 12, status: 'Active',    img: product3 },
  { id: 4,  name: 'Versailles French Lace Ribbon',     sku: 'MAL-BOW-833', category: 'Hair Bows',  price: 340,  stock: 35, status: 'Active',    img: product4 },
  { id: 5,  name: 'Heirloom Padded Velvet Headband',   sku: 'MAL-HBD-957', category: 'Headbands',  price: 540,  stock: 8,  status: 'Low Stock', img: product5 },
  { id: 6,  name: 'Pure Mulberry Silk Cloud Scrunchie',sku: 'MAL-SCR-002', category: 'Scrunchies', price: 280,  stock: 22, status: 'Active',    img: product1 },
  { id: 7,  name: 'Oversized Silk Scrunchie Noir',     sku: 'MAL-SCR-003', category: 'Scrunchies', price: 340,  stock: 0,  status: 'Out of Stock', img: product2 },
  { id: 8,  name: 'Pearl Embroidered French Bow',      sku: 'MAL-BOW-214', category: 'Hair Bows',  price: 580,  stock: 9,  status: 'Low Stock', img: product3 },
];

const ITEMS_PER_PAGE = 5;

const StatusBadge = ({ status }) => {
  const map = {
    'Active':       'bg-green-100 text-green-700',
    'Low Stock':    'bg-amber-100 text-amber-700',
    'Out of Stock': 'bg-red-100 text-red-600',
    'Inactive':     'bg-gray-100 text-gray-500',
  };
  const dot = {
    'Active':       'bg-green-500',
    'Low Stock':    'bg-amber-400',
    'Out of Stock': 'bg-red-400',
    'Inactive':     'bg-gray-400',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${map[status] || map.Inactive}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot[status] || dot.Inactive}`} />
      {status}
    </span>
  );
};

const AdminProductManager = () => {
  const [products, setProducts]   = useState(INITIAL_PRODUCTS);
  const [search, setSearch]       = useState('');
  const [page, setPage]           = useState(1);
  const fileRef                   = useRef();

  const [form, setForm] = useState({
    name: '', price: '', stock: '', category: 'Hair Bows', imgPreview: null,
  });

  // ── filtering & paging ────────────────────────────────────────────────────
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // ── form handlers ─────────────────────────────────────────────────────────
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setForm(f => ({ ...f, imgPreview: URL.createObjectURL(file) }));
  };

  const handleSave = () => {
    if (!form.name.trim()) return alert('Please enter a product name.');
    if (!form.price)       return alert('Please enter a price.');
    const newProduct = {
      id: Date.now(),
      name: form.name.trim(),
      sku: 'MAL-NEW-' + Math.floor(Math.random() * 900 + 100),
      category: form.category,
      price: parseFloat(form.price) || 0,
      stock: parseInt(form.stock) || 0,
      status: parseInt(form.stock) > 10 ? 'Active' : parseInt(form.stock) > 0 ? 'Low Stock' : 'Out of Stock',
      img: form.imgPreview || null,
    };
    setProducts(prev => [newProduct, ...prev]);
    setForm({ name: '', price: '', stock: '', category: 'Hair Bows', imgPreview: null });
    setPage(1);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-full font-sans">

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-2 uppercase tracking-widest">
        <span>Admin</span>
        <FiChevronRight className="w-3 h-3" />
        <span>Catalog</span>
        <FiChevronRight className="w-3 h-3" />
        <span className="text-[#ff0081] font-semibold">Products</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Product Management</h1>

      {/* ── Add New Product Card ───────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-5">
          <FiPlus className="w-4 h-4 text-[#ff0081]" /> Add New Product
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left — form fields */}
          <div className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Product Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Celestial Silk Scrunchie"
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] transition"
              />
            </div>

            {/* Price + Stock row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Price (USD)</label>
                <input
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                  placeholder="RS:480.00"
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Stock Quantity</label>
                <input
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                  placeholder="25"
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] transition"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category</label>
              <div className="relative">
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] appearance-none transition bg-white"
                >
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <FiChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Right — image upload */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Product Media</label>
              <div
                onClick={() => fileRef.current.click()}
                className="border-2 border-dashed border-pink-200 rounded-xl flex flex-col items-center justify-center h-44 cursor-pointer hover:border-[#ff0081] hover:bg-pink-50 transition overflow-hidden"
              >
                {form.imgPreview ? (
                  <img src={form.imgPreview} alt="preview" className="h-full w-full object-cover" />
                ) : (
                  <>
                    <FiUploadCloud className="w-8 h-8 text-[#ff0081] mb-2" />
                    <p className="text-xs font-semibold text-gray-500">Click to upload image</p>
                  </>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 justify-end mt-auto">
              <button
                onClick={() => setForm({ name: '', price: '', stock: '', category: 'Hair Bows', imgPreview: null })}
                className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition font-medium"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 bg-[#ff0081] hover:bg-[#c40063] text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition shadow-sm"
              >
                <FiSave className="w-4 h-4" />
                Save Product
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Active Products Table ─────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table top bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-sm font-bold text-gray-800">Active Products</h2>
            <p className="text-xs text-gray-400 mt-0.5">Manage existing atelier inventory, pricing, and live listings.</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 gap-2 w-52">
              <FiSearch className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search product or SKU..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="bg-transparent outline-none text-xs text-gray-700 placeholder-gray-400 w-full"
              />
              {search && <button onClick={() => setSearch('')}><FiX className="w-3 h-3 text-gray-400" /></button>}
            </div>
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-500 hover:border-[#ff0081] hover:text-[#ff0081] transition">
              <FiFilter className="w-3.5 h-3.5" /> Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#ff0081] text-white text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name / SKU</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-xs">No products found.</td>
                </tr>
              ) : paged.map(product => (
                <tr key={product.id} className="hover:bg-pink-50/30 transition">
                  {/* Image */}
                  <td className="px-4 py-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-pink-50 border border-pink-100 flex-shrink-0">
                      {product.img
                        ? <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-pink-300 font-bold">{product.name[0]}</div>
                      }
                    </div>
                  </td>
                  {/* Name / SKU */}
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-800 text-sm">{product.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">SKU: {product.sku}</p>
                  </td>
                  {/* Category badge */}
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[product.category] || 'bg-gray-100 text-gray-500'}`}>
                      {product.category}
                    </span>
                  </td>
                  {/* Price */}
                  <td className="px-4 py-3 font-semibold text-gray-800">Rs {product.price}.00</td>
                  {/* Stock */}
                  <td className="px-4 py-3 text-gray-500">{product.stock} in stock</td>
                  {/* Status */}
                  <td className="px-4 py-3"><StatusBadge status={product.status} /></td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <button className="flex items-center gap-1 text-[#ff0081] hover:underline text-xs font-semibold">
                        <FiEdit2 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <span className="text-gray-200">|</span>
                      <button onClick={() => handleDelete(product.id)} className="flex items-center gap-1 text-red-400 hover:text-red-600 text-xs font-semibold">
                        <FiTrash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-50 text-xs">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded border border-gray-200 text-gray-500 hover:border-[#ff0081] hover:text-[#ff0081] disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-8 h-8 rounded border text-xs font-semibold transition ${
                page === n
                  ? 'bg-[#ff0081] text-white border-[#ff0081]'
                  : 'border-gray-200 text-gray-500 hover:border-[#ff0081] hover:text-[#ff0081]'
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded border border-gray-200 text-gray-500 hover:border-[#ff0081] hover:text-[#ff0081] disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
};

export default AdminProductManager;
