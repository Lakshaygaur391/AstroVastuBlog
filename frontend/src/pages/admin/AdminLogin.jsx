import React, { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogoIcon, UserIcon } from '../../components/Icons';

const AdminLogin = () => {
  const { admin, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (admin) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please verify and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 py-12 font-body text-slate-900">
      
      {/* Brand Header */}
      <div className="text-center mb-8">
        <Link to="/" className="inline-flex items-center gap-3 group mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#0B192C] text-amber-400 flex items-center justify-center shadow-md">
            <LogoIcon className="w-7 h-7" color="#F59E0B" />
          </div>
        </Link>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Astro Vastu Pragati
        </h1>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
          Administrative Portal
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-navy p-8 sm:p-10">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">Admin Sign In</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Enter your credentials to manage blogs, categories, and site content.
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium px-4 py-3 rounded-xl mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label" htmlFor="email">
              Admin Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="admin@astrovastupragati.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="form-label mb-0" htmlFor="password">
                Password
              </label>
            </div>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full btn-primary justify-center py-3 text-sm mt-2 disabled:opacity-60"
          >
            {submitting ? 'Authenticating…' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <Link
            to="/"
            className="text-xs text-slate-500 hover:text-navy-900 transition-colors"
          >
            &larr; Return to public website
          </Link>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-8 text-center">
        Secured Access • Astro Vastu Pragati &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default AdminLogin;
