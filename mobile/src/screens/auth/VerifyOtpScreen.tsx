import React, { useState, useEffect } from 'react';
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
import {
  verifyCustomerOtp,
  requestCustomerOtp,
} from '../../store/slices/authSlice';
import { OtpInput } from '../../components/common/OtpInput';
import { CustomButton } from '../../components/common/CustomButton';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import { showToast } from '../../components/toast/ToastConfig';

type Props = NativeStackScreenProps<PublicStackParamList, 'VerifyOtp'>;

export const VerifyOtpScreen: React.FC<Props> = ({ route, navigation }) => {
  const { emailOrMobile } = route.params || { emailOrMobile: '' };
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Countdown timer for resend OTP
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      showToast.error('Please enter the complete 6-digit verification code.');
      return;
    }

    try {
      const resultAction = await dispatch(
        verifyCustomerOtp({
          emailOrMobile,
          otp,
        })
      );

      if (verifyCustomerOtp.fulfilled.match(resultAction)) {
        showToast.success(
          `Welcome, ${resultAction.payload.user?.name || 'Customer'}!`,
          'Verification Complete'
        );
      } else if (verifyCustomerOtp.rejected.match(resultAction)) {
        const errorMsg =
          (resultAction.payload as string) || 'Invalid or expired OTP code';
        showToast.error(errorMsg, 'Verification Failed');
      }
    } catch (e: any) {
      showToast.error(e.message || 'Verification failed');
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    setIsResending(true);
    try {
      const result = await dispatch(requestCustomerOtp({ emailOrMobile }));
      if (requestCustomerOtp.fulfilled.match(result)) {
        showToast.success('A new 6-digit code has been dispatched.', 'OTP Resent');
        setTimer(60);
        setCanResend(false);
        setOtp('');
      } else {
        const msg = (result.payload as string) || 'Could not resend OTP';
        showToast.error(msg, 'Resend Failed');
      }
    } finally {
      setIsResending(false);
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
              onPress={() => navigation.goBack()}
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
              <Ionicons name="shield-checkmark-outline" size={28} color="#16a34a" />
            </View>
            <Text style={[styles.title, { color: titleColor }]}>
              Verify 6-Digit OTP
            </Text>
            <Text style={[styles.subtitle, { color: subtitleColor }]}>
              We have transmitted an authentication code to{' '}
              <Text style={{ fontWeight: '700', color: isDark ? '#f9fafb' : '#0f172a' }}>
                {emailOrMobile}
              </Text>
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
            <Text
              style={[
                styles.boxLabel,
                { color: isDark ? '#cbd5e1' : '#334155' },
              ]}
            >
              Enter Code
            </Text>

            <OtpInput value={otp} onChange={setOtp} length={6} />

            <CustomButton
              title="Verify & Proceed"
              onPress={handleVerify}
              loading={isLoading}
              disabled={otp.length !== 6}
              iconName="checkmark-done"
              style={{ marginTop: 10 }}
            />

            {/* Reset / Resend OTP Action */}
            <View style={styles.resendRow}>
              {canResend ? (
                <TouchableOpacity
                  onPress={handleResendOtp}
                  disabled={isResending}
                  style={styles.resendBtn}
                  activeOpacity={0.7}
                >
                  <Ionicons name="refresh-outline" size={16} color="#6366f1" style={{ marginRight: 6 }} />
                  <Text style={styles.resendActiveText}>
                    {isResending ? 'Sending...' : 'Resend New OTP'}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.timerRow}>
                  <Ionicons name="time-outline" size={16} color="#94a3b8" style={{ marginRight: 6 }} />
                  <Text style={[styles.timerText, { color: subtitleColor }]}>
                    Resend OTP in {timer}s
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Change Destination */}
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CustomerLogin')}
              style={styles.changeBtn}
              activeOpacity={0.7}
            >
              <Text style={[styles.changeText, { color: subtitleColor }]}>
                Entered wrong email or mobile?{' '}
                <Text style={{ color: '#6366f1', fontWeight: '700' }}>
                  Change
                </Text>
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
    width: 56,
    height: 56,
    borderRadius: 28,
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
    lineHeight: 22,
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
  boxLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  resendRow: {
    marginTop: 20,
    alignItems: 'center',
  },
  resendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  resendActiveText: {
    color: '#6366f1',
    fontWeight: '700',
    fontSize: 14,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 13,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
  changeBtn: {
    paddingVertical: 8,
  },
  changeText: {
    fontSize: 13,
  },
});
