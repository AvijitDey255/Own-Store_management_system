import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../../store/hooks';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  iconName?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  iconName,
  style,
  textStyle,
}) => {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 4,
    }).start();
  };

  // Color schemes by variant
  let bg = '#4f46e5'; // primary
  let border = '#4f46e5';
  let textColor = '#ffffff';

  if (variant === 'secondary') {
    bg = isDark ? '#374151' : '#e2e8f0';
    border = isDark ? '#4b5563' : '#cbd5e1';
    textColor = isDark ? '#f9fafb' : '#1e293b';
  } else if (variant === 'outline') {
    bg = 'transparent';
    border = isDark ? '#4b5563' : '#cbd5e1';
    textColor = isDark ? '#e0e7ff' : '#4f46e5';
  } else if (variant === 'danger') {
    bg = '#ef4444';
    border = '#ef4444';
    textColor = '#ffffff';
  }

  const isInteractive = !loading && !disabled;

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={!isInteractive}
        style={[
          styles.button,
          {
            backgroundColor: isInteractive ? bg : isDark ? '#374151' : '#cbd5e1',
            borderColor: isInteractive ? border : isDark ? '#4b5563' : '#cbd5e1',
            opacity: disabled ? 0.6 : 1,
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={textColor} size="small" />
        ) : (
          <View style={styles.contentRow}>
            {iconName && (
              <Ionicons
                name={iconName}
                size={18}
                color={textColor}
                style={{ marginRight: 8 }}
              />
            )}
            <Text style={[styles.text, { color: textColor }, textStyle]}>
              {title}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 1.5,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
