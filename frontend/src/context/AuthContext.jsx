import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    try {
      const saved = localStorage.getItem('astro_admin');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(() => {
    return !localStorage.getItem('astro_admin') && !!localStorage.getItem('astro_admin_token');
  });

  useEffect(() => {
    const token = localStorage.getItem('astro_admin_token');
    if (!token) {
      setAdmin(null);
      localStorage.removeItem('astro_admin');
      setLoading(false);
      return;
    }
    api
      .get('/auth/me')
      .then((res) => {
        setAdmin(res.data);
        localStorage.setItem('astro_admin', JSON.stringify(res.data));
      })
      .catch((err) => {
        // Only clear if explicitly unauthorized
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem('astro_admin_token');
          localStorage.removeItem('astro_admin');
          setAdmin(null);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    const adminData = { _id: data._id, name: data.name, email: data.email };
    localStorage.setItem('astro_admin_token', data.token);
    localStorage.setItem('astro_admin', JSON.stringify(adminData));
    setAdmin(adminData);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('astro_admin_token');
    localStorage.removeItem('astro_admin');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
