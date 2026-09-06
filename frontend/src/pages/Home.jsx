import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import BlogCard from '../components/BlogCard';
import {
  LogoIcon,
  AllPostsIcon,
  AstrologyIcon,
  NumerologyIcon,
  VastuIcon,
  RashifalIcon,
  SevaStoriesIcon,
  SpiritualityIcon,
  CalendarIcon,
  SearchIcon,
} from '../components/Icons';

const categories = [
  { name: 'All', Icon: AllPostsIcon },
  { name: 'Astrology', Icon: AstrologyIcon },
  { name: 'Numerology', Icon: NumerologyIcon },
  { name: 'Vastu Shastra', Icon: VastuIcon },
  { name: 'Rashifal', Icon: RashifalIcon },
  { name: 'Seva Stories', Icon: SevaStoriesIcon },
  { name: 'Spirituality', Icon: SpiritualityIcon },
];

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    api
      .get('/blogs', { params: { category: activeCategory === 'All' ? '' : activeCategory, limit: 20 } })
      .then((res) => setBlogs(res.data.blogs || res.data))
      .catch(() => setError('Could not load articles. Please verify server connection.'))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">

      {/* ── Hero Section (Navy Blue & White) ────────────────── */}
      <section className="bg-gradient-to-b from-[#0B192C] via-[#0F2238] to-[#1E3E62] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/10 text-amber-300 border border-amber-400/30 mb-6">
              <LogoIcon className="w-4 h-4 text-amber-400" />
              <span>Astro Vastu Pragati • By Acharya Pragati</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
              <br className="hidden sm:inline" />
              <span className="text-amber-400">  Ancient Vedic Wisdom forModern Clarity &amp; Harmony</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Personalized guidance in Vedic Astrology, Vastu Shastra, Numerology, Occult, Spirituality, and inspiring Seva Stories.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                to="/book-consultation"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-semibold text-sm hover:bg-amber-300 transition-all shadow-md"
              >
                <CalendarIcon className="w-4 h-4" />
                <span>Book Consultation</span>
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 transition-all"
              >
                <span>About Acharya Pragati</span>
              </Link>
            </div>
          </div>

          {/* Decorative Emblem Graphic */}
          <div className="flex-shrink-0 relative animate-float" aria-hidden="true">
            <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-amber-400/30 flex items-center justify-center bg-gradient-to-tr from-amber-400/10 via-transparent to-white/5 backdrop-blur-sm shadow-2xl relative">
              <div className="w-44 h-44 rounded-full border border-dashed border-amber-400/50 flex items-center justify-center">
                <LogoIcon className="w-24 h-24 text-amber-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Topic Quick Selector ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1">
            Knowledge Streams
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Explore by Discipline
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-3.5">
          {categories.map((cat) => {
            const IconComp = cat.Icon;
            const isSelected = activeCategory === cat.name;

            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl transition-all duration-200 cursor-pointer text-left border ${
                  cat.name === 'All' ? 'col-span-2 sm:col-span-1' : 'col-span-1'
                } ${
                  isSelected
                    ? 'bg-[#0B192C] text-white border-navy-900 shadow-md -translate-y-0.5 ring-2 ring-amber-400/40'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-white/10 text-amber-300' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <IconComp className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-center">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Articles Feed ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
              {activeCategory === 'All' ? 'Latest Articles & Insights' : `${activeCategory} Articles`}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {activeCategory === 'All'
                ? 'Displaying all posts across Vedic disciplines'
                : `Showing articles filtered by ${activeCategory}`}
            </p>
          </div>
          {activeCategory !== 'All' && (
            <button
              onClick={() => setActiveCategory('All')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors border border-amber-200/80 shadow-xs cursor-pointer"
            >
              <AllPostsIcon className="w-3.5 h-3.5 text-amber-700" />
              <span>Show All Posts</span>
            </button>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-2xl bg-white border border-slate-200 animate-pulse" />
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-rose-600 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && blogs.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <LogoIcon className="w-6 h-6" />
            </div>
            <p className="font-display text-lg font-bold text-slate-900">
              {activeCategory === 'All' ? 'No articles published yet.' : `No articles found in ${activeCategory}.`}
            </p>
            <p className="text-xs text-slate-500 mt-1">Check back soon or explore our other disciplines.</p>
            {activeCategory !== 'All' && (
              <button
                onClick={() => setActiveCategory('All')}
                className="btn-secondary mt-5 text-xs"
              >
                View All Posts
              </button>
            )}
          </div>
        )}

        {/* Blog cards */}
        <div className="grid grid-cols-1 gap-4">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </section>

      {/* ── Consultation CTA Card ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pt-12">
        <div className="bg-[#0B192C] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-navy-md">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-4">
              <span>Personalized Guidance</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-amber-400">Ready for a Personal Reading with Acharya Pragati?</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
              Gain deep insight into your Kundali, planetary positions, spatial Vastu alignments, or name vibrations. Book your dedicated consultation today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/book-consultation"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-semibold text-sm hover:bg-amber-300 transition-colors shadow-sm"
              >
                <CalendarIcon className="w-4 h-4" />
                <span>Book Consultation</span>
              </Link>
              <a
                href="tel:+919311141269"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 transition-colors"
              >
                <span>Call +91 9311141269</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
