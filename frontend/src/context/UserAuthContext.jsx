import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const UserAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('astro_user_token');
    if (!token) {
      setUserLoading(false);
      return;
    }
    // Verify token with backend
    api
      .get('/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('astro_user_token');
        setUser(null);
      })
      .finally(() => setUserLoading(false));
  }, []);

  const registerUser = async (name, email, phone, password) => {
    const { data } = await api.post('/users/register', { name, email, phone, password });
    localStorage.setItem('astro_user_token', data.token);
    setUser({ _id: data._id, name: data.name, email: data.email, phone: data.phone });
    return data;
  };

  const loginUser = async (email, password) => {
    const { data } = await api.post('/users/login', { email, password });
    localStorage.setItem('astro_user_token', data.token);
    setUser({ _id: data._id, name: data.name, email: data.email, phone: data.phone });
    return data;
  };

  const logoutUser = () => {
    localStorage.removeItem('astro_user_token');
    setUser(null);
  };

  return (
    <UserAuthContext.Provider value={{ user, userLoading, registerUser, loginUser, logoutUser }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserAuthContext);
