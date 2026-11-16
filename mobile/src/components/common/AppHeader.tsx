import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../store/hooks';
import { ThemeToggle } from './ThemeToggle';
import { RoleBadge } from './RoleBadge';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  canGoBack?: boolean;
  showRoleBadge?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  canGoBack = false,
  showRoleBadge = false,
}) => {
  const navigation = useNavigation();
  const themeMode = useAppSelector((state) => state.theme.mode);
  const user = useAppSelector((state) => state.auth.user);
  const isDark = themeMode === 'dark';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#111827' : '#ffffff',
          borderBottomColor: isDark ? '#1f2937' : '#f1f5f9',
        },
      ]}
    >
      <View style={styles.leftCol}>
        {canGoBack && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              styles.backButton,
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
        )}
        <View style={styles.titleWrapper}>
          <Text
            style={[
              styles.title,
              { color: isDark ? '#f9fafb' : '#0f172a' },
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text
              style={[
                styles.subtitle,
                { color: isDark ? '#9ca3af' : '#64748b' },
              ]}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.rightCol}>
        {showRoleBadge && user?.role && (
          <View style={{ marginRight: 10 }}>
            <RoleBadge role={user.role} size="sm" />
          </View>
        )}
        <ThemeToggle size="sm" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 1,
  },
  rightCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
