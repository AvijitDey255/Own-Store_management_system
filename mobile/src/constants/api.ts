/**
 * API Constants & Endpoints Configuration
 * Backend Base URL: http://localhost:8081/api
 */

export const BASE_URL = 'http://10.187.109.51:8080/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    CUSTOMER_LOGIN: '/auth/customer/login',
    CUSTOMER_VERIFY_OTP: '/auth/customer/verify-otp',
  },
  USER: {
    ME: '/user/me',
    ME_ALT: '/api/user/me',
  },
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@store_mgmt_auth_token',
  USER_DATA: '@store_mgmt_user_data',
  THEME_MODE: '@store_mgmt_theme_mode',
} as const;
