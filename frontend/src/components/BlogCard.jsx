import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import {
  AstrologyIcon,
  NumerologyIcon,
  VastuIcon,
  RashifalIcon,
  SevaStoriesIcon,
  SpiritualityIcon,
  LogoIcon,
  VolumeXIcon,
  Volume2Icon,
  PlayIcon,
  PauseIcon,
  HeartIcon,
  MessageSquareIcon,
} from './Icons';

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

const estimateReadTime = (text) => {
  const words = text ? text.split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(words / 200));
};

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&controls=1&rel=0`
    : null;
};

const categoryMap = {
  Astrology: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    Icon: AstrologyIcon,
  },
  Numerology: {
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    border: 'border-blue-200',
    Icon: NumerologyIcon,
  },
  'Vastu Shastra': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    Icon: VastuIcon,
  },
  Rashifal: {
    bg: 'bg-rose-50',
    text: 'text-rose-800',
    border: 'border-rose-200',
    Icon: RashifalIcon,
  },
  'Seva Stories': {
    bg: 'bg-purple-50',
    text: 'text-purple-800',
    border: 'border-purple-200',
    Icon: SevaStoriesIcon,
  },
  Spirituality: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-800',
    border: 'border-indigo-200',
    Icon: SpiritualityIcon,
  },
};

const BlogCard = ({ blog }) => {
  const config = categoryMap[blog.category] || {
    bg: 'bg-slate-50',
    text: 'text-slate-700',
    border: 'border-slate-200',
    Icon: LogoIcon,
  };
  const IconComp = config.Icon;
  const readTime = estimateReadTime(blog.content || blog.excerpt);

  // Video playback & mute states (Muted by default)
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [ytPlaying, setYtPlaying] = useState(false);

  // Like states with localStorage persistence
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(blog.likes || 0);

  useEffect(() => {
    try {
      const savedLikes = JSON.parse(localStorage.getItem('astro_liked_posts') || '[]');
      if (savedLikes.includes(blog._id)) {
        setLiked(true);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [blog._id]);

  const handleLikeClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

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
      // Fallback if network drops
    }
  };

  const youtubeEmbed = getYouTubeEmbedUrl(blog.videoUrl);

  const toggleMute = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const commentCount = blog.comments?.length || 0;

  return (
    <div className="group rounded-2xl bg-white transition-all duration-300 hover:-translate-y-0.5 border border-slate-200 shadow-sm hover:shadow-navy hover:border-slate-300 overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-5 p-5">
        
        {/* ── Media / Video / Image Container ──────────────────── */}
        {blog.videoUrl ? (
          <div
            className="shrink-0 w-full sm:w-60 md:w-64 h-52 sm:h-40 rounded-xl overflow-hidden bg-black relative shadow-inner group/video flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {youtubeEmbed ? (
              ytPlaying ? (
                <iframe
                  src={youtubeEmbed}
                  title={blog.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div
                  className="w-full h-full relative cursor-pointer flex items-center justify-center bg-slate-900"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setYtPlaying(true);
                  }}
                >
                  {blog.coverImage ? (
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <IconComp className="w-10 h-10 text-amber-400 mx-auto opacity-70 mb-1" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button
                      type="button"
                      className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                      aria-label="Play video"
                    >
                      <PlayIcon className="w-5 h-5 ml-0.5" />
                    </button>
                  </div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold bg-black/70 text-white px-2 py-0.5 rounded">
                    YouTube • Click to Play
                  </span>
                </div>
              )
            ) : (
              // HTML5 / Cloudinary Video (Autoplays muted by default)
              <>
                <video
                  ref={videoRef}
                  src={blog.videoUrl}
                  poster={blog.coverImage || undefined}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onClick={togglePlay}
                  className="w-full h-full object-contain cursor-pointer"
                />

                {/* Video Controls Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-between pointer-events-auto">
                  {/* Play / Pause button */}
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <PauseIcon className="w-3.5 h-3.5" /> : <PlayIcon className="w-3.5 h-3.5" />}
                  </button>

                  {/* Mute / Unmute Toggle Button (Muted by default) */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold backdrop-blur-md transition-all ${
                      isMuted
                        ? 'bg-black/60 text-slate-200 hover:bg-black/80'
                        : 'bg-amber-400 text-slate-950 shadow-md'
                    }`}
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    title={isMuted ? 'Click to Unmute' : 'Click to Mute'}
                  >
                    {isMuted ? (
                      <>
                        <VolumeXIcon className="w-3.5 h-3.5 text-slate-300" />
                        <span>Muted</span>
                      </>
                    ) : (
                      <>
                        <Volume2Icon className="w-3.5 h-3.5 text-slate-950" />
                        <span>Sound On</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Floating Video Badge */}
                <div className="absolute top-2 left-2 pointer-events-none">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-black/60 backdrop-blur-md text-amber-300 border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Video
                  </span>
                </div>
              </>
            )}
          </div>
        ) : (
          // Standard Image or Icon Thumbnail
          <Link
            to={`/blog/${blog.slug}`}
            className="shrink-0 self-start w-full sm:w-44 h-44 sm:h-36 relative block"
          >
            {blog.coverImage ? (
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover rounded-xl border border-slate-100"
              />
            ) : (
              <div
                className={`w-full h-full rounded-xl flex items-center justify-center border ${config.bg} ${config.border} ${config.text}`}
              >
                <IconComp className="w-10 h-10 opacity-80" />
              </div>
            )}
          </Link>
        )}

        {/* ── Content Details ─────────────────────────────────── */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {blog.category && (
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${config.bg} ${config.text} ${config.border}`}
                >
                  <IconComp className="w-3 h-3" />
                  <span>{blog.category}</span>
                </span>
              )}
              {blog.videoUrl && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300">
                  ▶ Video Guide
                </span>
              )}
              <span className="text-xs text-slate-300">•</span>
              <time className="text-xs text-slate-400">{formatDate(blog.createdAt)}</time>
              <span className="text-xs text-slate-300">•</span>
              <span className="text-xs text-slate-400">{readTime} min read</span>
            </div>

            {/* Title */}
            <Link to={`/blog/${blog.slug}`}>
              <h3 className="font-display text-lg sm:text-xl font-bold mb-2 leading-snug text-slate-900 hover:text-blue-700 transition-colors line-clamp-2">
                {blog.title}
              </h3>
            </Link>

            {/* Excerpt */}
            <p className="text-sm leading-relaxed text-slate-600 line-clamp-2 mb-4">
              {blog.excerpt}
            </p>
          </div>

          {/* Bottom Actions Row: Like + Comment Count + Read Link */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-3">
              {/* Like Button */}
              <button
                type="button"
                onClick={handleLikeClick}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  liked
                    ? 'bg-rose-50 text-rose-600 border border-rose-200 shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
                title={liked ? 'Unlike post' : 'Like post'}
              >
                <HeartIcon
                  className={`w-3.5 h-3.5 transition-transform ${liked ? 'scale-110' : ''}`}
                  filled={liked}
                  color={liked ? '#E11D48' : 'currentColor'}
                />
                <span>{likesCount}</span>
              </button>

              {/* Comment Count */}
              <Link
                to={`/blog/${blog.slug}#comments`}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium bg-slate-50 text-slate-500 hover:text-navy-900 hover:bg-slate-100 border border-slate-200 transition-colors"
                title="View comments"
              >
                <MessageSquareIcon className="w-3.5 h-3.5" />
                <span>{commentCount}</span>
              </Link>
            </div>

            {/* Read complete article link */}
            <Link
              to={`/blog/${blog.slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-navy-900 hover:text-blue-600 transition-all duration-200 group-hover:gap-2"
            >
              <span>Read complete article</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BlogCard;
