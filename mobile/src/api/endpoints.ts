import { apiClient } from './client';
import { API_ENDPOINTS } from '../constants/api';
import {
  AuthResponse,
  CustomerLoginRequest,
  CustomerVerifyOtpRequest,
  LoginRequest,
  User,
} from '../types';

export const authApi = {
  // Staff / Admin / User Login: POST /auth/login
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
      username: payload.username.trim(),
      password: payload.password,
    });
    return response.data;
  },

  // Logout: POST /auth/logout
  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch {
      // Even if server session invalidation fails, client will clear local session
    }
  },

  // Customer Login (OTP Request): POST /auth/customer/login
  async customerLogin(payload: CustomerLoginRequest): Promise<{ message?: string; success?: boolean }> {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.CUSTOMER_LOGIN, {
      emailOrMobile: payload.emailOrMobile.trim(),
    });
    return response.data;
  },

  // Customer Verify OTP: POST /auth/customer/verify-otp
  async customerVerifyOtp(payload: CustomerVerifyOtpRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.CUSTOMER_VERIFY_OTP, {
      emailOrMobile: payload.emailOrMobile.trim(),
      otp: payload.otp.trim(),
    });
    return response.data;
  },

  // Check already logged in & get user info: GET /user/me (or /api/user/me)
  async getMe(): Promise<User> {
    try {
      const response = await apiClient.get<User>(API_ENDPOINTS.USER.ME);
      return response.data;
    } catch {
      // Retry with alternative route prefix in case Spring Boot controller mapped with/without /api
      const fallbackResponse = await apiClient.get<User>(API_ENDPOINTS.USER.ME_ALT);
      return fallbackResponse.data;
    }
  },
};
