import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneIcon,
  MailIcon,
  CalendarIcon,
  InstagramIcon,
  FacebookIcon,
  YouTubeIcon,
  CheckIcon,
} from '../components/Icons';

const contactInfo = [
  {
    Icon: MailIcon,
    label: 'Email',
    value: 'info@astrovastupragati.com',
    href: 'mailto:info@astrovastupragati.com',
  },
  {
    Icon: PhoneIcon,
    label: 'Phone / WhatsApp',
    value: '+91 9311141269',
    href: 'tel:+919311141269',
  },
  {
    Icon: CalendarIcon,
    label: 'Consultation Hours',
    value: 'Mon – Sat: 10:00 AM – 7:00 PM IST',
    href: null,
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-[#0B192C] text-white py-16 lg:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/10 text-amber-300 border border-amber-400/30 mb-6">
            <MailIcon className="w-3.5 h-3.5" />
            <span>Connect with Astro Vastu Pragati</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-5 tracking-tight">
            We'd Love to <span className="text-amber-400">Hear From You</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mx-auto max-w-2xl">
            Whether you have an inquiry regarding personal consultations, Vastu analysis, or want to share your Seva Story &mdash; we are here to assist you.
          </p>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-5 gap-10">
        
        {/* Left: Contact Info */}
        <div className="md:col-span-2 space-y-5">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
            Direct Details
          </h2>

          {contactInfo.map((item) => {
            const IconComp = item.Icon;
            return (
              <div
                key={item.label}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-navy-900 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-slate-900">{item.value}</p>
                  )}
                </div>
              </div>
            );
          })}

          {/* Social Channels */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Connect Online
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/astrovastupragati?stkn=dzYwMGp1MGlsYTJ3"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100"
              >
                <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Instagram</p>
                  <p className="text-[11px] text-slate-500">@astrovastupragati</p>
                </div>
              </a>

              <a
                href="https://youtube.com/@astrovastupragati?si=7BweKZZtfKxB3geA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100"
              >
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                  <YouTubeIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">YouTube</p>
                  <p className="text-[11px] text-slate-500">@astrovastupragati</p>
                </div>
              </a>

              <a
                href="https://www.facebook.com/61567577480061/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1877F2] flex items-center justify-center">
                  <FacebookIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Facebook</p>
                  <p className="text-[11px] text-slate-500">Astro Vastu Pragati</p>
                </div>
              </a>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/book-consultation"
              className="btn-primary w-full justify-center py-3"
            >
              <CalendarIcon className="w-4 h-4 text-amber-400" />
              <span>Book Formal Consultation</span>
            </Link>
          </div>
        </div>

        {/* Right: Form */}
        <div className="md:col-span-3 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-navy">
          {submitted ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
                <CheckIcon className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">
                Message Received
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                Thank you for contacting Astro Vastu Pragati. Acharya Pragati or our team will get back to you shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: '', email: '', subject: '', message: '' });
                }}
                className="btn-secondary mt-6"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="form-label" htmlFor="contact-name">Full Name *</label>
                    <input
                      id="contact-name"
                      className="form-input"
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="contact-email">Email Address *</label>
                    <input
                      id="contact-email"
                      className="form-input"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label" htmlFor="contact-subject">Topic of Inquiry</label>
                  <input
                    id="contact-subject"
                    className="form-input"
                    type="text"
                    name="subject"
                    placeholder="e.g. Kundali Analysis, Vastu Site Visit, Seva Story"
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="form-label" htmlFor="contact-message">Message *</label>
                  <textarea
                    id="contact-message"
                    className="form-input"
                    name="message"
                    rows={5}
                    placeholder="Share the details of your inquiry…"
                    value={form.message}
                    onChange={handleChange}
                    required
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center py-3 text-base"
                  disabled={loading}
                  style={{ opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Sending Message…' : 'Send Message'}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Contact;
