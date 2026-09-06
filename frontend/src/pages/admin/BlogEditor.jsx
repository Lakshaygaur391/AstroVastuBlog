import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '../../api/axios';
import { LogoIcon, CheckIcon, TrashIcon } from '../../components/Icons';

const standardCategories = [
  'Astrology',
  'Numerology',
  'Vastu Shastra',
  'Rashifal',
  'Seva Stories',
  'Spirituality',
];

const emptyForm = {
  title: '',
  excerpt: '',
  content: '',
  coverImage: '',
  videoUrl: '',
  category: 'Astrology',
  tags: '',
  published: true,
};

const quillModules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'link'],
    ['clean'],
  ],
};

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
};

const BlogEditor = () => {
  const { id } = useParams();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Media upload states
  const [imageUploading, setImageUploading] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoInputMode, setVideoInputMode] = useState('upload'); // 'upload' | 'url'

  useEffect(() => {
    if (isNew) return;
    api
      .get(`/blogs/admin/${id}`)
      .then((res) => {
        const b = res.data;
        const cat = b.category || 'Astrology';
        const isCustom = !standardCategories.includes(cat);
        setIsCustomCategory(isCustom);
        if (isCustom) setCustomCategory(cat);

        setForm({
          title: b.title || '',
          excerpt: b.excerpt || '',
          content: b.content || '',
          coverImage: b.coverImage || '',
          videoUrl: b.videoUrl || '',
          category: cat,
          tags: (b.tags || []).join(', '),
          published: b.published !== undefined ? b.published : true,
        });

        if (b.videoUrl && (b.videoUrl.includes('youtube.com') || b.videoUrl.includes('youtu.be'))) {
          setVideoInputMode('url');
        }
      })
      .catch(() => setError('Could not load this post.'))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const handleChange = (field) => (e) => {
    const value = field === 'published' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCategorySelect = (e) => {
    const val = e.target.value;
    if (val === '__custom__') {
      setIsCustomCategory(true);
      setForm((prev) => ({ ...prev, category: customCategory || '' }));
    } else {
      setIsCustomCategory(false);
      setForm((prev) => ({ ...prev, category: val }));
    }
  };

  // Image Upload to Cloudinary
  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await api.post('/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setForm((prev) => ({ ...prev, coverImage: res.data.url }));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to upload image. Please ensure Cloudinary credentials are set in backend/.env'
      );
    } finally {
      setImageUploading(false);
    }
  };

  // Video Upload to Cloudinary
  const handleVideoFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await api.post('/upload/video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setForm((prev) => ({ ...prev, videoUrl: res.data.url }));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to upload video. Please ensure Cloudinary credentials are set in backend/.env'
      );
    } finally {
      setVideoUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const finalCategory = isCustomCategory ? customCategory.trim() : form.category;

    if (!form.title.trim() || !form.excerpt.trim() || !form.content.trim() || form.content === '<p><br></p>') {
      setError('Title, summary excerpt, and content are required.');
      return;
    }

    if (!finalCategory) {
      setError('Please select or specify a category.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        category: finalCategory,
      };

      if (isNew) {
        await api.post('/blogs', payload);
      } else {
        await api.put(`/blogs/${id}`, payload);
      }
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save this post.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-body text-slate-500">
        Loading post editor…
      </div>
    );
  }

  const youtubeEmbed = getYouTubeEmbedUrl(form.videoUrl);

  return (
    <div className="min-h-screen bg-slate-50 font-body text-slate-900 pb-20">
      
      {/* ── Top Header ────────────────────────────────────────── */}
      <header className="bg-[#0B192C] text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-5xl mx-auto px-6 h-18 flex items-center justify-between py-3">
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <span>&larr; Back to Dashboard</span>
          </Link>
          
          <p className="font-display text-base font-bold text-white">
            {isNew ? 'New Article' : 'Edit Article'}
          </p>
        </div>
      </header>

      {/* ── Main Form ─────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-12">
          
          <div className="mb-8 pb-6 border-b border-slate-100">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              {isNew ? 'Compose New Article' : 'Edit Article Content'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Select the appropriate discipline (Astrology, Numerology, Vastu Shastra, Rashifal, Seva Stories, Spirituality) and add Cloudinary images or videos.
            </p>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title */}
            <div>
              <label className="form-label" htmlFor="post-title">
                Article Title *
              </label>
              <input
                id="post-title"
                value={form.title}
                onChange={handleChange('title')}
                className="form-input text-base font-semibold"
                placeholder="e.g. Navigating Saturn's Transit: Remedies & Astrological Insights"
                required
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="form-label" htmlFor="post-excerpt">
                Summary Excerpt * <span className="text-xs font-normal text-slate-400">(Shows on cards & previews)</span>
              </label>
              <textarea
                id="post-excerpt"
                value={form.excerpt}
                onChange={handleChange('excerpt')}
                rows={2}
                maxLength={300}
                className="form-input"
                placeholder="A concise two-sentence introduction explaining the essence of this article…"
                required
              />
            </div>

            {/* Category & Tags */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="form-label">
                  Discipline / Category *
                </label>
                <select
                  value={isCustomCategory ? '__custom__' : form.category}
                  onChange={handleCategorySelect}
                  className="form-input bg-white"
                >
                  {standardCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                  <option value="__custom__">+ Other / Custom Category</option>
                </select>

                {isCustomCategory && (
                  <input
                    type="text"
                    placeholder="Type custom category name…"
                    value={customCategory}
                    onChange={(e) => {
                      setCustomCategory(e.target.value);
                      setForm((prev) => ({ ...prev, category: e.target.value }));
                    }}
                    className="form-input mt-2"
                  />
                )}
              </div>

              <div>
                <label className="form-label" htmlFor="post-tags">
                  Tags <span className="text-xs font-normal text-slate-400">(Comma separated)</span>
                </label>
                <input
                  id="post-tags"
                  value={form.tags}
                  onChange={handleChange('tags')}
                  className="form-input"
                  placeholder="kundali, shani, karma, remedies"
                />
              </div>
            </div>

            {/* ── Cover Image (Cloudinary Upload or URL) ───────────── */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="form-label mb-2 flex items-center justify-between">
                <span>Cover Image (Cloudinary Stored)</span>
                {form.coverImage && (
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, coverImage: '' }))}
                    className="text-xs text-rose-600 hover:underline font-normal"
                  >
                    Remove Image
                  </button>
                )}
              </label>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* File Upload to Cloudinary */}
                <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#0B192C] text-white hover:bg-blue-900 transition-colors shrink-0 shadow-sm">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{imageUploading ? 'Uploading to Cloudinary…' : 'Upload Image File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    disabled={imageUploading}
                    className="hidden"
                  />
                </label>

                <span className="text-xs text-slate-400 text-center sm:text-left">or paste URL:</span>

                <input
                  id="post-image"
                  value={form.coverImage}
                  onChange={handleChange('coverImage')}
                  className="form-input text-xs"
                  placeholder="https://res.cloudinary.com/... or https://images.unsplash.com/..."
                />
              </div>

              {/* Cover image preview */}
              {form.coverImage && (
                <div className="mt-4 relative w-full h-48 rounded-xl overflow-hidden border border-slate-200 bg-white">
                  <img
                    src={form.coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <span className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/70 text-white rounded-md text-[10px] font-semibold">
                    Cover Preview
                  </span>
                </div>
              )}
            </div>

            {/* ── Video Section (Cloudinary Upload or Video URL) ───── */}
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <label className="form-label mb-0 text-navy-900">
                    Video Feature (Optional)
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Upload an MP4/WEBM video directly to Cloudinary, or paste a YouTube / Vimeo URL.
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
                  <button
                    type="button"
                    onClick={() => setVideoInputMode('upload')}
                    className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                      videoInputMode === 'upload' ? 'bg-[#0B192C] text-white' : 'text-slate-600 hover:text-navy-900'
                    }`}
                  >
                    Upload Video
                  </button>
                  <button
                    type="button"
                    onClick={() => setVideoInputMode('url')}
                    className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                      videoInputMode === 'url' ? 'bg-[#0B192C] text-white' : 'text-slate-600 hover:text-navy-900'
                    }`}
                  >
                    Paste URL
                  </button>
                </div>
              </div>

              {videoInputMode === 'upload' ? (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#0B192C] text-white hover:bg-blue-900 transition-colors shrink-0 shadow-sm">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="23 7 16 12 23 17 23 7" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{videoUploading ? 'Uploading Video to Cloudinary…' : 'Select Video File (MP4/WebM)'}</span>
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime"
                      onChange={handleVideoFileChange}
                      disabled={videoUploading}
                      className="hidden"
                    />
                  </label>

                  {form.videoUrl && (
                    <span className="text-xs text-emerald-700 font-semibold truncate">
                      ✓ Video uploaded
                    </span>
                  )}
                </div>
              ) : (
                <div>
                  <input
                    value={form.videoUrl}
                    onChange={handleChange('videoUrl')}
                    className="form-input text-xs"
                    placeholder="e.g. https://www.youtube.com/watch?v=... or https://res.cloudinary.com/.../video.mp4"
                  />
                </div>
              )}

              {/* Video Player Preview */}
              {form.videoUrl && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-700">Video Player Preview:</span>
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, videoUrl: '' }))}
                      className="text-xs text-rose-600 hover:underline"
                    >
                      Clear Video
                    </button>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-black aspect-video max-h-72">
                    {youtubeEmbed ? (
                      <iframe
                        src={youtubeEmbed}
                        title="YouTube video preview"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={form.videoUrl}
                        controls
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Rich Text Editor */}
            <div>
              <label className="form-label">
                Full Article Content *
              </label>
              <ReactQuill
                theme="snow"
                value={form.content}
                onChange={(val) => setForm((prev) => ({ ...prev, content: val }))}
                modules={quillModules}
                placeholder="Write your article here with rich formatting, headings, bullet points, and Vedic quotes…"
              />
            </div>

            {/* Published Toggle */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Publish Immediately</p>
                <p className="text-xs text-slate-500">
                  When enabled, this article will be visible to all seekers on the live site.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={handleChange('published')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={saving || imageUploading || videoUploading}
                className="btn-primary py-3 px-6 text-sm disabled:opacity-60"
              >
                {saving ? 'Saving Article…' : isNew ? 'Publish Article' : 'Save Changes'}
              </button>

              <Link
                to="/admin/dashboard"
                className="btn-secondary py-3 px-6 text-sm"
              >
                Cancel
              </Link>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
};

export default BlogEditor;
