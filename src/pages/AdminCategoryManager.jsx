import React, { useState, useRef } from 'react';
import { FiSearch, FiFilter, FiUploadCloud, FiEdit2, FiTrash2, FiChevronRight, FiSave, FiX } from 'react-icons/fi';
import product1 from '../assets/product-1.jpg';
import product3 from '../assets/product-3.jpg';
import product4 from '../assets/product-4.jpg';
import product5 from '../assets/product-5.jpg';
import product6 from '../assets/product-6.jpg';

const INITIAL_CATEGORIES = [
  { id: 1, name: 'Scrunchies',        count: 28, status: 'Active',   img: product1 },
  { id: 2, name: 'Hair Bows',         count: 19, status: 'Active',   img: product3 },
  { id: 3, name: 'Handbags',          count: 12, status: 'Active',   img: product4 },
  { id: 4, name: 'Headbands',         count: 15, status: 'Seasonal', img: product5 },
  { id: 5, name: 'Silk Accessories',  count: 34, status: 'Active',   img: product6 },
];

const ITEMS_PER_PAGE = 5;

const StatusBadge = ({ status }) => {
  const styles = {
    Active:   'bg-green-100 text-green-700',
    Seasonal: 'bg-amber-100 text-amber-700',
    Inactive: 'bg-gray-100 text-gray-500',
  };
  const dots = {
    Active:   'bg-green-500',
    Seasonal: 'bg-amber-400',
    Inactive: 'bg-gray-400',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold ${styles[status] || styles.Inactive}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status] || dots.Inactive}`} />
      {status}
    </span>
  );
};

const AdminCategoryManager = () => {
  const [categories, setCategories]   = useState(INITIAL_CATEGORIES);
  const [search, setSearch]           = useState('');
  const [page, setPage]               = useState(1);
  const [editingId, setEditingId]     = useState(null);

  // Add-form state
  const [form, setForm] = useState({ name: '', order: '1', description: '', imgPreview: null });
  const fileRef = useRef();

  // ── helpers ──────────────────────────────────────────────────────────────
  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setForm(f => ({ ...f, imgPreview: URL.createObjectURL(file) }));
  };

  const handleSave = () => {
    if (!form.name.trim()) return alert('Please enter a category name.');
    const newCat = {
      id: Date.now(),
      name: form.name.trim(),
      count: 0,
      status: 'Active',
      img: form.imgPreview || null,
    };
    setCategories(prev => [newCat, ...prev]);
    setForm({ name: '', order: '1', description: '', imgPreview: null });
    setPage(1);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this category?')) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleStatusToggle = (id) => {
    setCategories(prev => prev.map(c =>
      c.id === id
        ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' }
        : c
    ));
  };

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-full font-sans">

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-2 uppercase tracking-widest">
        <span>Admin</span>
        <FiChevronRight className="w-3 h-3" />
        <span>Catalog</span>
        <FiChevronRight className="w-3 h-3" />
        <span className="text-[#ff0081] font-semibold">Categories</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Category Management</h1>

      {/* ── Add New Category Card ─────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-sm font-bold text-gray-700 mb-5 uppercase tracking-wider">Add New Category</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category Name <span className="text-[#ff0081]">*</span></label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Velvet Hair Bows"
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Display Order Priority</label>
              <input
                type="number"
                min="1"
                value={form.order}
                onChange={e => setForm(f => ({ ...f, order: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Curatorial Description</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Brief description of this category..."
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] transition resize-none"
              />
            </div>
          </div>

          {/* Right — image upload */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category Cover Visual <span className="text-[#ff0081]">*</span></label>
              <div
                onClick={() => fileRef.current.click()}
                className="border-2 border-dashed border-pink-200 rounded-xl flex flex-col items-center justify-center h-44 cursor-pointer hover:border-[#ff0081] hover:bg-pink-50 transition"
              >
                {form.imgPreview ? (
                  <img src={form.imgPreview} alt="preview" className="h-full w-full object-cover rounded-xl" />
                ) : (
                  <>
                    <FiUploadCloud className="w-8 h-8 text-[#ff0081] mb-2" />
                    <p className="text-xs font-semibold text-gray-500">Click to upload thumbnail</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">or drag textile imagery here</p>
                  </>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end mt-auto">
              <button
                onClick={() => setForm({ name: '', order: '1', description: '', imgPreview: null })}
                className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition font-medium"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 bg-[#ff0081] hover:bg-[#c40063] text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition shadow-sm"
              >
                <FiSave className="w-4 h-4" />
                Save Category
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Active Categories Table ───────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-800">Active Categories</h2>
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 gap-2 w-52">
              <FiSearch className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search categories..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="bg-transparent outline-none text-xs text-gray-700 placeholder-gray-400 w-full"
              />
              {search && <button onClick={() => setSearch('')}><FiX className="w-3 h-3 text-gray-400 hover:text-gray-600" /></button>}
            </div>
            {/* Filter */}
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
                <th className="px-6 py-3">Category Image</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Product Count</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-xs">
                    No categories found.
                  </td>
                </tr>
              ) : paged.map((cat) => (
                <tr key={cat.id} className="hover:bg-pink-50/40 transition">
                  {/* Image */}
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-pink-50 border border-pink-100">
                      {cat.img
                        ? <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-pink-300 text-lg font-bold">{cat.name[0]}</div>
                      }
                    </div>
                  </td>
                  {/* Name */}
                  <td className="px-6 py-4 font-semibold text-gray-800">{cat.name}</td>
                  {/* Count */}
                  <td className="px-6 py-4 text-gray-500">{cat.count} items</td>
                  {/* Status */}
                  <td className="px-6 py-4">
                    <button onClick={() => handleStatusToggle(cat.id)}>
                      <StatusBadge status={cat.status} />
                    </button>
                  </td>
                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => setEditingId(cat.id)}
                        className="flex items-center gap-1 text-[#ff0081] hover:underline text-xs font-semibold transition"
                      >
                        <FiEdit2 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="flex items-center gap-1 text-red-400 hover:text-red-600 text-xs font-semibold transition"
                      >
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

export default AdminCategoryManager;
