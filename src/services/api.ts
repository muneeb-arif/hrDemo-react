import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../utils/constants';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Add JWT token to headers
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem(TOKEN_STORAGE_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle 401 errors (auto-logout)
// Using lazy import to avoid circular dependency with store
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage and dispatch logout
      // Clear storage immediately
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      sessionStorage.removeItem(USER_STORAGE_KEY);
      
      // Lazy import to break circular dependency
      try {
        const { store } = await import('../store');
        const { logout } = await import('../store/slices/authSlice');
        store.dispatch(logout());
      } catch (e) {
        // If store is not available yet, storage is already cleared
        // Redirect will be handled by ProtectedRoute
      }
    }
    return Promise.reject(error);
  }
);

export default api;
