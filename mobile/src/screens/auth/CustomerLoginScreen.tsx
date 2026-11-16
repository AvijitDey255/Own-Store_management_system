import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { PublicStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { requestCustomerOtp } from '../../store/slices/authSlice';
import { CustomInput } from '../../components/common/CustomInput';
import { CustomButton } from '../../components/common/CustomButton';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import { showToast } from '../../components/toast/ToastConfig';

type Props = NativeStackScreenProps<PublicStackParamList, 'CustomerLogin'>;

export const CustomerLoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [errorText, setErrorText] = useState<string | null>(null);

  const validate = () => {
    const val = emailOrMobile.trim();
    if (!val) {
      setErrorText('Please enter your email or mobile number');
      return false;
    }
    // Basic check: either contains '@' for email or digits for phone
    const isEmail = val.includes('@') && val.includes('.');
    const isDigitsOnly = /^[0-9+]{7,15}$/.test(val);
    if (!isEmail && !isDigitsOnly) {
      setErrorText('Please enter a valid email or 10-digit mobile number');
      return false;
    }
    setErrorText(null);
    return true;
  };

  const handleSendOtp = async () => {
    if (!validate()) {
      showToast.error('Please enter a valid email or mobile number');
      return;
    }

    try {
      const resultAction = await dispatch(
        requestCustomerOtp({ emailOrMobile: emailOrMobile.trim() })
      );

      if (requestCustomerOtp.fulfilled.match(resultAction)) {
        showToast.success(
          resultAction.payload.message || 'OTP sent successfully!',
          'OTP Dispatched'
        );
        navigation.navigate('VerifyOtp', {
          emailOrMobile: emailOrMobile.trim(),
        });
      } else if (requestCustomerOtp.rejected.match(resultAction)) {
        const msg = (resultAction.payload as string) || 'Could not send OTP';
        showToast.error(msg, 'Request Failed');
      }
    } catch (e: any) {
      showToast.error(e.message || 'An unexpected error occurred');
    }
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
          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={[
                styles.backBtn,
                { backgroundColor: isDark ? '#1f2937' : '#f1f5f9' },
              ]}
              activeOpacity={0.7}
            >
              <Ionicons
                name="arrow-back"
                size={20}
                color={isDark ? '#f9fafb' : '#0f172a'}
              />
            </TouchableOpacity>
            <ThemeToggle size="sm" />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Ionicons name="sparkles" size={26} color="#16a34a" />
            </View>
            <Text style={[styles.title, { color: titleColor }]}>
              Customer Sign In
            </Text>
            <Text style={[styles.subtitle, { color: subtitleColor }]}>
              Enter your registered email address or mobile number to receive a 6-digit verification code.
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
              label="Email or Mobile Number"
              placeholder="e.g. customer@example.com / 9876543210"
              iconName="mail-outline"
              value={emailOrMobile}
              onChangeText={(text) => {
                setEmailOrMobile(text);
                if (errorText) setErrorText(null);
              }}
              error={errorText}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <CustomButton
              title="Send Verification Code"
              onPress={handleSendOtp}
              loading={isLoading}
              iconName="paper-plane-outline"
              style={{ marginTop: 8 }}
            />
          </View>

          {/* Back to Staff Login */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: subtitleColor }]}>
              Store Staff or Administrator?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.staffSwitchBtn}
              activeOpacity={0.7}
            >
              <Ionicons name="key-outline" size={16} color="#6366f1" style={{ marginRight: 6 }} />
              <Text style={styles.staffSwitchText}>
                Password Login for Staff / Admin
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
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 8,
    lineHeight: 21,
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
  footer: {
    alignItems: 'center',
    marginTop: 32,
    gap: 8,
  },
  footerText: {
    fontSize: 14,
  },
  staffSwitchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  staffSwitchText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '700',
  },
});
