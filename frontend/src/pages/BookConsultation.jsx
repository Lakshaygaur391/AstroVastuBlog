import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useUserAuth } from '../context/UserAuthContext';
import SignupModal from '../components/SignupModal';
import {
  CalendarIcon,
  AstrologyIcon,
  NumerologyIcon,
  VastuIcon,
  LogoIcon,
  CheckIcon,
} from '../components/Icons';

const services = [
  {
    Icon: AstrologyIcon,
    title: 'Kundali Analysis',
    subtitle: 'Birth Chart Reading & Transits',
    price: '₹1,500',
    duration: '60 min',
    features: [
      'Comprehensive Janam Kundali analysis',
      'Planetary positions & current dasha effects',
      'Career, relationship & health outlook',
      'Personalized Vedic remedies & gemstones',
    ],
    popular: false,
  },
  {
    Icon: LogoIcon,
    title: 'Complete Life Guidance',
    subtitle: 'Holistic Multi-Discipline Reading',
    price: '₹3,500',
    duration: '90 min',
    features: [
      'Kundali + Navamsa deep analysis',
      'Numerology destiny vibration review',
      'Residential Vastu energy audit guidance',
      'Specific questions & personalized remedies',
      'Follow-up Q&A consultation included',
    ],
    popular: true,
  },
  {
    Icon: NumerologyIcon,
    title: 'Numerology Reading',
    subtitle: 'Destiny Numbers & Name Energy',
    price: '₹1,200',
    duration: '45 min',
    features: [
      'Life path & destiny number calculation',
      'Name vibration & phonetic balance',
      'Personal year cycle forecast',
      'Lucky dates, colors & numbers',
    ],
    popular: false,
  },
  {
    Icon: VastuIcon,
    title: 'Vastu Shastra Consultation',
    subtitle: 'Residential & Commercial Harmony',
    price: '₹2,000',
    duration: '60 min',
    features: [
      'Directional floor plan examination',
      'Main entrance, kitchen & bedroom alignment',
      'Defect corrections without demolition',
      'Written recommendations summary',
    ],
    popular: false,
  },
];

