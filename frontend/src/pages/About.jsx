import React from 'react';
import { Link } from 'react-router-dom';
import {
  InstagramIcon,
  FacebookIcon,
  YouTubeIcon,
  PhoneIcon,
  MailIcon,
  CalendarIcon,
  AstrologyIcon,
  VastuIcon,
  NumerologyIcon,
  SpiritualityIcon,
  SevaStoriesIcon,
  CheckIcon,
} from '../components/Icons';

const disciplines = [
  { name: 'Vedic Astrology', desc: 'Birth chart (Kundali) reading, dasha predictions & planetary guidance', Icon: AstrologyIcon },
  { name: 'Vastu Shastra', desc: 'Energy alignment for homes, workspaces, main entrance & spatial layout', Icon: VastuIcon },
  { name: 'Numerology', desc: 'Destiny numbers, name correction vibrations & personal year forecasting', Icon: NumerologyIcon },
  { name: 'Occult Sciences', desc: 'Subtle energy analysis, protection mantras & esoteric wisdom', Icon: SpiritualityIcon },
  { name: 'Feng Shui', desc: 'Harmonizing flow of Chi/Prana in modern residential and commercial spaces', Icon: VastuIcon },
  { name: 'Spiritual Remedies', desc: 'Vedic rituals, gemstone guidance, charity practices & karma healing', Icon: SpiritualityIcon },
];

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">

      {/* ── Top Hero ────────────────────────────────────────── */}
      <section className="bg-[#0B192C] text-white py-16 lg:py-24 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/10 text-amber-300 border border-amber-400/30 mb-6">
            ✨ About Astro Vastu Pragati
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-amber-400"> Guiding Seekers with  Authentic Vedic Wisdom</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Welcome to <strong>Astro Vastu Pragati</strong>, led by <strong>Acharya Pragati</strong>.
            A sanctuary dedicated to Astrology, Vastu Shastra, Numerology, Occult, Spirituality, and Feng Shui.
          </p>
        </div>
      </section>

      {/* ── Main Founder Profile Section ────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 -mt-10 lg:-mt-14 relative z-20">
        <div className="bg-white rounded-3xl shadow-navy-md border border-slate-200 p-8 sm:p-12 lg:p-14">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-14">

            {/* Admin Photo */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="relative group">
                <div className="w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden border-4 border-amber-400/40 shadow-xl bg-slate-100">
                  <img
                    src="/acharya-pragati.jpg"
                    alt="Acharya Pragati - Founder of Astro Vastu Pragati"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback if image path needs reload
                      e.target.onerror = null;
                      e.target.src = '/acharya-pragati.jpg';
                    }}
                  />
                </div>
                {/* Verified badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0B192C] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg border border-amber-400/40 flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Acharya Pragati
                </div>
              </div>

              {/* Direct Call Button below photo */}
              <a
                href="tel:+919311141269"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 bg-slate-100 hover:bg-amber-100 px-5 py-2.5 rounded-xl transition-colors border border-slate-200"
              >
                <PhoneIcon className="w-4 h-4 text-amber-600" />
                <span>+91 9311141269</span>
              </a>
            </div>

            {/* Profile Bio & Details */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-3">
                <span className="px-3 py-1 bg-blue-50 text-navy-900 text-xs font-bold uppercase tracking-wider rounded-lg border border-blue-100">
                  Lead Consultant
                </span>
                <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider rounded-lg border border-amber-200">
                  Vedic Astrologer & Vastu Expert
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-5">
                Acharya Pragati
              </h2>

              <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6">
                <strong>Astro Vastu Pragati</strong>, handled by <strong>Acharya Pragati</strong>, is a dedicated space for Astrology, Vastu Shastra, Numerology, Occult, Spirituality, and Feng Shui.
              </p>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
                <p className="text-slate-800 font-medium leading-relaxed italic">
                  &ldquo;We share simple and practical guidance to help you understand life, energies, and your surroundings better.&rdquo;
                </p>
              </div>

              {/* Guiding Motto */}
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Our Guiding Philosophy
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-sm font-semibold text-slate-800">
                  {['Learn', 'Grow', 'Believe', 'Spread Positivity', 'Serve Humanity'].map((word, idx) => (
                    <React.Fragment key={word}>
                      <span className="px-3 py-1 bg-white border border-slate-300 rounded-lg shadow-sm text-navy-900">
                        {word}
                      </span>
                      {idx < 4 && <span className="text-amber-500 font-bold">•</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Social Channels with Icons */}
              <div className="border-t border-slate-100 pt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                  Official Channels & Connect
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/astrovastupragati?stkn=dzYwMGp1MGlsYTJ3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 hover:from-pink-500/20 hover:to-orange-500/20 text-slate-900 border border-slate-200 transition-all hover:scale-105"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-700 flex items-center justify-center text-white">
                      <InstagramIcon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] uppercase font-bold text-slate-500 leading-none">Instagram</p>
                      <p className="text-xs font-semibold leading-tight">@astrovastupragati</p>
                    </div>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://youtube.com/@astrovastupragati?si=7BweKZZtfKxB3geA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100/80 text-slate-900 border border-red-100 transition-all hover:scale-105"
                  >
                    <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white">
                      <YouTubeIcon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] uppercase font-bold text-slate-500 leading-none">YouTube</p>
                      <p className="text-xs font-semibold leading-tight">@astrovastupragati</p>
                    </div>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/61567577480061/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100/80 text-slate-900 border border-blue-100 transition-all hover:scale-105"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#1877F2] flex items-center justify-center text-white">
                      <FacebookIcon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] uppercase font-bold text-slate-500 leading-none">Facebook</p>
                      <p className="text-xs font-semibold leading-tight">Astro Vastu Pragati</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  to="/book-consultation"
                  className="btn-primary px-6 py-3 text-sm"
                >
                  <CalendarIcon className="w-4 h-4 text-amber-400" />
                  <span>Book Consultation with Acharya Pragati</span>
                </Link>
                <Link
                  to="/contact"
                  className="btn-secondary px-6 py-3 text-sm"
                >
                  <MailIcon className="w-4 h-4" />
                  <span>Send an Inquiry</span>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Areas of Expertise ──────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">
            Disciplines & Practice
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
            Holistic Vedic & Energetic Guidance
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Every consultation is personalized to align your internal energies and external environment for peace, success, and spiritual progress.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {disciplines.map((item) => {
            const IconComp = item.Icon;
            return (
              <div
                key={item.name}
                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-navy transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-900 border border-slate-200 flex items-center justify-center mb-5">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Special Section: Seva Stories ────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-gradient-to-br from-[#0B192C] via-[#112238] to-[#1E3E62] text-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-navy-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <SevaStoriesIcon className="w-72 h-72" />
          </div>

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-6">
              <SevaStoriesIcon className="w-4 h-4 text-rose-400" />
              <span>Special Space • Seva Stories</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              Real Stories of Kindness, Compassion &amp; Humanity
            </h2>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-6">
              <strong>Seva Stories</strong> is a heartfelt initiative created by Acharya Pragati where people can share their real stories of kindness, helping others, compassion, and selfless service.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              These inspiring chronicles celebrate ordinary people doing extraordinary things and remind us that spreading goodness and serving humanity is the highest spiritual virtue.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/seva-stories"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-semibold text-sm hover:bg-amber-300 transition-colors shadow-md"
              >
                <span>Explore Seva Stories</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 transition-colors"
              >
                <span>Share Your Story</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
