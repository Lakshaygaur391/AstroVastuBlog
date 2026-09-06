import axios from 'axios';

let rawBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Normalize: Ensure baseURL ends with /api even if user forgot to append it in Vercel
if (rawBaseURL && !rawBaseURL.endsWith('/api') && !rawBaseURL.endsWith('/api/')) {
  rawBaseURL = rawBaseURL.replace(/\/$/, '') + '/api';
}

const api = axios.create({
  baseURL: rawBaseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('astro_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
