import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/api';
import { ThemeMode, User } from '../types';

export const storage = {
  // Token
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch {
      return null;
    }
  },

  async setToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (e) {
      console.error('Error saving auth token:', e);
    }
  },

  async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (e) {
      console.error('Error removing auth token:', e);
    }
  },

  // User
  async getUser(): Promise<User | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  async setUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    } catch (e) {
      console.error('Error saving user data:', e);
    }
  },

  async removeUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
    } catch (e) {
      console.error('Error removing user data:', e);
    }
  },

  // Theme
  async getTheme(): Promise<ThemeMode | null> {
    try {
      const mode = await AsyncStorage.getItem(STORAGE_KEYS.THEME_MODE);
      return (mode === 'dark' || mode === 'light') ? mode : null;
    } catch {
      return null;
    }
  },

  async setTheme(theme: ThemeMode): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME_MODE, theme);
    } catch (e) {
      console.error('Error saving theme:', e);
    }
  },

  // Clear all
  async clearAll(): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN),
        AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA),
      ]);
    } catch (e) {
      console.error('Error clearing storage:', e);
    }
  },
};
