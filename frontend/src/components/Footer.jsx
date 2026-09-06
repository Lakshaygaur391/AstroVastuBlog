import React from 'react';
import { Link } from 'react-router-dom';
import {
  LogoIcon,
  InstagramIcon,
  FacebookIcon,
  YouTubeIcon,
  PhoneIcon,
  MailIcon,
  CalendarIcon,
} from './Icons';

const categoryLinks = [
  { to: '/astrology', label: 'Astrology' },
  { to: '/numerology', label: 'Numerology' },
  { to: '/vastu-shastra', label: 'Vastu Shastra' },
  { to: '/rashifal', label: 'Rashifal' },
  { to: '/seva-stories', label: 'Seva Stories' },
  { to: '/spirituality', label: 'Spirituality' },
];

const Footer = () => (
  <footer className="bg-[#060D17] text-slate-300 border-t border-slate-800 font-body">
    {/* Top section */}
    <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
      
      {/* Brand & Mission */}
      <div className="md:col-span-2 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <LogoIcon className="w-6 h-6" color="#F59E0B" />
          </div>
          <div>
            <p className="font-display text-xl font-bold text-white tracking-tight">
              Astro Vastu Pragati
            </p>
            <p className="text-xs text-amber-400 font-medium">
              Handled by Acharya Pragati
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed max-w-md">
          A dedicated sanctuary for Astrology, Vastu Shastra, Numerology, Occult, Spirituality, Feng Shui, and Seva Stories.
          Sharing simple and practical guidance to understand energies and live with purpose.
        </p>

        <p className="text-xs text-slate-400 font-medium">
          Learn • Grow • Believe • Spread Positivity • Serve Humanity
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-3 pt-2">
          <a
            href="https://www.instagram.com/astrovastupragati?stkn=dzYwMGp1MGlsYTJ3"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:bg-white/10 hover:border-pink-500/30 transition-all"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>

          <a
            href="https://youtube.com/@astrovastupragati?si=7BweKZZtfKxB3geA"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-red-400 hover:bg-white/10 hover:border-red-500/30 transition-all"
          >
            <YouTubeIcon className="w-5 h-5" />
          </a>

          <a
            href="https://www.facebook.com/61567577480061/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:bg-white/10 hover:border-blue-500/30 transition-all"
          >
            <FacebookIcon className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Disciplines */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4">
          Disciplines
        </h3>
        <ul className="space-y-2.5 text-sm">
          {categoryLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact & Consultation */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4">
          Direct Connect
        </h3>
        <ul className="space-y-3 text-sm text-slate-400">
          <li className="flex items-center gap-2.5">
            <PhoneIcon className="w-4 h-4 text-amber-400 shrink-0" />
            <a href="tel:+919311141269" className="hover:text-white transition-colors">
              +91 9311141269
            </a>
          </li>
          <li className="flex items-center gap-2.5">
            <MailIcon className="w-4 h-4 text-amber-400 shrink-0" />
            <a href="mailto:info@astrovastupragati.com" className="hover:text-white transition-colors">
              info@astrovastupragati.com
            </a>
          </li>
        </ul>

        <Link
          to="/book-consultation"
          className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors shadow-sm"
        >
          <CalendarIcon className="w-4 h-4" />
          <span>Book Consultation</span>
        </Link>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="max-w-7xl mx-auto px-6 py-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
      <p>
        &copy; {new Date().getFullYear()} Astro Vastu Pragati. Guided by Acharya Pragati. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        <Link to="/about" className="hover:text-slate-200 transition-colors">About Us</Link>
        <Link to="/contact" className="hover:text-slate-200 transition-colors">Contact</Link>
        <Link to="/admin/login" className="hover:text-amber-400 transition-colors">Admin Portal</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
