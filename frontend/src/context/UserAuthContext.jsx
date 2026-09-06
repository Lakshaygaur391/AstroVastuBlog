import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const UserAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('astro_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [userLoading, setUserLoading] = useState(() => {
    return !localStorage.getItem('astro_user') && !!localStorage.getItem('astro_user_token');
  });

  useEffect(() => {
    const token = localStorage.getItem('astro_user_token');
    if (!token) {
      setUser(null);
      localStorage.removeItem('astro_user');
      setUserLoading(false);
      return;
    }
    // Verify token with backend
    api
      .get('/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        localStorage.setItem('astro_user', JSON.stringify(res.data));
      })
      .catch((err) => {
        // Only remove token if explicitly unauthorized/forbidden
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem('astro_user_token');
          localStorage.removeItem('astro_user');
          setUser(null);
        }
      })
      .finally(() => setUserLoading(false));
  }, []);

  const registerUser = async (name, email, phone, password) => {
    const { data } = await api.post('/users/register', { name, email, phone, password });
    const userData = { _id: data._id, name: data.name, email: data.email, phone: data.phone };
    localStorage.setItem('astro_user_token', data.token);
    localStorage.setItem('astro_user', JSON.stringify(userData));
    setUser(userData);
    return data;
  };

  const loginUser = async (email, password) => {
    const { data } = await api.post('/users/login', { email, password });
    const userData = { _id: data._id, name: data.name, email: data.email, phone: data.phone };
    localStorage.setItem('astro_user_token', data.token);
    localStorage.setItem('astro_user', JSON.stringify(userData));
    setUser(userData);
    return data;
  };

  const logoutUser = () => {
    localStorage.removeItem('astro_user_token');
    localStorage.removeItem('astro_user');
    setUser(null);
  };

  return (
    <UserAuthContext.Provider value={{ user, userLoading, registerUser, loginUser, logoutUser }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserAuthContext);
