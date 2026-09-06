import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { UserAuthProvider } from './context/UserAuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import NotFound from './pages/NotFound';
import CategoryPage from './pages/CategoryPage';
import Contact from './pages/Contact';
import BookConsultation from './pages/BookConsultation';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogEditor from './pages/admin/BlogEditor';

const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col" style={{ background: '#FDFAF5' }}>
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <UserAuthProvider>
      <Routes>
        {/* ── Public Pages ── */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/book-consultation" element={<PublicLayout><BookConsultation /></PublicLayout>} />

        {/* ── Blog Post ── */}
        <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />

        {/* ── Category Pages ── */}
        <Route path="/astrology"     element={<PublicLayout><CategoryPage category="Astrology" /></PublicLayout>} />
        <Route path="/numerology"    element={<PublicLayout><CategoryPage category="Numerology" /></PublicLayout>} />
        <Route path="/vastu-shastra" element={<PublicLayout><CategoryPage category="Vastu Shastra" /></PublicLayout>} />
        <Route path="/rashifal"      element={<PublicLayout><CategoryPage category="Rashifal" /></PublicLayout>} />
        <Route path="/seva-stories"  element={<PublicLayout><CategoryPage category="Seva Stories" /></PublicLayout>} />
        <Route path="/spirituality"  element={<PublicLayout><CategoryPage category="Spirituality" /></PublicLayout>} />

        {/* ── Admin ── */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/editor/:id"
          element={
            <ProtectedRoute>
              <BlogEditor />
            </ProtectedRoute>
          }
        />

        {/* ── 404 ── */}
        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </UserAuthProvider>
  );
}

export default App;
