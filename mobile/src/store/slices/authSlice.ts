import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../api/endpoints';
import {
  AuthState,
  CustomerLoginRequest,
  CustomerVerifyOtpRequest,
  LoginRequest,
  Role,
  User,
} from '../../types';
import { storage } from '../../utils/storage';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isInitializing: true,
  error: null,
  pendingOtpIdentifier: null,
};

// Check if user is already logged in on app startup
export const checkAuthSession = createAsyncThunk(
  'auth/checkAuthSession',
  async (_, { rejectWithValue }) => {
    try {
      const token = await storage.getToken();
      if (!token) {
        return null;
      }

      // Fetch fresh profile from /user/me
      const user = await authApi.getMe();
      await storage.setUser(user);
      return { token, user };
    } catch (error: any) {
      await storage.clearAll();
      return rejectWithValue(error.message || 'Session expired');
    }
  }
);

// Staff/Admin/User Login: POST /auth/login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      const token = response.token || response.jwt || response.accessToken || '';

      if (!token) {
        throw new Error('Authentication succeeded but no token was provided.');
      }

      await storage.setToken(token);

      // Resolve user details
      let user: User;
      if (response.user) {
        user = response.user;
      } else if (response.role && response.name) {
        user = {
          name: response.name,
          email: response.email || '',
          mobile: response.mobile || '',
          role: response.role,
        };
      } else {
        // Fetch current user details via /user/me
        user = await authApi.getMe();
      }

      await storage.setUser(user);
      return { token, user };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed. Please verify your credentials.');
    }
  }
);

// Customer Login OTP Request: POST /auth/customer/login
export const requestCustomerOtp = createAsyncThunk(
  'auth/requestCustomerOtp',
  async (payload: CustomerLoginRequest, { rejectWithValue }) => {
    try {
      const response = await authApi.customerLogin(payload);
      return {
        emailOrMobile: payload.emailOrMobile,
        message: response.message || 'OTP sent successfully to your registered email/mobile.',
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to send OTP. Please check your email or mobile.');
    }
  }
);

// Customer Verify OTP: POST /auth/customer/verify-otp
export const verifyCustomerOtp = createAsyncThunk(
  'auth/verifyCustomerOtp',
  async (payload: CustomerVerifyOtpRequest, { rejectWithValue }) => {
    try {
      const response = await authApi.customerVerifyOtp(payload);
      const token = response.token || response.jwt || response.accessToken || '';

      if (!token) {
        throw new Error('Verification succeeded but no auth token was returned.');
      }

      await storage.setToken(token);

      let user: User;
      if (response.user) {
        user = response.user;
      } else if (response.role) {
        user = {
          name: response.name || 'Customer',
          email: response.email || (payload.emailOrMobile.includes('@') ? payload.emailOrMobile : ''),
          mobile: response.mobile || (!payload.emailOrMobile.includes('@') ? payload.emailOrMobile : ''),
          role: (response.role as Role) || 'CUSTOMER',
        };
      } else {
        // Attempt to fetch profile or fallback to verified customer data
        try {
          user = await authApi.getMe();
        } catch {
          user = {
            name: response.name || 'Customer',
            email: payload.emailOrMobile.includes('@') ? payload.emailOrMobile : '',
            mobile: !payload.emailOrMobile.includes('@') ? payload.emailOrMobile : '',
            role: 'CUSTOMER',
          };
        }
      }

      await storage.setUser(user);
      return { token, user };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Invalid or expired OTP. Please try again.');
    }
  }
);

// Logout: POST /auth/logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await authApi.logout();
  await storage.clearAll();
  return null;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    setPendingOtpIdentifier: (state, action: PayloadAction<string | null>) => {
      state.pendingOtpIdentifier = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Check Session
    builder
      .addCase(checkAuthSession.pending, (state) => {
        state.isInitializing = true;
      })
      .addCase(checkAuthSession.fulfilled, (state, action) => {
        state.isInitializing = false;
        if (action.payload) {
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
          state.token = null;
          state.user = null;
        }
      })
      .addCase(checkAuthSession.rejected, (state) => {
        state.isInitializing = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      });

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Request Customer OTP
    builder
      .addCase(requestCustomerOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestCustomerOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingOtpIdentifier = action.payload.emailOrMobile;
        state.error = null;
      })
      .addCase(requestCustomerOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Verify Customer OTP
    builder
      .addCase(verifyCustomerOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyCustomerOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.pendingOtpIdentifier = null;
        state.error = null;
      })
      .addCase(verifyCustomerOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
        state.pendingOtpIdentifier = null;
      });
  },
});

export const { clearAuthError, setPendingOtpIdentifier } = authSlice.actions;
export default authSlice.reducer;
