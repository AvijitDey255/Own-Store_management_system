import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { PublicStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser } from '../../store/slices/authSlice';
import { CustomInput } from '../../components/common/CustomInput';
import { CustomButton } from '../../components/common/CustomButton';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import { showToast } from '../../components/toast/ToastConfig';

type Props = NativeStackScreenProps<PublicStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const validate = () => {
    const errs: { username?: string; password?: string } = {};
    if (!username.trim()) {
      errs.username = 'Please enter your username, email, or mobile';
    }
    if (!password) {
      errs.password = 'Please enter your password';
    }
    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) {
      showToast.error('Please fill in all required fields');
      return;
    }

    try {
      const resultAction = await dispatch(
        loginUser({
          username: username.trim(),
          password,
        })
      );

      if (loginUser.fulfilled.match(resultAction)) {
        showToast.success(
          `Welcome back, ${resultAction.payload.user?.name || 'User'}!`,
          'Login Successful'
        );
      } else if (loginUser.rejected.match(resultAction)) {
        const msg = (resultAction.payload as string) || 'Invalid login credentials';
        showToast.error(msg, 'Authentication Failed');
      }
    } catch (e: any) {
      showToast.error(e.message || 'An unexpected error occurred');
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Reset Password',
      'Please contact your store administrator or use self-service portal to reset your password.',
      [{ text: 'OK' }]
    );
  };

  const bgColor = isDark ? '#090d16' : '#f8fafc';
  const cardBg = isDark ? '#111827' : '#ffffff';
  const titleColor = isDark ? '#f9fafb' : '#0f172a';
  const subtitleColor = isDark ? '#9ca3af' : '#64748b';
  const borderColor = isDark ? '#1f2937' : '#e2e8f0';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Bar with Theme Toggle */}
          <View style={styles.topBar}>
            <View style={styles.brandBadge}>
              <Ionicons name="storefront" size={20} color="#6366f1" />
              <Text style={styles.brandBadgeText}>Store Management</Text>
            </View>
            <ThemeToggle size="sm" />
          </View>

          {/* Header Title */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: titleColor }]}>
              Account Login
            </Text>
            <Text style={[styles.subtitle, { color: subtitleColor }]}>
              Enter your username, email, or mobile number to continue
            </Text>
          </View>

          {/* Form Card */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: cardBg,
                borderColor: borderColor,
              },
            ]}
          >
            <CustomInput
              label="Username, Email or Mobile"
              placeholder="e.g. admin@store.com / 9876543210"
              iconName="person-outline"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                if (validationErrors.username) {
                  setValidationErrors((prev) => ({ ...prev, username: undefined }));
                }
              }}
              error={validationErrors.username}
              autoCapitalize="none"
            />

            <CustomInput
              label="Password"
              placeholder="Enter your password"
              iconName="lock-closed-outline"
              isPassword
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (validationErrors.password) {
                  setValidationErrors((prev) => ({ ...prev, password: undefined }));
                }
              }}
              error={validationErrors.password}
            />

            {/* Forgot Password Button */}
            <TouchableOpacity
              onPress={handleForgotPassword}
              style={styles.forgotBtn}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Submit Button */}
            <CustomButton
              title="Sign In"
              onPress={handleLogin}
              loading={isLoading}
              iconName="log-in-outline"
              style={{ marginTop: 8 }}
            />
          </View>

          {/* Switch to Customer Login */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: subtitleColor }]}>
              Are you a Customer?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('CustomerLogin')}
              style={styles.customerSwitchBtn}
              activeOpacity={0.7}
            >
              <Ionicons name="phone-portrait-outline" size={16} color="#6366f1" style={{ marginRight: 6 }} />
              <Text style={styles.customerSwitchText}>
                Customer Login with OTP
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexGrow: 1,
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  brandBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4f46e5',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 6,
    lineHeight: 20,
  },
  card: {
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 16,
    marginTop: -4,
  },
  forgotText: {
    color: '#6366f1',
    fontSize: 13,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 28,
    gap: 8,
  },
  footerText: {
    fontSize: 14,
  },
  customerSwitchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  customerSwitchText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '700',
  },
});
