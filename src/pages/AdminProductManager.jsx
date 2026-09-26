import React, { useState, useRef, useEffect } from 'react';
import {
  FiSearch, FiFilter, FiUploadCloud, FiEdit2, FiTrash2,
  FiChevronRight, FiSave, FiX, FiPlus, FiRefreshCw
} from 'react-icons/fi';

const API_BASE = 'http://localhost:5000';

const CATEGORY_COLORS = [
  'bg-pink-100 text-pink-700',
  'bg-purple-100 text-purple-700',
  'bg-amber-100 text-amber-700',
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-red-100 text-red-700',
];

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

const ITEMS_PER_PAGE = 5;
const EMPTY_FORM = { name: '', price: '', stock: '', categoryId: '', imgFile: null, imgPreview: null };

const AdminProductManager = () => {
  const fileRef = useRef();

  // ── State ──────────────────────────────────────────────────────────────────
  const [products,   setProducts]   = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [saving,     setSaving]     = useState(false);
  const [search,     setSearch]     = useState('');
  const [page,       setPage]       = useState(1);
  const [form,       setForm]       = useState(EMPTY_FORM);
  const [editId,     setEditId]     = useState(null);   // null = add mode
  const [toast,      setToast]      = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  // ── Fetch categories from backend ──────────────────────────────────────────
  const loadCategories = async () => {
    try {
      const res  = await fetch(`${API_BASE}/api/admin/categories?limit=100`);
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
        if (data.data.length > 0 && !form.categoryId) {
          setForm(f => ({ ...f, categoryId: data.data[0]._id }));
        }
      }
    } catch { /* ignore */ }
  };

  // ── Fetch products from backend ────────────────────────────────────────────
  const loadProducts = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API_BASE}/api/admin/products?limit=100`);
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch {
      showToast('Cannot connect to backend. Make sure it is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  // ── Filtered + paged ───────────────────────────────────────────────────────
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.sku || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.category?.name || '').toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // ── Image upload preview ───────────────────────────────────────────────────
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm(f => ({ ...f, imgFile: file, imgPreview: URL.createObjectURL(file) }));
    }
  };

  // ── Save (Create or Update) ────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.name.trim()) return showToast('Please enter a product name.');
    if (!form.price)       return showToast('Please enter a price.');
    if (!form.categoryId)  return showToast('Please select a category.');

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name',     form.name.trim());
      formData.append('price',    form.price);
      formData.append('stock',    form.stock || '0');
      formData.append('category', form.categoryId);
      if (form.imgFile) formData.append('images', form.imgFile);

      const url    = editId ? `${API_BASE}/api/admin/products/${editId}` : `${API_BASE}/api/admin/products`;
      const method = editId ? 'PUT' : 'POST';

      const res  = await fetch(url, { method, body: formData });
      const data = await res.json();

      if (data.success) {
        showToast(editId ? 'Product updated!' : 'Product created!');
        setForm(EMPTY_FORM);
        setEditId(null);
        loadProducts();
      } else {
        showToast(data.message || 'Something went wrong');
      }
    } catch {
      showToast('Cannot connect to backend.');
    } finally {
      setSaving(false);
    }
  };

  // ── Edit ───────────────────────────────────────────────────────────────────
  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      name:       product.name,
      price:      product.price,
      stock:      product.stock,
      categoryId: product.category?._id || '',
      imgFile:    null,
      imgPreview: product.images?.[0]
        ? (product.images[0].startsWith('http') ? product.images[0] : `${API_BASE}${product.images[0]}`)
        : null,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const res  = await fetch(`${API_BASE}/api/admin/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) { showToast('Product deleted.'); loadProducts(); }
      else showToast(data.message || 'Delete failed');
    } catch { showToast('Cannot connect to backend.'); }
  };

  const getCategoryColor = (idx) => CATEGORY_COLORS[idx % CATEGORY_COLORS.length];

  const getImageUrl = (images) => {
    if (!images || images.length === 0) return null;
    const img = images[0];
    return img.startsWith('http') ? img : `${API_BASE}${img}`;
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-full font-sans">

      {/* Toast notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-gray-800 text-white text-sm px-4 py-3 rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-2 uppercase tracking-widest">
        <span>Admin</span>
        <FiChevronRight className="w-3 h-3" />
        <span>Catalog</span>
        <FiChevronRight className="w-3 h-3" />
        <span className="text-[#ff0081] font-semibold">Products</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Product Management</h1>

      {/* ── Add / Edit Product Card ─────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-5">
          <FiPlus className="w-4 h-4 text-[#ff0081]" />
          {editId ? 'Edit Product' : 'Add New Product'}
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

            {/* Price + Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Price (RS)</label>
                <input
                  type="number" min="0"
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                  placeholder="480"
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Stock Quantity</label>
                <input
                  type="number" min="0"
                  value={form.stock}
                  onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                  placeholder="25"
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] transition"
                />
              </div>
            </div>

            {/* Category — loaded from backend */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category</label>
              <div className="relative">
                <select
                  value={form.categoryId}
                  onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] appearance-none transition bg-white"
                >
                  <option value="">-- Select Category --</option>
                  {categories.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
                <FiChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Right — image upload */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Product Image</label>
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

            {/* Buttons */}
            <div className="flex gap-3 justify-end mt-auto">
              <button
                onClick={() => { setForm(EMPTY_FORM); setEditId(null); }}
                className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition font-medium"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2.5 bg-[#ff0081] hover:bg-[#c40063] text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition shadow-sm disabled:opacity-60"
              >
                <FiSave className="w-4 h-4" />
                {saving ? 'Saving...' : editId ? 'Update Product' : 'Save Product'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Products Table ──────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-sm font-bold text-gray-800">Active Products</h2>
            <p className="text-xs text-gray-400 mt-0.5">Manage inventory from MongoDB database.</p>
          </div>
          <div className="flex items-center gap-2">
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
            <button onClick={loadProducts} className="border border-gray-200 rounded-lg p-2 text-gray-400 hover:text-[#ff0081] hover:border-[#ff0081] transition" title="Refresh">
              <FiRefreshCw className="w-4 h-4" />
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
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-4 py-3"><div className="w-12 h-12 bg-gray-100 rounded-lg" /></td>
                    <td className="px-4 py-3"><div className="h-3 bg-gray-100 rounded w-36 mb-1" /><div className="h-2 bg-gray-100 rounded w-20" /></td>
                    <td className="px-4 py-3"><div className="h-5 bg-gray-100 rounded-full w-20" /></td>
                    <td className="px-4 py-3"><div className="h-3 bg-gray-100 rounded w-16" /></td>
                    <td className="px-4 py-3"><div className="h-3 bg-gray-100 rounded w-16" /></td>
                    <td className="px-4 py-3"><div className="h-5 bg-gray-100 rounded-full w-16" /></td>
                    <td className="px-4 py-3"><div className="h-3 bg-gray-100 rounded w-20 ml-auto" /></td>
                  </tr>
                ))
              ) : paged.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-xs">
                    {search ? 'No products match your search.' : 'No products yet. Add your first product above!'}
                  </td>
                </tr>
              ) : paged.map((product, idx) => {
                const imgUrl = getImageUrl(product.images);
                const catName = product.category?.name || 'Unknown';
                return (
                  <tr key={product._id} className="hover:bg-pink-50/30 transition">
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-pink-50 border border-pink-100 flex-shrink-0">
                        {imgUrl
                          ? <img src={imgUrl} alt={product.name} className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; }} />
                          : <div className="w-full h-full flex items-center justify-center text-pink-300 font-bold text-lg">{product.name[0]}</div>
                        }
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-800 text-sm">{product.name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">SKU: {product.sku}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${getCategoryColor(idx)}`}>
                        {catName}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-800">Rs {product.price}.00</td>
                    <td className="px-4 py-3 text-gray-500">{product.stock} in stock</td>
                    <td className="px-4 py-3"><StatusBadge status={product.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => handleEdit(product)} className="flex items-center gap-1 text-[#ff0081] hover:underline text-xs font-semibold">
                          <FiEdit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <span className="text-gray-200">|</span>
                        <button onClick={() => handleDelete(product._id)} className="flex items-center gap-1 text-red-400 hover:text-red-600 text-xs font-semibold">
                          <FiTrash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-50 text-xs text-gray-500">
          <span>{filtered.length} product{filtered.length !== 1 ? 's' : ''} total</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="px-3 py-1.5 rounded border border-gray-200 hover:border-[#ff0081] hover:text-[#ff0081] disabled:opacity-40 disabled:cursor-not-allowed transition">
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)}
                className={`w-8 h-8 rounded border text-xs font-semibold transition ${page === n ? 'bg-[#ff0081] text-white border-[#ff0081]' : 'border-gray-200 text-gray-500 hover:border-[#ff0081] hover:text-[#ff0081]'}`}>
                {n}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-3 py-1.5 rounded border border-gray-200 hover:border-[#ff0081] hover:text-[#ff0081] disabled:opacity-40 disabled:cursor-not-allowed transition">
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminProductManager;
