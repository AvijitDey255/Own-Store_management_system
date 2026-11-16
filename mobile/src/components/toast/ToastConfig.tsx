import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast, { BaseToastProps } from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

interface CustomToastProps extends BaseToastProps {
  type: 'success' | 'error' | 'info';
}

export const CustomToast: React.FC<CustomToastProps> = ({ text1, text2, type }) => {
  const isSuccess = type === 'success';
  const isError = type === 'error';

  const iconName = isSuccess
    ? 'checkmark-circle'
    : isError
    ? 'alert-circle'
    : 'information-circle';

  const accentColor = isSuccess
    ? '#10b981' // emerald-500
    : isError
    ? '#ef4444' // red-500
    : '#6366f1'; // indigo-500

  const iconBg = isSuccess
    ? '#ecfdf5'
    : isError
    ? '#fef2f2'
    : '#eef2ff';

  return (
    <View style={styles.container}>
      <View style={[styles.card, { borderLeftColor: accentColor }]}>
        <View style={[styles.iconWrapper, { backgroundColor: iconBg }]}>
          <Ionicons name={iconName as any} size={22} color={accentColor} />
        </View>
        <View style={styles.content}>
          {text1 ? <Text style={styles.title}>{text1}</Text> : null}
          {text2 ? <Text style={styles.message}>{text2}</Text> : null}
        </View>
      </View>
    </View>
  );
};

export const toastConfig = {
  success: (props: BaseToastProps) => <CustomToast {...props} type="success" />,
  error: (props: BaseToastProps) => <CustomToast {...props} type="error" />,
  info: (props: BaseToastProps) => <CustomToast {...props} type="info" />,
};

// Helper utility to fire hot toasts from anywhere
export const showToast = {
  success: (message: string, title: string = 'Success') => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 3500,
      autoHide: true,
      topOffset: 55,
    });
  },
  error: (message: string, title: string = 'Error') => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 55,
    });
  },
  info: (message: string, title: string = 'Notice') => {
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 3500,
      autoHide: true,
      topOffset: 55,
    });
  },
};

const styles = StyleSheet.create({
  container: {
    width: '92%',
    maxWidth: 420,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b', // slate-800 dark floating card
    borderRadius: 14,
    borderLeftWidth: 5,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#f8fafc',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  message: {
    color: '#cbd5e1',
    fontSize: 13,
    marginTop: 2,
    lineHeight: 18,
  },
});