const BookConsultation = () => {
  const { user, userLoading } = useUserAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState('Complete Life Guidance');
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', phone: '', date: '', time: '', message: '' });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');

  const handleBookingChange = (e) =>
    setBookingForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowModal(true);
      return;
    }
    setBookingLoading(true);
    setBookingError('');
    try {
      await api.post('/consultations', {
        name: user ? user.name : bookingForm.name,
        email: user ? user.email : bookingForm.email,
        phone: bookingForm.phone || (user ? user.phone : ''),
        service: selectedService,
        date: bookingForm.date,
        time: bookingForm.time,
        message: bookingForm.message,
      });
      setBookingSubmitted(true);
    } catch (err) {
      setBookingError(err?.response?.data?.message || 'Failed to submit consultation booking. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-body">
      {/* Signup Modal */}
      {showModal && <SignupModal onClose={() => setShowModal(false)} />}

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-[#0B192C] text-white py-16 lg:py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/10 text-amber-300 border border-amber-400/30 mb-6">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Consultation with Acharya Pragati</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            Schedule Your <span className="text-amber-400">Personal Session</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed mx-auto max-w-2xl">
            Choose your desired consultation session and receive tailored Vedic, Vastu, or Numerological insights for clarity and growth.
          </p>

          {!user && (
            <div className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/30">
              <span>Please sign in or create an account to book your consultation</span>
              <button
                onClick={() => setShowModal(true)}
                className="underline ml-1 font-bold text-white hover:text-amber-200"
              >
                Sign In / Register
              </button>
            </div>
          )}

          {user && (
            <div className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              <span>Namaste, {user.name}! Select your consultation below.</span>
            </div>
          )}
        </div>
      </section>

      {/* ── Pricing Cards ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
            Consultation Options
          </p>
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Select Your Consultation Focus
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {services.map((svc) => {
            const IconComp = svc.Icon;
            const isSelected = selectedService === svc.title;

            return (
              <div
                key={svc.title}
                onClick={() => setSelectedService(svc.title)}
                className={`relative rounded-3xl p-6 cursor-pointer transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-[#0B192C] text-white border-navy-900 shadow-navy-lg -translate-y-1'
                    : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {svc.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 shadow">
                    Most Popular
                  </div>
                )}

                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                      isSelected ? 'bg-white/10 text-amber-300' : 'bg-slate-100 text-navy-900'
                    }`}
                  >
                    <IconComp className="w-6 h-6" />
                  </div>

                  <h3 className="font-display text-xl font-bold mb-1">
                    {svc.title}
                  </h3>

                  <p className={`text-xs mb-4 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {svc.subtitle}
                  </p>

                  <div className="flex items-baseline gap-1.5 mb-5">
                    <span className={`font-display text-3xl font-bold ${isSelected ? 'text-amber-400' : 'text-slate-900'}`}>
                      {svc.price}
                    </span>
                    <span className={`text-xs ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                      / {svc.duration}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs">
                        <CheckIcon className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isSelected ? 'text-amber-400' : 'text-emerald-600'}`} />
                        <span className={isSelected ? 'text-slate-200' : 'text-slate-600'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {isSelected ? '✓ Selected' : 'Choose Service'}
                </button>
              </div>
            );
          })}
        </div>

        {/* ── Booking Form ─────────────────────────────────────── */}
        <div className="max-w-2xl mx-auto rounded-3xl p-8 sm:p-10 bg-white border border-slate-200 shadow-navy">
          {bookingSubmitted ? (
            <div className="text-center py-10 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">
                Booking Request Sent
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                We have received your booking details for <strong>{selectedService}</strong>.
                Acharya Pragati or our scheduling team will reach out to confirm your slot.
              </p>
              <button
                onClick={() => {
                  setBookingSubmitted(false);
                  setBookingForm({ name: '', email: '', phone: '', date: '', time: '', message: '' });
                }}
                className="btn-secondary text-xs"
              >
                Schedule Another Session
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold text-slate-900">
                  Confirm Consultation Details
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Selected Session: <span className="font-bold text-navy-900">{selectedService}</span>
                </p>
              </div>

              {!user && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium mb-6 flex items-center justify-between">
                  <span>Sign in required to confirm your booking.</span>
                  <button
                    onClick={() => setShowModal(true)}
                    className="font-bold underline text-amber-800 hover:text-amber-950"
                  >
                    Sign In / Register
                  </button>
                </div>
              )}

              <form onSubmit={handleBookingSubmit} id="booking-form" className="space-y-4">
                {bookingError && (
                  <div className="rounded-xl px-4 py-3 text-xs font-semibold bg-rose-50 border border-rose-200 text-rose-700 animate-fade-in">
                    {bookingError}
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label" htmlFor="book-name">Full Name *</label>
                    <input
                      id="book-name"
                      className="form-input"
                      type="text"
                      name="name"
                      value={user ? user.name : bookingForm.name}
                      onChange={handleBookingChange}
                      placeholder="Your full name"
                      required
                      readOnly={!!user}
                      style={user ? { background: '#F8FAFC' } : {}}
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="book-email">Email *</label>
                    <input
                      id="book-email"
                      className="form-input"
                      type="email"
                      name="email"
                      value={user ? user.email : bookingForm.email}
                      onChange={handleBookingChange}
                      placeholder="your@email.com"
                      required
                      readOnly={!!user}
                      style={user ? { background: '#F8FAFC' } : {}}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label" htmlFor="book-phone">Phone Number *</label>
                    <input
                      id="book-phone"
                      className="form-input"
                      type="tel"
                      name="phone"
                      value={user ? (user.phone || bookingForm.phone) : bookingForm.phone}
                      onChange={handleBookingChange}
                      placeholder="+91 93111 41269"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="book-service">Service</label>
                    <select
                      id="book-service"
                      className="form-input bg-white"
                      name="service"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      required
                    >
                      {services.map((s) => (
                        <option key={s.title} value={s.title}>{s.title} ({s.price})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label" htmlFor="book-date">Preferred Date *</label>
                    <input
                      id="book-date"
                      className="form-input"
                      type="date"
                      name="date"
                      min={minDate}
                      value={bookingForm.date}
                      onChange={handleBookingChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="book-time">Preferred Time Slot *</label>
                    <select
                      id="book-time"
                      className="form-input bg-white"
                      name="time"
                      value={bookingForm.time}
                      onChange={handleBookingChange}
                      required
                    >
                      <option value="">Select a time…</option>
                      {['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM'].map((t) => (
                        <option key={t} value={t}>{t} IST</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label" htmlFor="book-message">Your Specific Query / Birth Details (Optional)</label>
                  <textarea
                    id="book-message"
                    className="form-input"
                    name="message"
                    rows={3}
                    placeholder="Provide your date/time/place of birth or questions you wish to focus on…"
                    value={bookingForm.message}
                    onChange={handleBookingChange}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center py-3 text-sm mt-2 disabled:opacity-50"
                  disabled={bookingLoading || !user}
                >
                  {bookingLoading ? 'Submitting…' : 'Confirm Consultation Request'}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default BookConsultation;
