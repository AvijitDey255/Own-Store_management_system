import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../../store/hooks';

interface CustomInputProps extends TextInputProps {
  label: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  error?: string | null;
  isPassword?: boolean;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  iconName,
  error,
  isPassword = false,
  value,
  onChangeText,
  placeholder,
  ...rest
}) => {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const activeBorder = error
    ? '#ef4444'
    : isFocused
    ? '#6366f1'
    : isDark
    ? '#374151'
    : '#cbd5e1';

  const bgColor = isDark ? '#1f2937' : '#ffffff';
  const textColor = isDark ? '#f9fafb' : '#0f172a';
  const placeholderColor = isDark ? '#6b7280' : '#94a3b8';
  const iconColor = isFocused ? '#6366f1' : isDark ? '#9ca3af' : '#64748b';

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          { color: isDark ? '#d1d5db' : '#334155' },
        ]}
      >
        {label}
      </Text>

      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: bgColor,
            borderColor: activeBorder,
            shadowColor: isFocused ? '#6366f1' : '#000',
            shadowOpacity: isFocused ? 0.15 : 0.04,
          },
        ]}
      >
        {iconName && (
          <Ionicons
            name={iconName}
            size={20}
            color={iconColor}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize="none"
          {...rest}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.rightIcon}
            activeOpacity={0.7}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={iconColor}
            />
          </TouchableOpacity>
        )}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    padding: 6,
    marginLeft: 6,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontWeight: '500',
  },
});
