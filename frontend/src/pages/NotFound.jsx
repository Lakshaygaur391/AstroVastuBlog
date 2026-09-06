import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-16 text-center">
    <div className="text-8xl mb-6 animate-float">🔭</div>
    <p
      className="text-7xl font-bold mb-2"
      style={{ color: '#E8D4A0', fontFamily: 'Playfair Display, serif' }}
    >
      404
    </p>
    <h1 className="font-display text-2xl font-semibold mb-3" style={{ color: '#2D2A26' }}>
      Page Not Found
    </h1>
    <p className="text-sm mb-8 max-w-xs" style={{ color: '#7A746C' }}>
      The stars don't have a chart for this one. This page may have moved or doesn't exist.
    </p>
    <div className="flex flex-wrap gap-4 justify-center">
      <Link to="/" className="btn-primary">
        ← Back to Home
      </Link>
      <Link to="/book-consultation" className="btn-secondary">
        Book a Consultation
      </Link>
    </div>
  </div>
);

export default NotFound;
