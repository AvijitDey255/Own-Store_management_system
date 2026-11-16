import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  LinkingOptions,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { checkAuthSession } from '../store/slices/authSlice';
import { loadSavedTheme } from '../store/slices/themeSlice';

// Public screens
import { LoginScreen } from '../screens/auth/LoginScreen';
import { CustomerLoginScreen } from '../screens/auth/CustomerLoginScreen';
import { VerifyOtpScreen } from '../screens/auth/VerifyOtpScreen';

// Home screen
import { HomeScreen } from '../screens/home/HomeScreen';

// Admin screens
import { AdminDashboard } from '../screens/admin/AdminDashboard';
import { UserManagementScreen } from '../screens/admin/UserManagementScreen';
import { StoreAnalyticsScreen } from '../screens/admin/StoreAnalyticsScreen';
import { InventoryScreen } from '../screens/admin/InventoryScreen';

// User / Staff screens
import { StaffDashboard } from '../screens/user/StaffDashboard';
import { SalesBillingScreen } from '../screens/user/SalesBillingScreen';
import { ProductCatalogScreen } from '../screens/user/ProductCatalogScreen';
import { CustomerLookupScreen } from '../screens/user/CustomerLookupScreen';

// Customer screens
import { CustomerDashboard } from '../screens/customer/CustomerDashboard';
import { MyOrdersScreen } from '../screens/customer/MyOrdersScreen';
import { StoreBrowseScreen } from '../screens/customer/StoreBrowseScreen';
import { CustomerProfileScreen } from '../screens/customer/CustomerProfileScreen';

import {
  PublicStackParamList,
  AuthenticatedStackParamList,
} from './types';

const PublicStack = createNativeStackNavigator<PublicStackParamList>();
const AuthStack = createNativeStackNavigator<AuthenticatedStackParamList>();

// Public route linking config
const linking: LinkingOptions<any> = {
  prefixes: ['storeapp://', 'http://localhost:8081', 'exp://'],
  config: {
    screens: {
      Login: 'login',
      CustomerLogin: 'customer-login',
      VerifyOtp: 'verify-otp',
      Home: 'home',
    },
  },
};

export const AppNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isInitializing } = useAppSelector((state) => state.auth);
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  useEffect(() => {
    // Initialize persisted theme & check active session
    dispatch(loadSavedTheme());
    dispatch(checkAuthSession());
  }, [dispatch]);

  const navTheme = isDark
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: '#090d16',
          card: '#111827',
          text: '#f9fafb',
          border: '#1f2937',
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#f8fafc',
          card: '#ffffff',
          text: '#0f172a',
          border: '#e2e8f0',
        },
      };

  // Initializing Splash
  if (isInitializing) {
    return (
      <View
        style={[
          styles.splashContainer,
          { backgroundColor: isDark ? '#090d16' : '#f8fafc' },
        ]}
      >
        <View style={styles.splashIcon}>
          <Ionicons name="storefront" size={48} color="#6366f1" />
        </View>
        <Text style={[styles.splashTitle, { color: isDark ? '#f9fafb' : '#0f172a' }]}>
          Store Management
        </Text>
        <Text style={[styles.splashSubtitle, { color: isDark ? '#9ca3af' : '#64748b' }]}>
          Connecting to store backend...
        </Text>
        <ActivityIndicator
          size="small"
          color="#6366f1"
          style={{ marginTop: 24 }}
        />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navTheme} linking={linking}>
      {isAuthenticated ? (
        <AuthStack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          {/* Unified Home */}
          <AuthStack.Screen name="Home" component={HomeScreen} />

          {/* Admin screens */}
          <AuthStack.Screen name="AdminDashboard" component={AdminDashboard} />
          <AuthStack.Screen name="UserManagement" component={UserManagementScreen} />
          <AuthStack.Screen name="StoreAnalytics" component={StoreAnalyticsScreen} />
          <AuthStack.Screen name="Inventory" component={InventoryScreen} />

          {/* User/Staff screens */}
          <AuthStack.Screen name="StaffDashboard" component={StaffDashboard} />
          <AuthStack.Screen name="SalesBilling" component={SalesBillingScreen} />
          <AuthStack.Screen name="ProductCatalog" component={ProductCatalogScreen} />
          <AuthStack.Screen name="CustomerLookup" component={CustomerLookupScreen} />

          {/* Customer screens */}
          <AuthStack.Screen name="CustomerDashboard" component={CustomerDashboard} />
          <AuthStack.Screen name="MyOrders" component={MyOrdersScreen} />
          <AuthStack.Screen name="StoreBrowse" component={StoreBrowseScreen} />
          <AuthStack.Screen name="CustomerProfile" component={CustomerProfileScreen} />
        </AuthStack.Navigator>
      ) : (
        <PublicStack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
        >
          <PublicStack.Screen name="Login" component={LoginScreen} />
          <PublicStack.Screen name="CustomerLogin" component={CustomerLoginScreen} />
          <PublicStack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
        </PublicStack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  splashIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  splashTitle: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  splashSubtitle: {
    fontSize: 14,
    marginTop: 6,
  },
});
