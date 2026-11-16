import React, { useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { useAppSelector } from '../../store/hooks';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (otp: string) => void;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  value,
  onChange,
}) => {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  const inputRefs = useRef<Array<TextInput | null>>([]);
  const digits = value.split('').slice(0, length);
  while (digits.length < length) {
    digits.push('');
  }

  const handleDigitChange = (text: string, index: number) => {
    // If multiple digits pasted (e.g. from SMS)
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length > 1) {
      const newOtp = (value + cleaned).slice(0, length);
      onChange(newOtp);
      const targetIndex = Math.min(newOtp.length, length - 1);
      inputRefs.current[targetIndex]?.focus();
      return;
    }

    const currentDigit = cleaned.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = currentDigit;
    const newOtp = newDigits.join('');
    onChange(newOtp);

    // Auto-advance
    if (currentDigit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const boxBg = isDark ? '#1f2937' : '#ffffff';
  const boxBorder = isDark ? '#374151' : '#cbd5e1';
  const activeBorder = '#6366f1';
  const textColor = isDark ? '#f8fafc' : '#0f172a';

  return (
    <View style={styles.container}>
      {digits.map((digit, index) => {
        const isFilled = digit.length > 0;
        return (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            style={[
              styles.box,
              {
                backgroundColor: boxBg,
                borderColor: isFilled ? activeBorder : boxBorder,
                color: textColor,
              },
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleDigitChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            selectTextOnFocus
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
    gap: 8,
  },
  box: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});
