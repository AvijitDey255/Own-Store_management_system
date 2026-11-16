import { NavigatorScreenParams } from '@react-navigation/native';

export type PublicStackParamList = {
  Login: undefined;
  CustomerLogin: undefined;
  VerifyOtp: { emailOrMobile: string };
};

export type AuthenticatedStackParamList = {
  Home: undefined;
  // Admin screens
  AdminDashboard: undefined;
  UserManagement: undefined;
  StoreAnalytics: undefined;
  Inventory: undefined;
  // User/Staff screens
  StaffDashboard: undefined;
  SalesBilling: undefined;
  ProductCatalog: undefined;
  CustomerLookup: undefined;
  // Customer screens
  CustomerDashboard: undefined;
  MyOrders: undefined;
  StoreBrowse: undefined;
  CustomerProfile: undefined;
};

export type RootStackParamList = {
  Public: NavigatorScreenParams<PublicStackParamList>;
  App: NavigatorScreenParams<AuthenticatedStackParamList>;
};
