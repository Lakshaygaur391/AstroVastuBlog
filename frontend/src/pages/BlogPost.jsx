import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useUserAuth } from '../context/UserAuthContext';
import {
  CalendarIcon,
  LogoIcon,
  HeartIcon,
  MessageSquareIcon,
  TrashIcon,
  CheckIcon,
} from '../components/Icons';

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

const formatCommentDate = (dateStr) => {
  if (!dateStr) return 'Recently';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
};

const BlogPost = () => {
  const { slug } = useParams();
  const { admin } = useAuth();
  const { user } = useUserAuth();

  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [status, setStatus] = useState('loading');

  // Like state
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // Comments state
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    content: '',
    honeypot: '',
  });
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    setStatus('loading');
    api
      .get(`/blogs/${slug}`)
      .then((res) => {
        const b = res.data.blog;
        setBlog(b);
        setLikesCount(b.likes || 0);
        setComments(b.comments || []);
        setRelated(res.data.relatedBlogs || []);
        setStatus('ready');

        // Check if user already liked in localStorage
        try {
          const savedLikes = JSON.parse(localStorage.getItem('astro_liked_posts') || '[]');
          if (savedLikes.includes(b._id)) {
            setLiked(true);
          }
        } catch {
          // ignore
        }
      })
      .catch(() => setStatus('error'));
    window.scrollTo(0, 0);
  }, [slug]);

  // Pre-fill user details if logged in
  useEffect(() => {
    if (user) {
      setCommentForm((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  // Handle Like Click
  const handleLike = async () => {
    if (!blog) return;
    const newLiked = !liked;
    const newCount = newLiked ? likesCount + 1 : Math.max(0, likesCount - 1);
    setLiked(newLiked);
    setLikesCount(newCount);

    try {
      const savedLikes = JSON.parse(localStorage.getItem('astro_liked_posts') || '[]');
      let updatedLikes;
      if (newLiked) {
        updatedLikes = [...new Set([...savedLikes, blog._id])];
      } else {
        updatedLikes = savedLikes.filter((id) => id !== blog._id);
      }
      localStorage.setItem('astro_liked_posts', JSON.stringify(updatedLikes));

      await api.post(`/blogs/${blog._id}/like`, { action: newLiked ? 'like' : 'unlike' });
    } catch {
      // ignore network errors
    }
  };

  // Handle Comment Submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentError('');
    setCommentSuccess(false);

    if (!commentForm.name.trim() || !commentForm.content.trim()) {
      setCommentError('Please enter your name and comment.');
      return;
    }

    setSubmittingComment(true);
    try {
      const res = await api.post(`/blogs/${blog._id}/comments`, commentForm);
      if (res.data.comments) {
        setComments(res.data.comments);
      } else if (res.data.newComment) {
        setComments((prev) => [res.data.newComment, ...prev]);
      }
      setCommentForm((prev) => ({ ...prev, content: '' }));
      setCommentSuccess(true);
      setTimeout(() => setCommentSuccess(false), 5000);
    } catch (err) {
      setCommentError(err.response?.data?.message || 'Failed to post comment. Please try again.');
    } finally {
      setSubmittingComment(false);
    }
  };

  // Admin delete comment moderation
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await api.delete(`/blogs/${blog._id}/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch {
      alert('Could not delete comment.');
    }
  };

  if (status === 'loading') {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-6 rounded-lg bg-slate-200 animate-pulse mb-4" style={{ width: `${90 - i * 15}%` }} />
        ))}
      </div>
    );
  }

  if (status === 'error' || !blog) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
          <LogoIcon className="w-7 h-7" />
        </div>
        <p className="font-display text-2xl font-bold text-slate-900 mb-2">Article Not Found</p>
        <p className="text-sm text-slate-500 mb-6">This article may have been moved or removed.</p>
        <Link to="/" className="btn-primary inline-flex text-xs">
          &larr; Return to All Articles
        </Link>
      </div>
    );
  }

  const youtubeEmbed = getYouTubeEmbedUrl(blog.videoUrl);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-body">
      
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="bg-[#0B192C] text-white py-14 border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white mb-6 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Back to all articles</span>
          </Link>

          {/* Category + date */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            {blog.category && (
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-amber-300 border border-amber-400/30">
                {blog.category}
              </span>
            )}
            <span className="text-xs text-slate-400">•</span>
            <time className="text-xs text-slate-300">{formatDate(blog.createdAt)}</time>
            {blog.author && (
              <>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-300">By {blog.author}</span>
              </>
            )}
            {blog.videoUrl && (
              <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-400 text-slate-950">
                <span>▶ Video Included</span>
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white tracking-tight">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
              {blog.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* ── Featured Video or Cover Image ───────────────────────── */}
      {blog.videoUrl ? (
        <div className="max-w-3xl mx-auto px-6 -mt-6">
          <div className="rounded-2xl overflow-hidden shadow-navy-md border border-slate-200 bg-black aspect-video max-h-[460px]">
            {youtubeEmbed ? (
              <iframe
                src={youtubeEmbed}
                title={blog.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={blog.videoUrl}
                controls
                playsInline
                poster={blog.coverImage || undefined}
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      ) : blog.coverImage ? (
        <div className="max-w-3xl mx-auto px-6 -mt-6">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full rounded-2xl shadow-navy-md border border-slate-200 object-cover max-h-[420px]"
          />
        </div>
      ) : null}

      {/* ── Article Body ────────────────────────────────────────── */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        <div
          className="prose prose-lg prose-slate prose-headings:font-display prose-headings:text-slate-900 prose-a:text-blue-600 max-w-none bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-200">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Like Action Bar ───────────────────────────────────── */}
        <div className="mt-8 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleLike}
              className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 ${
                liked
                  ? 'bg-rose-600 text-white shadow-rose-200'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
              }`}
            >
              <HeartIcon className="w-5 h-5" filled={liked} color={liked ? '#FFFFFF' : '#E11D48'} />
              <span>{liked ? 'Liked' : 'Like Post'}</span>
              {!blog.hideLikes && (
                <span className="px-2 py-0.5 rounded-full text-xs bg-black/10">
                  {likesCount}
                </span>
              )}
            </button>
            {!blog.hideLikes && (
              <p className="text-xs text-slate-500 hidden sm:block">
                {likesCount === 0
                  ? 'Be the first to appreciate this article'
                  : `${likesCount} reader${likesCount > 1 ? 's' : ''} found this valuable`}
              </p>
            )}
          </div>

          <a
            href="#comments"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-navy-900 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 transition-colors"
          >
            <MessageSquareIcon className="w-4 h-4" />
            <span>{comments.length} Comments</span>
          </a>
        </div>

        {/* Consultation Callout */}
        <div className="mt-6 p-6 rounded-3xl bg-[#0B192C] text-white shadow-navy-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-white">Seeking Guidance in this Area?</p>
            <p className="text-xs text-slate-300 mt-0.5">
              Consult directly with Acharya Pragati for personalized birth chart readings and remedies.
            </p>
          </div>
          <Link
            to="/book-consultation"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-semibold text-xs hover:bg-amber-300 transition-colors shrink-0 shadow-sm"
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Book Consultation</span>
          </Link>
        </div>

        {/* ── Comments Section ──────────────────────────────────── */}
        <section id="comments" className="mt-14 pt-10 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2.5">
              <MessageSquareIcon className="w-6 h-6 text-navy-900" />
              <span>Comments &amp; Reflections</span>
              <span className="text-sm font-normal text-slate-500">
                ({comments.length})
              </span>
            </h2>
          </div>

          {/* Comment Form (Free / Guest Friendly) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-10">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Leave a Comment or Question
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              No account required. Share your reflections, questions, or prayers respectfully.
            </p>

            {commentSuccess && (
              <div className="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <CheckIcon className="w-4 h-4 text-emerald-600" />
                <span>Thank you! Your comment has been posted.</span>
              </div>
            )}

            {commentError && (
              <div className="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {commentError}
              </div>
            )}

            <form onSubmit={handleCommentSubmit} className="space-y-4">
              {/* Invisible Honeypot field to trap bots */}
              <input
                type="text"
                name="honeypot"
                value={commentForm.honeypot}
                onChange={(e) => setCommentForm((prev) => ({ ...prev, honeypot: e.target.value }))}
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label" htmlFor="comment-name">
                    Your Name *
                  </label>
                  <input
                    id="comment-name"
                    type="text"
                    required
                    maxLength={60}
                    placeholder="e.g. Ramesh Kumar"
                    value={commentForm.name}
                    onChange={(e) => setCommentForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label" htmlFor="comment-email">
                    Email Address <span className="text-[11px] font-normal text-slate-400">(Private &mdash; won't be shown)</span>
                  </label>
                  <input
                    id="comment-email"
                    type="email"
                    maxLength={100}
                    placeholder="you@example.com"
                    value={commentForm.email}
                    onChange={(e) => setCommentForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="form-label" htmlFor="comment-content">
                  Your Comment *
                </label>
                <textarea
                  id="comment-content"
                  required
                  rows={4}
                  maxLength={1000}
                  placeholder="Write your thoughts, questions or reflections here…"
                  value={commentForm.content}
                  onChange={(e) => setCommentForm((prev) => ({ ...prev, content: e.target.value }))}
                  className="form-input text-sm"
                  style={{ resize: 'vertical' }}
                />
                <p className="text-[11px] text-right text-slate-400 mt-1">
                  {commentForm.content.length}/1000 characters
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <p className="text-[11px] text-slate-400">
                  {user ? `Posting as ${user.name}` : 'Posting as Guest'}
                </p>
                <button
                  type="submit"
                  disabled={submittingComment}
                  className="btn-primary py-2.5 px-6 text-xs font-semibold disabled:opacity-60 shadow-sm"
                >
                  {submittingComment ? 'Posting…' : 'Post Comment'}
                </button>
              </div>
            </form>
          </div>

          {/* Comments List */}
          {comments.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
                <MessageSquareIcon className="w-6 h-6" />
              </div>
              <p className="font-display text-base font-bold text-slate-800">
                No comments yet
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Be the first to share your reflections on this post!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((c) => {
                const initial = (c.name || 'G')[0].toUpperCase();

                return (
                  <div
                    key={c._id || c.createdAt}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0B192C] to-[#1E3E62] text-amber-400 font-bold text-sm flex items-center justify-center shadow-sm">
                          {initial}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 leading-tight">
                            {c.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {formatCommentDate(c.createdAt)}
                          </p>
                        </div>
                      </div>

                      {/* Admin Delete Action */}
                      {admin && (
                        <button
                          type="button"
                          onClick={() => handleDeleteComment(c._id)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors text-xs inline-flex items-center gap-1"
                          title="Delete spam comment"
                        >
                          <TrashIcon className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Delete</span>
                        </button>
                      )}
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed pl-12 whitespace-pre-line">
                      {c.content}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </article>

      {/* ── Related Posts ────────────────────────────────────────── */}
      {related.length > 0 && (
        <div className="max-w-3xl mx-auto px-6 pt-4">
          <div className="border-t border-slate-200 pt-8">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-4">
              More in {blog.category}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r._id}
                  to={`/blog/${r.slug}`}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-navy transition-all group flex flex-col justify-between"
                >
                  <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {r.title}
                  </p>
                  <span className="text-xs text-navy-900 font-semibold mt-3 group-hover:underline">
                    Read article &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
