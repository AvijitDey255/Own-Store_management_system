import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Role } from '../../types';
import { ROLE_CONFIG } from '../../constants/theme';
import { useAppSelector } from '../../store/hooks';

interface RoleBadgeProps {
  role: Role;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({
  role,
  size = 'md',
  showIcon = true,
}) => {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';
  const config = ROLE_CONFIG[role] || ROLE_CONFIG.USER;

  const bg = isDark ? config.badgeBgDark : config.badgeBgLight;
  const textColor = isDark ? config.badgeTextDark : config.badgeTextLight;

  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  const paddingH = isSmall ? 8 : isLarge ? 14 : 10;
  const paddingV = isSmall ? 4 : isLarge ? 8 : 6;
  const fontSize = isSmall ? 11 : isLarge ? 14 : 12;
  const iconSize = isSmall ? 12 : isLarge ? 16 : 14;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bg,
          paddingHorizontal: paddingH,
          paddingVertical: paddingV,
          borderColor: config.accentColor + '40',
        },
      ]}
    >
      {showIcon && (
        <Ionicons
          name={config.icon as any}
          size={iconSize}
          color={textColor}
          style={{ marginRight: 5 }}
        />
      )}
      <Text
        style={[
          styles.text,
          {
            color: textColor,
            fontSize,
          },
        ]}
      >
        {role}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 9999,
    borderWidth: 1,
  },
  text: {
    fontWeight: '800',
    letterSpacing: 0.6,
  },
});
