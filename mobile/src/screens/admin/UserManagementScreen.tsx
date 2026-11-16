import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../../store/hooks';
import { AppHeader } from '../../components/common/AppHeader';
import { RoleBadge } from '../../components/common/RoleBadge';

export const UserManagementScreen: React.FC = () => {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  const mockUsers = [
    { name: 'Sarah Jenkins', email: 'sarah.j@store.com', mobile: '+1 555-0192', role: 'ADMIN' as const },
    { name: 'Alex Rivera', email: 'alex.r@store.com', mobile: '+1 555-0143', role: 'USER' as const },
    { name: 'Michael Chen', email: 'michael.c@store.com', mobile: '+1 555-0188', role: 'USER' as const },
    { name: 'Emma Watson', email: 'emma.w@gmail.com', mobile: '+1 555-0105', role: 'CUSTOMER' as const },
  ];

  const bgColor = isDark ? '#090d16' : '#f8fafc';
  const cardBg = isDark ? '#111827' : '#ffffff';
  const textColor = isDark ? '#f9fafb' : '#0f172a';
  const subTextColor = isDark ? '#9ca3af' : '#64748b';
  const borderColor = isDark ? '#1f2937' : '#e2e8f0';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]} edges={['top']}>
      <AppHeader title="User Management" subtitle="Staff & Customer Directory" canGoBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        {mockUsers.map((u, i) => (
          <View key={i} style={[styles.userCard, { backgroundColor: cardBg, borderColor }]}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{u.name.charAt(0)}</Text>
            </View>
            <View style={styles.info}>
              <Text style={[styles.name, { color: textColor }]}>{u.name}</Text>
              <Text style={[styles.sub, { color: subTextColor }]}>{u.email}</Text>
              <Text style={[styles.sub, { color: subTextColor }]}>{u.mobile}</Text>
            </View>
            <RoleBadge role={u.role} size="sm" />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scroll: { padding: 16 },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: { color: '#ffffff', fontSize: 18, fontWeight: '700' },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '700' },
  sub: { fontSize: 13, marginTop: 2 },
});
