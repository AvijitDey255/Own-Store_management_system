import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../constants/api';
import { storage } from '../utils/storage';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Attach JWT Bearer Token if present
apiClient.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Format error message neatly
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; error?: string }>) => {
    let errorMessage = 'Network error. Please check your connection.';

    if (error.response) {
      errorMessage =
        error.response.data?.message ||
        error.response.data?.error ||
        `Server returned status ${error.response.status}`;
    } else if (error.request) {
      errorMessage = 'Unable to connect to backend server. Make sure the server is running on port 8081.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    return Promise.reject(new Error(errorMessage));
  }
);
