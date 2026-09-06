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
  CalendarIcon,
  PhoneIcon,
  MailIcon,
  RefreshIcon,
  ClockIcon,
  CheckIcon,
} from '../../components/Icons';

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const categoryBadgeStyles = {
  Astrology: 'bg-amber-50 text-amber-800 border-amber-200',
  Numerology: 'bg-blue-50 text-blue-800 border-blue-200',
  'Vastu Shastra': 'bg-emerald-50 text-emerald-800 border-emerald-200',
  Rashifal: 'bg-rose-50 text-rose-800 border-rose-200',
  'Seva Stories': 'bg-purple-50 text-purple-800 border-purple-200',
  Spirituality: 'bg-indigo-50 text-indigo-800 border-indigo-200',
};

const serviceBadgeStyles = {
  'Kundali Analysis': 'bg-amber-50 text-amber-900 border-amber-200',
  'Complete Life Guidance': 'bg-purple-50 text-purple-900 border-purple-200',
  'Numerology Reading': 'bg-blue-50 text-blue-900 border-blue-200',
  'Vastu Shastra Consultation': 'bg-emerald-50 text-emerald-900 border-emerald-200',
};

const statusStyles = {
  Pending: {
    bg: 'bg-amber-50 text-amber-800 border-amber-300',
    dot: 'bg-amber-500',
  },
  Confirmed: {
    bg: 'bg-blue-50 text-blue-800 border-blue-300',
    dot: 'bg-blue-500',
  },
  Completed: {
    bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    dot: 'bg-emerald-500',
  },
  Cancelled: {
    bg: 'bg-rose-50 text-rose-800 border-rose-300',
    dot: 'bg-rose-500',
  },
};

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  // Active Tab: 'articles' | 'consultations'
  const [activeTab, setActiveTab] = useState('articles');

  // ── Blogs State ──────────────────────────────────────────────
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [blogError, setBlogError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, title: '' });
  const [deleting, setDeleting] = useState(false);
  const [expandedComments, setExpandedComments] = useState(null);
  const [deletingComment, setDeletingComment] = useState(null);

  // ── Consultations State ──────────────────────────────────────
  const [consultations, setConsultations] = useState([]);
  const [loadingConsultations, setLoadingConsultations] = useState(true);
  const [consultationError, setConsultationError] = useState('');
  const [consultationSearch, setConsultationSearch] = useState('');
  const [consultationStatusFilter, setConsultationStatusFilter] = useState('All');
  const [consultationServiceFilter, setConsultationServiceFilter] = useState('All');
  const [deleteConsultationModal, setDeleteConsultationModal] = useState({ open: false, id: null, name: '' });
  const [deletingConsultation, setDeletingConsultation] = useState(false);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  // Load articles
  const loadBlogs = () => {
    setLoadingBlogs(true);
    setBlogError('');
    api
      .get('/blogs/admin/all')
      .then((res) => setBlogs(res.data))
      .catch(() => setBlogError('Could not load blog posts. Please check server status.'))
      .finally(() => setLoadingBlogs(false));
  };

  // Load consultations
  const loadConsultations = () => {
    setLoadingConsultations(true);
    setConsultationError('');
    api
      .get('/consultations')
      .then((res) => setConsultations(res.data))
      .catch(() => setConsultationError('Could not load consultation bookings. Please check server status.'))
      .finally(() => setLoadingConsultations(false));
  };

  useEffect(() => {
    loadBlogs();
    loadConsultations();
  }, []);

  // Delete article
  const confirmDeleteBlog = async () => {
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

  // Delete comment
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

  // Update consultation status
  const handleStatusChange = async (consultationId, newStatus) => {
    setUpdatingStatusId(consultationId);
    try {
      const res = await api.put(`/consultations/${consultationId}`, { status: newStatus });
      setConsultations((prev) =>
        prev.map((c) => (c._id === consultationId ? res.data : c))
      );
    } catch {
      alert('Failed to update consultation status. Please try again.');
    } finally {
      setUpdatingStatusId(null);
    }
  };

  // Delete consultation
  const confirmDeleteConsultation = async () => {
    if (!deleteConsultationModal.id) return;
    setDeletingConsultation(true);
    try {
      await api.delete(`/consultations/${deleteConsultationModal.id}`);
      setConsultations((prev) => prev.filter((c) => c._id !== deleteConsultationModal.id));
      setDeleteConsultationModal({ open: false, id: null, name: '' });
    } catch {
      alert('Could not delete this consultation request. Please try again.');
    } finally {
      setDeletingConsultation(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Blog Stats
  const blogStats = useMemo(() => {
    const total = blogs.length;
    const published = blogs.filter((b) => b.published).length;
    const drafts = total - published;
    const categoriesSet = new Set(blogs.map((b) => b.category).filter(Boolean));
    return { total, published, drafts, categoriesCount: categoriesSet.size };
  }, [blogs]);

  // Consultation Stats
  const consultationStats = useMemo(() => {
    const total = consultations.length;
    const pending = consultations.filter((c) => c.status === 'Pending').length;
    const confirmed = consultations.filter((c) => c.status === 'Confirmed').length;
    const completed = consultations.filter((c) => c.status === 'Completed').length;
    const cancelled = consultations.filter((c) => c.status === 'Cancelled').length;
    return { total, pending, confirmed, completed, cancelled };
  }, [consultations]);

  // Filtered Blogs
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

  // Filtered Consultations
  const filteredConsultations = useMemo(() => {
    return consultations.filter((item) => {
      const matchSearch =
        !consultationSearch.trim() ||
        item.name?.toLowerCase().includes(consultationSearch.toLowerCase()) ||
        item.email?.toLowerCase().includes(consultationSearch.toLowerCase()) ||
        item.phone?.toLowerCase().includes(consultationSearch.toLowerCase()) ||
        item.message?.toLowerCase().includes(consultationSearch.toLowerCase());

      const matchStatus =
        consultationStatusFilter === 'All' || item.status === consultationStatusFilter;
      const matchService =
        consultationServiceFilter === 'All' || item.service === consultationServiceFilter;

      return matchSearch && matchStatus && matchService;
    });
  }, [consultations, consultationSearch, consultationStatusFilter, consultationServiceFilter]);

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

        {/* ── Top Tabs Navigation ──────────────────────────────── */}
        <div className="flex items-center gap-4 border-b border-slate-200 mb-8 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveTab('articles')}
            className={`inline-flex items-center gap-2.5 pb-3.5 px-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'articles'
                ? 'border-navy-900 text-navy-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Articles & Posts</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                activeTab === 'articles' ? 'bg-[#0B192C] text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {blogs.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('consultations')}
            className={`inline-flex items-center gap-2.5 pb-3.5 px-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'consultations'
                ? 'border-navy-900 text-navy-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CalendarIcon className="w-4 h-4 text-amber-500" />
            <span>Consultation Bookings</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-bold transition-transform ${
                consultationStats.pending > 0
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : activeTab === 'consultations'
                  ? 'bg-[#0B192C] text-white'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {consultations.length}
              {consultationStats.pending > 0 && ` (${consultationStats.pending} pending)`}
            </span>
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* ── TAB 1: ARTICLES MANAGEMENT ────────────────────────── */}
        {/* ═══════════════════════════════════════════════════════ */}
        {activeTab === 'articles' && (
          <div className="animate-fade-in">
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

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Total Posts</p>
                <p className="font-display text-2xl sm:text-3xl font-bold text-slate-900">{blogStats.total}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">Published</p>
                <p className="font-display text-2xl sm:text-3xl font-bold text-emerald-700">{blogStats.published}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">Drafts</p>
                <p className="font-display text-2xl sm:text-3xl font-bold text-amber-700">{blogStats.drafts}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Active Disciplines</p>
                <p className="font-display text-2xl sm:text-3xl font-bold text-blue-700">{blogStats.categoriesCount}</p>
              </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
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

            {/* Loading / Error States */}
            {loadingBlogs && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 animate-pulse">
                Loading articles from database…
              </div>
            )}

            {blogError && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center text-rose-700 text-sm mb-6">
                {blogError}
              </div>
            )}

            {/* Empty State */}
            {!loadingBlogs && !blogError && filteredBlogs.length === 0 && (
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

            {/* Articles Table */}
            {!loadingBlogs && !blogError && filteredBlogs.length > 0 && (
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
                          <React.Fragment key={blog._id}>
                            <tr className="hover:bg-slate-50/70 transition-colors group">
                              <td className="px-6 py-4 max-w-md">
                                <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                  {blog.title}
                                </p>
                                {blog.excerpt && (
                                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{blog.excerpt}</p>
                                )}
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeClass}`}>
                                  {blog.category || 'General'}
                                </span>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                                {formatDate(blog.createdAt)}
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${blog.published ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${blog.published ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                                  {blog.published ? 'Published' : 'Draft'}
                                </span>
                              </td>

                              <td className="px-6 py-4 text-center whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => setExpandedComments(expandedComments === blog._id ? null : blog._id)}
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors ${expandedComments === blog._id ? 'bg-[#0B192C] text-white border-[#0B192C]' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                                  title="Manage comments"
                                >
                                  <MessageSquareIcon className="w-3 h-3" />
                                  <span>{(blog.comments || []).length}</span>
                                  <ChevronDownIcon className={`w-3 h-3 transition-transform ${expandedComments === blog._id ? 'rotate-180' : ''}`} />
                                </button>
                              </td>

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

                            {/* Expandable Comments Panel */}
                            {expandedComments === blog._id && (
                              <tr>
                                <td colSpan={6} className="px-6 pb-5 bg-slate-50/50">
                                  <div className="bg-white rounded-2xl border border-slate-200 p-4 mt-1 shadow-sm">
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
                                          <div key={comment._id} className="flex items-start justify-between gap-3 bg-slate-50 rounded-xl border border-slate-200 p-3">
                                            <div className="flex-1 min-w-0">
                                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                <span className="text-xs font-semibold text-slate-800">{comment.name}</span>
                                                {comment.email && <span className="text-xs text-slate-400">{comment.email}</span>}
                                                <span className="text-xs text-slate-400 ml-auto shrink-0">
                                                  {formatDate(comment.createdAt)}
                                                </span>
                                              </div>
                                              <p className="text-xs text-slate-600 line-clamp-2">{comment.content}</p>
                                            </div>
                                            <button
                                              type="button"
                                              onClick={() => handleDeleteComment(blog._id, comment._id)}
                                              disabled={deletingComment === comment._id}
                                              className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors disabled:opacity-40"
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
                          </React.Fragment>
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
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════ */}
        {/* ── TAB 2: CONSULTATION BOOKINGS MANAGEMENT ───────────── */}
        {/* ═══════════════════════════════════════════════════════ */}
        {activeTab === 'consultations' && (
          <div className="animate-fade-in">
            {/* Header with Title & Refresh CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Consultation Bookings
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Manage personal astrology, vastu, and numerology sessions requested by seekers.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={loadConsultations}
                  disabled={loadingConsultations}
                  className="inline-flex items-center gap-2 bg-white text-slate-700 hover:text-slate-900 border border-slate-200 text-sm font-semibold rounded-xl px-4 py-2.5 shadow-sm transition-all hover:bg-slate-50 disabled:opacity-50"
                  title="Reload consultation requests"
                >
                  <RefreshIcon className={`w-4 h-4 ${loadingConsultations ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>

                <Link
                  to="/book-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0B192C] text-white hover:bg-blue-900 text-sm font-semibold rounded-xl px-4 py-2.5 shadow-sm transition-all"
                >
                  <CalendarIcon className="w-4 h-4 text-amber-400" />
                  <span>Open Booking Form</span>
                </Link>
              </div>
            </div>

            {/* Consultation Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Total Bookings</p>
                <p className="font-display text-2xl sm:text-3xl font-bold text-slate-900">{consultationStats.total}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">Pending Approval</p>
                <div className="flex items-center gap-2">
                  <p className="font-display text-2xl sm:text-3xl font-bold text-amber-600">{consultationStats.pending}</p>
                  {consultationStats.pending > 0 && (
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                  )}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Confirmed</p>
                <p className="font-display text-2xl sm:text-3xl font-bold text-blue-700">{consultationStats.confirmed}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">Completed</p>
                <p className="font-display text-2xl sm:text-3xl font-bold text-emerald-700">{consultationStats.completed}</p>
              </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <SearchIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search by seeker name, email, phone or query note…"
                  value={consultationSearch}
                  onChange={(e) => setConsultationSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl text-sm border border-slate-200 focus:outline-none focus:border-navy-900 focus:ring-1 focus:ring-navy-900 bg-slate-50"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={consultationServiceFilter}
                  onChange={(e) => setConsultationServiceFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl text-sm border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:border-navy-900"
                >
                  <option value="All">All Services</option>
                  <option value="Kundali Analysis">Kundali Analysis</option>
                  <option value="Complete Life Guidance">Complete Life Guidance</option>
                  <option value="Numerology Reading">Numerology Reading</option>
                  <option value="Vastu Shastra Consultation">Vastu Shastra Consultation</option>
                </select>

                <select
                  value={consultationStatusFilter}
                  onChange={(e) => setConsultationStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl text-sm border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:border-navy-900"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Loading / Error States */}
            {loadingConsultations && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 animate-pulse">
                Loading consultation bookings from database…
              </div>
            )}

            {consultationError && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center text-rose-700 text-sm mb-6">
                {consultationError}
              </div>
            )}

            {/* Empty State */}
            {!loadingConsultations && !consultationError && filteredConsultations.length === 0 && (
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-14 text-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon className="w-7 h-7" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-1">
                  {consultations.length === 0 ? 'No consultation requests yet' : 'No bookings match your filters'}
                </h3>
                <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
                  {consultations.length === 0
                    ? 'When seekers schedule a session on the Book Consultation page, their details and time slots will appear here.'
                    : 'Try resetting your keyword search or adjusting the service and status filters.'}
                </p>
                {consultations.length === 0 && (
                  <Link
                    to="/book-consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#0B192C] text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-900 transition-colors"
                  >
                    <span>View Public Booking Page</span>
                  </Link>
                )}
              </div>
            )}

            {/* Consultations Table */}
            {!loadingConsultations && !consultationError && filteredConsultations.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="px-6 py-4">Seeker Info</th>
                        <th className="px-6 py-4">Service</th>
                        <th className="px-6 py-4">Requested Slot</th>
                        <th className="px-6 py-4">Query / Details</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Booked On</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredConsultations.map((item) => {
                        const svcBadge = serviceBadgeStyles[item.service] || 'bg-slate-100 text-slate-800 border-slate-200';
                        const currentStatus = statusStyles[item.status] || statusStyles.Pending;
                        const isMessageExpanded = expandedMessageId === item._id;

                        return (
                          <tr key={item._id} className="hover:bg-slate-50/70 transition-colors">
                            
                            {/* Seeker Info */}
                            <td className="px-6 py-4">
                              <p className="font-semibold text-slate-900">{item.name}</p>
                              <div className="flex flex-col gap-0.5 mt-1">
                                {item.email && (
                                  <a
                                    href={`mailto:${item.email}`}
                                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors"
                                  >
                                    <MailIcon className="w-3 h-3 text-slate-400" />
                                    <span>{item.email}</span>
                                  </a>
                                )}
                                {item.phone && (
                                  <a
                                    href={`tel:${item.phone}`}
                                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-amber-600 transition-colors"
                                  >
                                    <PhoneIcon className="w-3 h-3 text-amber-500" />
                                    <span>{item.phone}</span>
                                  </a>
                                )}
                              </div>
                            </td>

                            {/* Service */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${svcBadge}`}>
                                {item.service}
                              </span>
                            </td>

                            {/* Preferred Slot */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                                <CalendarIcon className="w-3.5 h-3.5 text-amber-500" />
                                <span>{item.date}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                <ClockIcon className="w-3.5 h-3.5 text-slate-400" />
                                <span>{item.time}</span>
                              </div>
                            </td>

                            {/* Query / Message */}
                            <td className="px-6 py-4 max-w-xs">
                              {item.message ? (
                                <div>
                                  <p className={`text-xs text-slate-600 leading-relaxed ${isMessageExpanded ? '' : 'line-clamp-2'}`}>
                                    {item.message}
                                  </p>
                                  {item.message.length > 80 && (
                                    <button
                                      type="button"
                                      onClick={() => setExpandedMessageId(isMessageExpanded ? null : item._id)}
                                      className="text-[11px] font-semibold text-blue-600 hover:underline mt-0.5"
                                    >
                                      {isMessageExpanded ? 'Show less' : 'Read full query'}
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <span className="text-xs text-slate-400 italic">No notes provided</span>
                              )}
                            </td>

                            {/* Status Selector Dropdown */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="relative inline-block">
                                <select
                                  value={item.status}
                                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                                  disabled={updatingStatusId === item._id}
                                  className={`text-xs font-semibold rounded-xl px-2.5 py-1.5 border appearance-none pr-7 cursor-pointer focus:outline-none transition-colors ${currentStatus.bg} disabled:opacity-50`}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                                <ChevronDownIcon className="w-3 h-3 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                              {updatingStatusId === item._id && (
                                <p className="text-[10px] text-slate-400 mt-0.5 animate-pulse">Saving…</p>
                              )}
                            </td>

                            {/* Booked Date */}
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                              {formatDate(item.createdAt)}
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4 text-right whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => setDeleteConsultationModal({ open: true, id: item._id, name: item.name })}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                                title="Delete consultation request"
                              >
                                <TrashIcon className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </td>

                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                  <span>Showing {filteredConsultations.length} of {consultations.length} bookings</span>
                  <span>Astro Vastu Pragati Appointments</span>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* ── Delete Blog Confirmation Modal ────────────────────── */}
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
                onClick={confirmDeleteBlog}
                disabled={deleting}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-sm disabled:opacity-50"
              >
                {deleting ? 'Deleting…' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Consultation Confirmation Modal ────────────── */}
      {deleteConsultationModal.open && (
        <div className="modal-backdrop">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-navy-lg border border-slate-200 animate-slide-up">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <TrashIcon className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
              Delete Consultation Request?
            </h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Are you sure you want to remove the consultation booking requested by{' '}
              <strong>{deleteConsultationModal.name}</strong>? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConsultationModal({ open: false, id: null, name: '' })}
                disabled={deletingConsultation}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteConsultation}
                disabled={deletingConsultation}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-sm disabled:opacity-50"
              >
                {deletingConsultation ? 'Deleting…' : 'Delete Booking'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
