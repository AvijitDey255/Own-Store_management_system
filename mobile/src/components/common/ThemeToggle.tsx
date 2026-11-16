import React, { useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTheme } from '../../store/slices/themeSlice';
import { showToast } from '../toast/ToastConfig';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ size = 'md' }) => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  const rotateAnim = useRef(new Animated.Value(isDark ? 1 : 0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleToggle = () => {
    // Animate scale & rotation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(rotateAnim, {
          toValue: isDark ? 0 : 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    dispatch(toggleTheme());
    showToast.info(
      isDark ? 'Switched to Light mode' : 'Switched to Dark mode',
      'Appearance'
    );
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const buttonSize = size === 'sm' ? 36 : size === 'lg' ? 48 : 42;
  const iconSize = size === 'sm' ? 18 : size === 'lg' ? 24 : 20;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleToggle}
      accessibilityRole="button"
      accessibilityLabel={`Toggle theme, currently ${themeMode}`}
      style={[
        styles.button,
        {
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 2,
          backgroundColor: isDark ? '#1f2937' : '#f1f5f9',
          borderColor: isDark ? '#374151' : '#e2e8f0',
        },
      ]}
    >
      <Animated.View
        style={{
          transform: [{ rotate: spin }, { scale: scaleAnim }],
        }}
      >
        <Ionicons
          name={isDark ? 'sunny' : 'moon'}
          size={iconSize}
          color={isDark ? '#fbbf24' : '#6366f1'}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
});
