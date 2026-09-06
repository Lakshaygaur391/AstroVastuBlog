import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import BlogCard from '../components/BlogCard';
import {
  AstrologyIcon,
  NumerologyIcon,
  VastuIcon,
  RashifalIcon,
  SevaStoriesIcon,
  SpiritualityIcon,
  CalendarIcon,
  LogoIcon,
} from '../components/Icons';

const categoryMeta = {
  Astrology: {
    Icon: AstrologyIcon,
    title: 'Astrology',
    hindiTitle: 'ज्योतिष',
    desc: 'Explore authentic Vedic astrology insights — from birth charts (Kundali) and planetary transits to predictive techniques and dasha remedies.',
    color: '#0B192C',
    topics: ['Kundali Analysis', 'Transit Reports', 'Dasha Predictions', 'Compatibility', 'Remedies'],
  },
  Numerology: {
    Icon: NumerologyIcon,
    title: 'Numerology',
    hindiTitle: 'अंकशास्त्र',
    desc: 'Uncover the hidden vibrations of numbers in your life. Understand your birth date, name numbers, and personal year cycles.',
    color: '#0B192C',
    topics: ['Life Path Number', 'Destiny Number', 'Name Numerology', 'Personal Year', 'Lucky Numbers'],
  },
  'Vastu Shastra': {
    Icon: VastuIcon,
    title: 'Vastu Shastra',
    hindiTitle: 'वास्तु शास्त्र',
    desc: 'Harmonize your living and working environments with the ancient Vedic science of architecture and directional energy flows.',
    color: '#0B192C',
    topics: ['Home Vastu', 'Workplace Vastu', 'Main Door Direction', 'Bedroom Harmony', 'Pooja Room Alignment'],
  },
  Rashifal: {
    Icon: RashifalIcon,
    title: 'Rashifal',
    hindiTitle: 'राशिफल',
    desc: 'Vedic horoscope readings for all 12 zodiac signs — crafted with precision to illuminate planetary transits and remedies.',
    color: '#0B192C',
    topics: ['Daily Horoscope', 'Weekly Transits', 'Monthly Trends', 'Yearly Forecast', '12 Rashis'],
  },
  'Seva Stories': {
    Icon: SevaStoriesIcon,
    title: 'Seva Stories',
    hindiTitle: 'सेवा कथाएँ',
    desc: 'Real stories of kindness, helping others, compassion, and selfless human service. Celebrating ordinary people doing extraordinary things to spread positivity.',
    color: '#0B192C',
    topics: ['Acts of Kindness', 'Community Compassion', 'Selfless Service', 'Inspiring Journeys', 'Karma Healing'],
  },
  Spirituality: {
    Icon: SpiritualityIcon,
    title: 'Spirituality',
    hindiTitle: 'आध्यात्मिकता',
    desc: 'Deepen your connection to inner peace through Vedic rituals, meditation, sacred mantras, and the wisdom of ancient sages.',
    color: '#0B192C',
    topics: ['Meditation Practices', 'Sacred Mantras', 'Vedic Rituals', 'Inner Peace', 'Occult Sciences'],
  },
};

const CategoryPage = ({ category }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const meta = categoryMeta[category] || {
    Icon: LogoIcon,
    title: category,
    hindiTitle: '',
    desc: `Explore articles in ${category} by Acharya Pragati.`,
    color: '#0B192C',
    topics: [],
  };
  const IconComp = meta.Icon;

  useEffect(() => {
    setLoading(true);
    setError('');
    window.scrollTo(0, 0);
    api
      .get('/blogs', { params: { category, limit: 30 } })
      .then((res) => setBlogs(res.data.blogs || res.data))
      .catch(() => setError('Could not load articles. Please try again later.'))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* ── Category Hero (Navy Blue Header) ────────────────── */}
      <section className="bg-[#0B192C] text-white py-14 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex-1 animate-slide-up text-center sm:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/10 text-amber-300 border border-amber-400/30 mb-4">
              <IconComp className="w-3.5 h-3.5" />
              <span>{meta.hindiTitle ? `${meta.title} • ${meta.hindiTitle}` : meta.title}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              {meta.title}
            </h1>

            <p className="text-base text-slate-300 leading-relaxed mb-6 max-w-xl">
              {meta.desc}
            </p>

            {/* Topic pills */}
            {meta.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {meta.topics.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 shrink-0 shadow-navy-lg">
            <IconComp className="w-20 h-20" />
          </div>
        </div>
      </section>

      {/* ── Articles Feed ───────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            {loading ? 'Fetching articles…' : `${blogs.length} Article${blogs.length !== 1 ? 's' : ''}`}
          </h2>
          <Link to="/" className="text-xs font-semibold text-navy-900 hover:text-blue-600 transition-colors">
            &larr; View All Disciplines
          </Link>
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-2xl bg-white border border-slate-200 animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-rose-600 text-sm font-medium">{error}</p>
          </div>
        )}

        {!loading && !error && blogs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <IconComp className="w-7 h-7" />
            </div>
            <p className="font-display text-xl font-bold text-slate-900">
              No articles published under {meta.title} yet.
            </p>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Acharya Pragati is preparing new insights for this discipline. Check back soon or browse all topics.
            </p>
            <Link to="/" className="btn-secondary mt-6 text-xs inline-flex">
              &larr; Return to Home Feed
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </section>

      {/* ── Consultation CTA ────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-slate-900 mb-1">
              Personalized {meta.title} Consultation
            </h3>
            <p className="text-sm text-slate-600">
              Schedule a dedicated 1-on-1 session with Acharya Pragati tailored to your chart and questions.
            </p>
          </div>
          <Link
            to="/book-consultation"
            className="btn-primary shrink-0 text-sm py-3 px-6"
          >
            <CalendarIcon className="w-4 h-4 text-amber-400" />
            <span>Book Consultation</span>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default CategoryPage;
