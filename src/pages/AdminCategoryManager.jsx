import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiUploadCloud, FiEdit2, FiTrash2, FiChevronRight, FiSave, FiX, FiPlus, FiRefreshCw } from 'react-icons/fi';

const API_BASE = 'http://localhost:5000';
const ITEMS_PER_PAGE = 5;
const STATUSES = ['Active', 'Inactive', 'Seasonal'];
const EMPTY_FORM = { name: '', description: '', status: 'Active', imgFile: null, imgPreview: null };

const StatusBadge = ({ status }) => {
  const styles = { Active: 'bg-green-100 text-green-700', Seasonal: 'bg-amber-100 text-amber-700', Inactive: 'bg-gray-100 text-gray-500' };
  const dots   = { Active: 'bg-green-500', Seasonal: 'bg-amber-400', Inactive: 'bg-gray-400' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold ${styles[status] || styles.Inactive}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status] || dots.Inactive}`} />
      {status}
    </span>
  );
};

const AdminCategoryManager = () => {
  const fileRef = useRef();

  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [saving,     setSaving]     = useState(false);
  const [search,     setSearch]     = useState('');
  const [page,       setPage]       = useState(1);
  const [form,       setForm]       = useState(EMPTY_FORM);
  const [editId,     setEditId]     = useState(null);
  const [toast,      setToast]      = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  // ── Load categories from backend ──────────────────────────────────────────
  const loadCategories = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API_BASE}/api/admin/categories?limit=100`);
      const data = await res.json();
      if (data.success) setCategories(data.data);
    } catch {
      showToast('Cannot connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCategories(); }, []);

  // ── Filter + page ─────────────────────────────────────────────────────────
  const filtered   = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged      = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setForm(f => ({ ...f, imgFile: file, imgPreview: URL.createObjectURL(file) }));
  };

  // ── Save (Create or Update) ───────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.name.trim()) return showToast('Category name is required.');
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name',        form.name.trim());
      formData.append('description', form.description);
      formData.append('status',      form.status);
      if (form.imgFile) formData.append('image', form.imgFile);

      const url    = editId ? `${API_BASE}/api/admin/categories/${editId}` : `${API_BASE}/api/admin/categories`;
      const method = editId ? 'PUT' : 'POST';
      const res    = await fetch(url, { method, body: formData });
      const data   = await res.json();

      if (data.success) {
        showToast(editId ? 'Category updated!' : 'Category created!');
        setForm(EMPTY_FORM);
        setEditId(null);
        loadCategories();
      } else {
        showToast(data.message || 'Something went wrong');
      }
    } catch {
      showToast('Cannot connect to backend.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (cat) => {
    setEditId(cat._id);
    setForm({
      name:        cat.name,
      description: cat.description || '',
      status:      cat.status,
      imgFile:     null,
      imgPreview:  cat.image ? (cat.image.startsWith('http') ? cat.image : `${API_BASE}${cat.image}`) : null,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      const res  = await fetch(`${API_BASE}/api/admin/categories/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) { showToast('Category deleted.'); loadCategories(); }
      else showToast(data.message || 'Delete failed');
    } catch { showToast('Cannot connect to backend.'); }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-full font-sans">

      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-gray-800 text-white text-sm px-4 py-3 rounded-xl shadow-lg">{toast}</div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-2 uppercase tracking-widest">
        <span>Admin</span><FiChevronRight className="w-3 h-3" />
        <span>Catalog</span><FiChevronRight className="w-3 h-3" />
        <span className="text-[#ff0081] font-semibold">Categories</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Category Management</h1>

      {/* ── Add / Edit Card ────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-5">
          <FiPlus className="w-4 h-4 text-[#ff0081]" />
          {editId ? 'Edit Category' : 'Add New Category'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category Name</label>
              <input
                type="text" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Silk Scrunchies"
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Short description..."
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] transition resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#ff0081] focus:ring-1 focus:ring-[#ff0081] appearance-none bg-white transition"
              >
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Right — image upload */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category Image</label>
              <div
                onClick={() => fileRef.current.click()}
                className="border-2 border-dashed border-pink-200 rounded-xl flex flex-col items-center justify-center h-44 cursor-pointer hover:border-[#ff0081] hover:bg-pink-50 transition overflow-hidden"
              >
                {form.imgPreview
                  ? <img src={form.imgPreview} alt="preview" className="h-full w-full object-cover" />
                  : <><FiUploadCloud className="w-8 h-8 text-[#ff0081] mb-2" /><p className="text-xs font-semibold text-gray-500">Click to upload image</p></>
                }
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>
            <div className="flex gap-3 justify-end mt-auto">
              <button
                onClick={() => { setForm(EMPTY_FORM); setEditId(null); }}
                className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 font-medium transition"
              >
                Discard
              </button>
              <button
                onClick={handleSave} disabled={saving}
                className="px-5 py-2.5 bg-[#ff0081] hover:bg-[#c40063] text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition shadow-sm disabled:opacity-60"
              >
                <FiSave className="w-4 h-4" />
                {saving ? 'Saving...' : editId ? 'Update Category' : 'Save Category'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Categories Table ────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-sm font-bold text-gray-800">All Categories</h2>
            <p className="text-xs text-gray-400 mt-0.5">Manage categories from MongoDB database.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 gap-2 w-52">
              <FiSearch className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <input
                type="text" placeholder="Search categories..."
                value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="bg-transparent outline-none text-xs text-gray-700 placeholder-gray-400 w-full"
              />
              {search && <button onClick={() => setSearch('')}><FiX className="w-3 h-3 text-gray-400" /></button>}
            </div>
            <button onClick={loadCategories} className="border border-gray-200 rounded-lg p-2 text-gray-400 hover:text-[#ff0081] hover:border-[#ff0081] transition" title="Refresh">
              <FiRefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#ff0081] text-white text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Products</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-4 py-3"><div className="w-12 h-12 bg-gray-100 rounded-lg" /></td>
                    <td className="px-4 py-3"><div className="h-3 bg-gray-100 rounded w-28" /></td>
                    <td className="px-4 py-3"><div className="h-3 bg-gray-100 rounded w-20" /></td>
                    <td className="px-4 py-3"><div className="h-3 bg-gray-100 rounded w-10" /></td>
                    <td className="px-4 py-3"><div className="h-5 bg-gray-100 rounded-full w-16" /></td>
                    <td className="px-4 py-3"><div className="h-3 bg-gray-100 rounded w-16 ml-auto" /></td>
                  </tr>
                ))
              ) : paged.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 text-xs">
                    {search ? 'No categories match your search.' : 'No categories yet. Add your first category above!'}
                  </td>
                </tr>
              ) : paged.map(cat => {
                const imgUrl = cat.image ? (cat.image.startsWith('http') ? cat.image : `${API_BASE}${cat.image}`) : null;
                return (
                  <tr key={cat._id} className="hover:bg-pink-50/30 transition">
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-pink-50 border border-pink-100">
                        {imgUrl
                          ? <img src={imgUrl} alt={cat.name} className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; }} />
                          : <div className="w-full h-full flex items-center justify-center text-pink-300 font-bold text-lg">{cat.name[0]}</div>
                        }
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-800">{cat.name}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs font-mono">{cat.slug}</td>
                    <td className="px-4 py-3 text-gray-500">{cat.productCount || 0} products</td>
                    <td className="px-4 py-3"><StatusBadge status={cat.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => handleEdit(cat)} className="flex items-center gap-1 text-[#ff0081] hover:underline text-xs font-semibold">
                          <FiEdit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <span className="text-gray-200">|</span>
                        <button onClick={() => handleDelete(cat._id)} className="flex items-center gap-1 text-red-400 hover:text-red-600 text-xs font-semibold">
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

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-50 text-xs text-gray-500">
          <span>{filtered.length} categor{filtered.length !== 1 ? 'ies' : 'y'} total</span>
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

export default AdminCategoryManager;
