import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import {
  LogoIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  SearchIcon,
  ExternalLinkIcon,
  LogoutIcon,
  UserIcon,
  MessageSquareIcon,
  ChevronDownIcon,
} from '../../components/Icons';

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const categoryBadgeStyles = {
  Astrology: 'bg-amber-50 text-amber-800 border-amber-200',
  Numerology: 'bg-blue-50 text-blue-800 border-blue-200',
  'Vastu Shastra': 'bg-emerald-50 text-emerald-800 border-emerald-200',
  Rashifal: 'bg-rose-50 text-rose-800 border-rose-200',
  'Seva Stories': 'bg-purple-50 text-purple-800 border-purple-200',
  Spirituality: 'bg-indigo-50 text-indigo-800 border-indigo-200',
};

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, title: '' });
  const [deleting, setDeleting] = useState(false);

  // Expanded comments panel state
  const [expandedComments, setExpandedComments] = useState(null); // blogId or null
  const [deletingComment, setDeletingComment] = useState(null); // commentId being deleted

  const handleDeleteComment = async (blogId, commentId) => {
    setDeletingComment(commentId);
    try {
      await api.delete(`/blogs/${blogId}/comments/${commentId}`);
      setBlogs((prev) =>
        prev.map((b) =>
          b._id === blogId
            ? { ...b, comments: (b.comments || []).filter((c) => c._id !== commentId) }
            : b
        )
      );
    } catch {
      alert('Could not delete comment. Please try again.');
    } finally {
      setDeletingComment(null);
    }
  };

  const loadBlogs = () => {
    setLoading(true);
    api
      .get('/blogs/admin/all')
      .then((res) => setBlogs(res.data))
      .catch(() => setError('Could not load blog posts. Please check server status.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const confirmDelete = async () => {
    if (!deleteModal.id) return;
    setDeleting(true);
    try {
      await api.delete(`/blogs/${deleteModal.id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== deleteModal.id));
      setDeleteModal({ open: false, id: null, title: '' });
    } catch {
      alert('Could not delete this post. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Stats calculation
  const stats = useMemo(() => {
    const total = blogs.length;
    const published = blogs.filter((b) => b.published).length;
    const drafts = total - published;
    const categoriesSet = new Set(blogs.map((b) => b.category).filter(Boolean));
    return { total, published, drafts, categoriesCount: categoriesSet.size };
  }, [blogs]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchSearch =
        !searchTerm.trim() ||
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory = selectedCategory === 'All' || blog.category === selectedCategory;
      const matchStatus =
        selectedStatus === 'All' ||
        (selectedStatus === 'Published' && blog.published) ||
        (selectedStatus === 'Draft' && !blog.published);

      return matchSearch && matchCategory && matchStatus;
    });
  }, [blogs, searchTerm, selectedCategory, selectedStatus]);

  return (
    <div className="min-h-screen bg-slate-50 font-body text-slate-900 pb-16">
      
      {/* ── Top Header ────────────────────────────────────────── */}
      <header className="bg-[#0B192C] text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-3">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <LogoIcon className="w-5 h-5" color="#F59E0B" />
            </div>
            <div>
              <p className="font-display text-base sm:text-lg font-bold text-white tracking-tight leading-none">
                Astro Vastu Pragati
              </p>
              <p className="text-[11px] text-amber-400 font-semibold tracking-wider uppercase mt-0.5">
                Admin Management Portal
              </p>
            </div>
          </div>

          {/* User Controls */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
            >
              <span>Live Site</span>
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </Link>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
              <UserIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>{admin?.email}</span>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
            >
              <LogoutIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content ──────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Page Title & New Post CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Article Management
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Create, curate, and publish spiritual and astrological articles for seekers.
            </p>
          </div>

          <Link
            to="/admin/editor/new"
            className="inline-flex items-center justify-center gap-2 bg-[#0B192C] text-white hover:bg-blue-900 text-sm font-semibold rounded-xl px-5 py-2.5 shadow-sm transition-all hover:shadow"
          >
            <PlusIcon className="w-4 h-4 text-amber-400" />
            <span>Create New Post</span>
          </Link>
        </div>

        {/* ── Stats Row ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Total Posts</p>
            <p className="font-display text-2xl sm:text-3xl font-bold text-slate-900">{stats.total}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">Published</p>
            <p className="font-display text-2xl sm:text-3xl font-bold text-emerald-700">{stats.published}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">Drafts</p>
            <p className="font-display text-2xl sm:text-3xl font-bold text-amber-700">{stats.drafts}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Active Disciplines</p>
            <p className="font-display text-2xl sm:text-3xl font-bold text-blue-700">{stats.categoriesCount}</p>
          </div>
        </div>

        {/* ── Filters & Search ──────────────────────────────────── */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <SearchIcon className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search posts by title, excerpt or category…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-sm border border-slate-200 focus:outline-none focus:border-navy-900 focus:ring-1 focus:ring-navy-900 bg-slate-50"
            />
          </div>

          {/* Filter dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl text-sm border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:border-navy-900"
            >
              <option value="All">All Categories</option>
              <option value="Astrology">Astrology</option>
              <option value="Numerology">Numerology</option>
              <option value="Vastu Shastra">Vastu Shastra</option>
              <option value="Rashifal">Rashifal</option>
              <option value="Seva Stories">Seva Stories</option>
              <option value="Spirituality">Spirituality</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl text-sm border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:border-navy-900"
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        {/* ── Status Messages ───────────────────────────────────── */}
        {loading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 animate-pulse">
            Loading articles from database…
          </div>
        )}

        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center text-rose-700 text-sm mb-6">
            {error}
          </div>
        )}

        {/* ── Empty State ───────────────────────────────────────── */}
        {!loading && !error && filteredBlogs.length === 0 && (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-14 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <LogoIcon className="w-7 h-7" color="#94A3B8" />
            </div>
            <h3 className="font-display text-lg font-bold text-slate-900 mb-1">
              {blogs.length === 0 ? 'No articles published yet' : 'No articles match your filters'}
            </h3>
            <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
              {blogs.length === 0
                ? 'Begin sharing Vedic insights and Seva Stories by writing your first article.'
                : 'Try adjusting your search keywords or resetting the category and status filters.'}
            </p>
            <Link
              to="/admin/editor/new"
              className="inline-flex items-center gap-2 bg-[#0B192C] text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-900 transition-colors"
            >
              <PlusIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Write First Article</span>
            </Link>
          </div>
        )}

        {/* ── Articles Table ────────────────────────────────────── */}
        {!loading && !error && filteredBlogs.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Title &amp; Excerpt</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Comments</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBlogs.map((blog) => {
                    const badgeClass =
                      categoryBadgeStyles[blog.category] || 'bg-slate-100 text-slate-700 border-slate-200';

                    return (
                      <tr key={blog._id} className="hover:bg-slate-50/70 transition-colors group">
                        
                        {/* Title & Excerpt */}
                        <td className="px-6 py-4 max-w-md">
                          <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {blog.title}
                          </p>
                          {blog.excerpt && (
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                              {blog.excerpt}
                            </p>
                          )}
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeClass}`}
                          >
                            {blog.category || 'General'}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                          {formatDate(blog.createdAt)}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                              blog.published
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                blog.published ? 'bg-emerald-500' : 'bg-slate-400'
                              }`}
                            />
                            {blog.published ? 'Published' : 'Draft'}
                          </span>
                        </td>

                        {/* Comment Count Column */}
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => setExpandedComments(expandedComments === blog._id ? null : blog._id)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors ${
                              expandedComments === blog._id
                                ? 'bg-navy-900 bg-[#0B192C] text-white border-[#0B192C]'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                            title="Manage comments"
                          >
                            <MessageSquareIcon className="w-3 h-3" />
                            <span>{(blog.comments || []).length}</span>
                            <ChevronDownIcon
                              className={`w-3 h-3 transition-transform ${expandedComments === blog._id ? 'rotate-180' : ''}`}
                            />
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2">
                            <Link
                              to={`/admin/editor/${blog._id}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                            >
                              <EditIcon className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </Link>

                            <button
                              onClick={() => setDeleteModal({ open: true, id: blog._id, title: blog.title })}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                            >
                              <TrashIcon className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* ── Expandable Comments Panel ── */}
                      {expandedComments === blog._id && (
                        <tr key={`comments-${blog._id}`}>
                          <td colSpan={6} className="px-6 pb-5">
                            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                                  <MessageSquareIcon className="w-3.5 h-3.5" />
                                  Comments on &ldquo;{blog.title}&rdquo;
                                </h4>
                                <span className="text-xs text-slate-400">{(blog.comments || []).length} total</span>
                              </div>

                              {(blog.comments || []).length === 0 ? (
                                <p className="text-xs text-slate-400 italic py-2">No comments on this post yet.</p>
                              ) : (
                                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                                  {(blog.comments || []).map((comment) => (
                                    <div
                                      key={comment._id}
                                      className="flex items-start justify-between gap-3 bg-white rounded-xl border border-slate-200 p-3"
                                    >
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="text-xs font-semibold text-slate-800">{comment.name}</span>
                                          {comment.email && (
                                            <span className="text-xs text-slate-400">{comment.email}</span>
                                          )}
                                          <span className="text-xs text-slate-400 ml-auto shrink-0">
                                            {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                          </span>
                                        </div>
                                        <p className="text-xs text-slate-600 line-clamp-2">{comment.content}</p>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteComment(blog._id, comment._id)}
                                        disabled={deletingComment === comment._id}
                                        className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors disabled:opacity-40"
                                        title="Delete this comment"
                                      >
                                        <TrashIcon className="w-3 h-3" />
                                        <span>{deletingComment === comment._id ? '…' : 'Delete'}</span>
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
              <span>Showing {filteredBlogs.length} of {blogs.length} articles</span>
              <span>Astro Vastu Pragati Content Manager</span>
            </div>
          </div>
        )}
      </main>

      {/* ── Delete Confirmation Modal ─────────────────────────── */}
      {deleteModal.open && (
        <div className="modal-backdrop">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-navy-lg border border-slate-200 animate-slide-up">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <TrashIcon className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
              Delete Article?
            </h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Are you sure you want to permanently delete <strong>&ldquo;{deleteModal.title}&rdquo;</strong>?
              This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteModal({ open: false, id: null, title: '' })}
                disabled={deleting}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-sm disabled:opacity-50"
              >
                {deleting ? 'Deleting…' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
