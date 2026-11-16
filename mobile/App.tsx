import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';

import { store } from './src/store';
import { useAppSelector } from './src/store/hooks';
import { AppNavigator } from './src/navigation/AppNavigator';
import { toastConfig } from './src/components/toast/ToastConfig';

function MainApp() {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AppNavigator />
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
