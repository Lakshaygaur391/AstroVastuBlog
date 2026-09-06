import React, { useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import { LogoIcon } from './Icons';

const SignupModal = ({ onClose }) => {
  const { registerUser, loginUser } = useUserAuth();
  const [mode, setMode] = useState('signup'); // 'signup' | 'login'
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (mode === 'signup') {
        if (!form.name || !form.email || !form.password) {
          setError('Please fill in all required fields.');
          return;
        }
        await registerUser(form.name, form.email, form.phone, form.password);
      } else {
        await loginUser(form.email, form.password);
      }
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || 'Authentication error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-3xl shadow-navy-lg w-full max-w-md mx-4 overflow-hidden animate-slide-up border border-slate-200">
        
        {/* Header */}
        <div className="relative px-8 pt-8 pb-6 text-center bg-[#0B192C] text-white border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>

          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center mx-auto mb-3 text-amber-400">
            <LogoIcon className="w-7 h-7" color="#F59E0B" />
          </div>

          <h2 className="font-display text-2xl font-bold mb-1">
            {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-300">
            {mode === 'signup'
              ? 'Sign up to schedule your personal consultation session'
              : 'Sign in to access your consultations'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
          {error && (
            <div className="rounded-xl px-4 py-3 text-xs font-semibold bg-rose-50 border border-rose-200 text-rose-700 animate-fade-in">
              {error}
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="form-label">Full Name *</label>
              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div>
            <label className="form-label">Email Address *</label>
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label className="form-label">Phone Number (Optional)</label>
              <input
                className="form-input"
                type="tel"
                name="phone"
                placeholder="+91 93111 41269"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <label className="form-label">Password *</label>
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder={mode === 'signup' ? 'Minimum 6 characters' : '••••••••'}
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full justify-center py-3 text-sm mt-2 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Please wait…' : mode === 'signup' ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="px-8 pb-6 text-center border-t border-slate-100 pt-4">
          <p className="text-xs text-slate-500">
            {mode === 'signup' ? 'Already have an account?' : "Don't have an account yet?"}{' '}
            <button
              type="button"
              onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(''); }}
              className="font-bold text-navy-900 hover:text-blue-600 underline ml-1"
            >
              {mode === 'signup' ? 'Sign in here' : 'Sign up here'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignupModal;
