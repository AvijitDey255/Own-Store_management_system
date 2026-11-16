# Store Management System - Mobile Application

An Expo (SDK 57) mobile application styled with Tailwind CSS, powered by Redux Toolkit, featuring role-based dashboards (`ADMIN`, `USER`, `CUSTOMER`), animated light/dark mode persistence, and hot-toast feedback.

## 🚀 Key Features

- **Expo SDK 57**: Latest React Native 0.86 & React 19 architecture.
- **Tailwind CSS Styling**: Utility-first styling via `twrnc` with custom theme palette.
- **Redux Toolkit**: Centralized store with persistent authentication state (`authSlice`) and light/dark theme state (`themeSlice`).
- **Public Auth Routes**:
  - `/login`: Unified Staff/Admin password login (accepts username, email, or mobile) with "Forgot Password" option.
  - `/customer-login`: Customer passwordless login accepting email or mobile.
  - `/verify-otp`: 6-digit animated OTP input with 60-second countdown timer and "Resend OTP" capability.
- **Role-Based Workspaces**:
  - `ADMIN`: Control Hub, User Directory, Store Financial Analytics, Warehouse Inventory.
  - `USER` (Staff): Shift Terminal, POS Sales Checkout & Receipt generator, Product Catalog, Customer Directory.
  - `CUSTOMER`: Rewards Hub, My Orders & Invoices, Store Catalog & Specials, Account Profile.
- **Home Screen**:
  - Displays authenticated user profile: **Name**, **Email**, **Mobile**, and **Role**.
  - Dynamically renders role-specific quick action cards.
  - One-tap sign-out calling `POST /auth/logout` with state cleanup.
- **Light & Dark Mode**:
  - Animated sun/moon toggle button available on every screen.
  - Theme choice is automatically persisted to AsyncStorage.
- **Hot-Toast Feedback**:
  - Modern animated toast notifications (`showToast.success`, `showToast.error`, `showToast.info`) with custom icons and accent styling.

---

## 📡 API & Backend Configuration

Constant configuration is located at `src/constants/api.ts`:

- **Backend Base URL**: `http://localhost:8081/api`
  > *Note*: When testing on an Android Emulator, use `http://10.0.2.2:8081/api`. For a physical device on the same local Wi-Fi, use your computer's LAN IP (e.g., `http://192.168.1.X:8081/api`).

### API Endpoints Implemented

| Method | Endpoint | Description | Payload |
|---|---|---|---|
| `POST` | `/auth/login` | Staff / Admin / User Login | `{ "username": "...", "password": "..." }` |
| `POST` | `/auth/logout` | Invalidate Session | Header: `Authorization: Bearer <token>` |
| `POST` | `/auth/customer/login` | Send Customer 6-Digit OTP | `{ "emailOrMobile": "..." }` |
| `POST` | `/auth/customer/verify-otp` | Verify OTP Code | `{ "emailOrMobile": "...", "otp": "..." }` |
| `GET` | `/user/me` | Fetch Authenticated Profile | Header: `Authorization: Bearer <token>` |

---

## 📁 Folder Structure

```
mobile/
├── assets/                       # App icons and splash assets
├── src/
│   ├── api/
│   │   ├── client.ts             # Axios client with JWT interceptor & error formatting
│   │   └── endpoints.ts          # Strongly-typed auth and profile API endpoints
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppHeader.tsx     # Reusable header with title, back button, theme toggle
│   │   │   ├── CustomButton.tsx  # Spring-animated button with loading spinner
│   │   │   ├── CustomInput.tsx   # Floating input with icons and password toggle
│   │   │   ├── OtpInput.tsx      # 6-digit individual box inputs with auto-advance
│   │   │   ├── RoleBadge.tsx     # Color-coded badge for ADMIN, USER, CUSTOMER
│   │   │   ├── tailwind.ts       # Tailwind CSS configuration instance
│   │   │   └── ThemeToggle.tsx   # Animated Light/Dark mode toggle
│   │   └── toast/
│   │       └── ToastConfig.tsx   # Hot-toast banner config & helper utilities
│   ├── constants/
│   │   ├── api.ts                # Backend URL and endpoint paths
│   │   └── theme.ts              # Color palettes, role schemes & dimensions
│   ├── navigation/
│   │   ├── AppNavigator.tsx      # Public & Authenticated stacks with deep-linking
│   │   └── types.ts              # Strongly-typed navigation parameter lists
│   ├── screens/
│   │   ├── admin/                # ADMIN role folder structure
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── InventoryScreen.tsx
│   │   │   ├── StoreAnalyticsScreen.tsx
│   │   │   └── UserManagementScreen.tsx
│   │   ├── auth/                 # Public auth screens
│   │   │   ├── CustomerLoginScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   └── VerifyOtpScreen.tsx
│   │   ├── customer/             # CUSTOMER role folder structure
│   │   │   ├── CustomerDashboard.tsx
│   │   │   ├── CustomerProfileScreen.tsx
│   │   │   ├── MyOrdersScreen.tsx
│   │   │   └── StoreBrowseScreen.tsx
│   │   ├── home/
│   │   │   └── HomeScreen.tsx    # Unified Home displaying profile & role modules
│   │   └── user/                 # USER (Staff) role folder structure
│   │       ├── CustomerLookupScreen.tsx
│   │       ├── ProductCatalogScreen.tsx
│   │       ├── SalesBillingScreen.tsx
│   │       └── StaffDashboard.tsx
│   ├── store/
│   │   ├── hooks.ts              # Typed useAppDispatch & useAppSelector
│   │   ├── index.ts              # Redux configureStore
│   │   └── slices/
│   │       ├── authSlice.ts      # Authentication state, thunks, token storage
│   │       └── themeSlice.ts     # Dark/light mode persistence
│   ├── types/
│   │   └── index.ts              # TypeScript models (User, Role, AuthState)
│   └── utils/
│       └── storage.ts            # AsyncStorage persistence helpers
├── App.tsx                       # Redux Provider, Theme & Navigation Root
├── app.json                      # Expo application manifest
├── package.json                  # Dependencies & scripts
├── tailwind.config.js            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript compiler configuration
```

---

## 🏃 Running the Project

Start the development server:

```bash
npm start
```

Launch specific platforms:

```bash
npm run android   # Android device / emulator
npm run ios       # iOS simulator (macOS)
npm run web       # Web browser preview
```
