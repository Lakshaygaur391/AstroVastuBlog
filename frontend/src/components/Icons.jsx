import React from 'react';

// Brand & Logo Icon: Sacred Geometric Astrolabe / Star Compass
export const LogoIcon = ({ className = 'w-7 h-7', color = 'currentColor' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke={color}
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Outer orbit */}
    <circle cx="12" cy="12" r="9.5" strokeDasharray="1 2.5" />
    {/* Middle ring */}
    <circle cx="12" cy="12" r="6" />
    {/* Central 8-point celestial star */}
    <path d="M12 2v20M2 12h20" strokeWidth="1.2" opacity="0.6" />
    <path d="M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" strokeWidth="0.9" opacity="0.4" />
    <circle cx="12" cy="12" r="2" fill={color} fillOpacity="0.25" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="0.75" fill={color} />
  </svg>
);

// Astrology: Astrolabe / Constellation / Celestial Orbit
export const AstrologyIcon = ({ className = 'w-5 h-5', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(-25 12 12)" />
    <circle cx="12" cy="12" r="2" fill={color} fillOpacity="0.2" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2" opacity="0.7" />
  </svg>
);

// Numerology: Sacred Matrix / Digital Destiny
export const NumerologyIcon = ({ className = 'w-5 h-5', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" opacity="0.35" strokeDasharray="1 1.5" />
    <circle cx="9" cy="9" r="1" fill={color} />
    <circle cx="15" cy="9" r="1.5" fill={color} fillOpacity="0.4" />
    <circle cx="9" cy="15" r="1.5" fill={color} fillOpacity="0.4" />
    <circle cx="15" cy="15" r="1" fill={color} />
    <circle cx="12" cy="12" r="1.8" fill={color} />
  </svg>
);

// Vastu Shastra: Architectural Harmony & Sacred Directions
export const VastuIcon = ({ className = 'w-5 h-5', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1v-9.5z" />
    {/* Sacred central compass */}
    <circle cx="12" cy="14" r="3.2" />
    <path d="M12 12.2v3.6M10.2 14h3.6" />
    <path d="M9 21v-4a3 3 0 016 0v4" opacity="0.4" />
  </svg>
);

// Rashifal: Zodiac Sun Wheel & Moon Crescent
export const RashifalIcon = ({ className = 'w-5 h-5', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8.5" />
    {/* Moon crescent inside sun disk */}
    <path d="M14.5 7.5a6 6 0 00-5 8.5 6 6 0 115-8.5z" fill={color} fillOpacity="0.25" />
    <path d="M12 1.5v2M12 20.5v2M1.5 12h2M20.5 12h2" opacity="0.5" />
  </svg>
);

// Seva Stories: Caring Hands / Giving Heart
export const SevaStoriesIcon = ({ className = 'w-5 h-5', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    {/* Healing ray lines inside */}
    <path d="M12 9v4M10 11h4" strokeWidth="1.5" opacity="0.6" />
  </svg>
);

// Spirituality: Blooming Sacred Lotus
export const SpiritualityIcon = ({ className = 'w-5 h-5', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {/* Center petal */}
    <path d="M12 4c-1.5 3-2 6-2 9a2 2 0 004 0c0-3-.5-6-2-9z" fill={color} fillOpacity="0.2" />
    {/* Left petal */}
    <path d="M10 13c-2.5-.5-5-2-7-5 1 4 3.5 7 7 7.5" />
    {/* Right petal */}
    <path d="M14 13c2.5-.5 5-2 7-5-1 4-3.5 7-7 7.5" />
    {/* Water / base ripples */}
    <path d="M5 20c3.5 1 10.5 1 14 0M8 17.5c2.5.7 5.5.7 8 0" opacity="0.7" />
  </svg>
);

// Social Media Icons
export const InstagramIcon = ({ className = 'w-5 h-5', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
  </svg>
);

export const FacebookIcon = ({ className = 'w-5 h-5', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);

export const YouTubeIcon = ({ className = 'w-5 h-5', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill={color} />
  </svg>
);

// General UI Icons
export const PhoneIcon = ({ className = 'w-5 h-5', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
);

export const MailIcon = ({ className = 'w-5 h-5', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export const CalendarIcon = ({ className = 'w-5 h-5', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const UserIcon = ({ className = 'w-5 h-5', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const CheckIcon = ({ className = 'w-5 h-5', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const ChevronDownIcon = ({ className = 'w-4 h-4', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const SearchIcon = ({ className = 'w-4 h-4', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const EditIcon = ({ className = 'w-4 h-4', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export const TrashIcon = ({ className = 'w-4 h-4', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
  </svg>
);

export const PlusIcon = ({ className = 'w-4 h-4', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const ExternalLinkIcon = ({ className = 'w-4 h-4', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export const LogoutIcon = ({ className = 'w-4 h-4', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export const VolumeXIcon = ({ className = 'w-4 h-4', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

export const Volume2Icon = ({ className = 'w-4 h-4', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
  </svg>
);

export const PlayIcon = ({ className = 'w-4 h-4', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export const PauseIcon = ({ className = 'w-4 h-4', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);

export const HeartIcon = ({ className = 'w-4 h-4', filled = false, color = 'currentColor' }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? color : 'none'}
    stroke={color}
    strokeWidth={filled ? '1' : '2'}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

export const MessageSquareIcon = ({ className = 'w-4 h-4', color = 'currentColor' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

// All Posts / Universal Discipline Grid Icon
export const AllPostsIcon = ({ className = 'w-5 h-5', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="2" />
    <rect x="14" y="3" width="7" height="7" rx="2" />
    <rect x="14" y="14" width="7" height="7" rx="2" />
    <rect x="3" y="14" width="7" height="7" rx="2" />
  </svg>
);
