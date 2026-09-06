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
  if (!config.headers.Authorization) {
    const adminToken = localStorage.getItem('astro_admin_token');
    const userToken = localStorage.getItem('astro_user_token');

    // For user-specific endpoints, prioritize user token
    if (config.url && config.url.includes('/users/') && userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    } else if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    } else if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
  }
  return config;
});

export default api;
