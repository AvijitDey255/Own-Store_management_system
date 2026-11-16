export type Role = 'ADMIN' | 'USER' | 'CUSTOMER';

export type ThemeMode = 'light' | 'dark';

export interface User {
  id?: string | number;
  name: string;
  email: string;
  mobile: string;
  role: Role;
}

export interface LoginRequest {
  username: string; // email / username / mobile
  password: string;
}

export interface CustomerLoginRequest {
  emailOrMobile: string;
}

export interface CustomerVerifyOtpRequest {
  emailOrMobile: string;
  otp: string;
}

export interface AuthResponse {
  token?: string;
  jwt?: string;
  accessToken?: string;
  user?: User;
  message?: string;
  name?: string;
  email?: string;
  mobile?: string;
  role?: Role;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitializing: boolean;
  error: string | null;
  pendingOtpIdentifier: string | null;
}
