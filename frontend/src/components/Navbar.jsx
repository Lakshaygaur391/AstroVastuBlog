import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import {
  LogoIcon,
  AstrologyIcon,
  NumerologyIcon,
  VastuIcon,
  RashifalIcon,
  SevaStoriesIcon,
  SpiritualityIcon,
  ChevronDownIcon,
  CalendarIcon,
  UserIcon,
  LogoutIcon,
} from './Icons';

const mainNavLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

const categoryLinks = [
  { to: '/astrology', label: 'Astrology', Icon: AstrologyIcon, desc: 'Kundali, transits & Vedic charts' },
  { to: '/numerology', label: 'Numerology', Icon: NumerologyIcon, desc: 'Name vibrations & life path' },
  { to: '/vastu-shastra', label: 'Vastu Shastra', Icon: VastuIcon, desc: 'Spatial harmony & directions' },
  { to: '/rashifal', label: 'Rashifal', Icon: RashifalIcon, desc: 'Horoscope readings for 12 signs' },
  { to: '/seva-stories', label: 'Seva Stories', Icon: SevaStoriesIcon, desc: 'Real stories of kindness' },
  { to: '/spirituality', label: 'Spirituality', Icon: SpiritualityIcon, desc: 'Vedic rituals & meditation' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logoutUser } = useUserAuth();
  const location = useLocation();

  // Track scroll for subtle shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu and dropdown on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isCategoryActive = categoryLinks.some((l) => location.pathname === l.to);

  return (
    <header
      className="sticky top-0 z-50 bg-[#0B192C] text-white transition-all duration-300 border-b border-slate-800"
      style={{
        boxShadow: scrolled ? '0 4px 20px rgba(6, 13, 23, 0.4)' : '0 1px 4px rgba(6, 13, 23, 0.2)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">

        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="Astro Vastu Pragati Home"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-500/10 border border-amber-400/40 flex items-center justify-center text-amber-400 transition-transform group-hover:scale-105 shadow-sm">
            <img src="/acharya-pragati.jpg " className='rounded-full w-full ' alt="" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
              Astro Vastu Pragati
            </span>
            <span className="text-[11px] font-medium tracking-wider text-slate-300 uppercase">

            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3.5 py-2 rounded-lg transition-all duration-200 ${isActive
                ? 'text-white bg-white/10 font-semibold shadow-inner'
                : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`
            }
          >
            Home
          </NavLink>

          {/* Categories Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all duration-200 focus:outline-none ${isCategoryActive
                ? 'text-white bg-white/10 font-semibold'
                : 'text-slate-200 hover:text-white hover:bg-white/5'
                }`}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <span>Disciplines</span>
              <ChevronDownIcon
                className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 ${dropdownOpen ? 'rotate-180 text-amber-400' : ''
                  }`}
              />
            </button>

            {dropdownOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-80 bg-white rounded-2xl shadow-navy-lg py-3 px-2 z-50 animate-slide-up border border-slate-200"
              >
                <div className="px-3 py-1.5 mb-1 border-b border-slate-100">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Vedic Knowledge & Consultations
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {categoryLinks.map((link) => {
                    const IconComp = link.Icon;
                    return (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                          `flex items-start gap-3 p-2.5 rounded-xl transition-colors ${isActive
                            ? 'bg-blue-50 text-navy-900 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-navy-900'
                          }`
                        }
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-navy-700 shrink-0 mt-0.5">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">{link.label}</span>
                          <span className="text-xs text-slate-500 font-normal">{link.desc}</span>
                        </div>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-3.5 py-2 rounded-lg transition-all duration-200 ${isActive
                ? 'text-white bg-white/10 font-semibold shadow-inner'
                : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`
            }
          >
            About Us
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `px-3.5 py-2 rounded-lg transition-all duration-200 ${isActive
                ? 'text-white bg-white/10 font-semibold shadow-inner'
                : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Right Action: User Status & CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 text-sm">
              <UserIcon className="w-4 h-4 text-amber-400" />
              <span className="text-slate-200 font-medium">
                {user.name.split(' ')[0]}
              </span>
              <button
                onClick={logoutUser}
                className="text-slate-400 hover:text-red-300 p-1 transition-colors"
                title="Sign out"
              >
                <LogoutIcon className="w-4 h-4" />
              </button>
            </div>
          ) : null}

          <Link
            to="/book-consultation"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white text-navy-900 hover:bg-amber-400 hover:text-slate-950 transition-all duration-200 shadow-sm"
          >
            <CalendarIcon className="w-4 h-4 text-amber-600" />
            <span>Book Consultation</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <nav className="lg:hidden bg-[#0F2238] border-t border-slate-800 px-5 py-6 space-y-4 animate-slide-up">
          <div className="space-y-1">
            <NavLink
              to="/"
              end
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-white/15 text-white font-semibold' : 'text-slate-200 hover:bg-white/5'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-white/15 text-white font-semibold' : 'text-slate-200 hover:bg-white/5'
                }`
              }
            >
              About Us
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-white/15 text-white font-semibold' : 'text-slate-200 hover:bg-white/5'
                }`
              }
            >
              Contact
            </NavLink>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <p className="px-3 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              Disciplines
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {categoryLinks.map((link) => {
                const IconComp = link.Icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${isActive
                        ? 'bg-amber-400/20 text-amber-300 font-semibold'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    <IconComp className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{link.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800">
            {user ? (
              <div className="flex items-center justify-between px-3 py-2 mb-3 bg-white/5 rounded-xl text-sm text-slate-200">
                <span className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-amber-400" />
                  {user.name}
                </span>
                <button
                  onClick={() => { logoutUser(); setMobileOpen(false); }}
                  className="text-xs text-red-400 hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : null}

            <Link
              to="/book-consultation"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold bg-amber-400 text-slate-950 shadow-md hover:bg-amber-300 transition-colors"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Book Consultation</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
