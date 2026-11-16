import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../../store/hooks';
import { AppHeader } from '../../components/common/AppHeader';
import { RoleBadge } from '../../components/common/RoleBadge';

export const CustomerProfileScreen: React.FC = () => {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const user = useAppSelector((state) => state.auth.user);
  const isDark = themeMode === 'dark';

  const bgColor = isDark ? '#090d16' : '#f8fafc';
  const cardBg = isDark ? '#111827' : '#ffffff';
  const textColor = isDark ? '#f9fafb' : '#0f172a';
  const subTextColor = isDark ? '#9ca3af' : '#64748b';
  const borderColor = isDark ? '#1f2937' : '#e2e8f0';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]} edges={['top']}>
      <AppHeader title="Customer Account" subtitle="Personal Profile" canGoBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.profileCard, { backgroundColor: cardBg, borderColor }]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(user?.name || 'C').charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={[styles.name, { color: textColor }]}>{user?.name || 'Customer'}</Text>
          <View style={{ marginTop: 6 }}>
            <RoleBadge role={user?.role || 'CUSTOMER'} size="sm" />
          </View>

          <View style={[styles.divider, { backgroundColor: borderColor }]} />

          <View style={styles.fieldRow}>
            <Ionicons name="mail-outline" size={18} color="#6366f1" style={{ marginRight: 10 }} />
            <Text style={[styles.fieldLabel, { color: subTextColor }]}>Email:</Text>
            <Text style={[styles.fieldVal, { color: textColor }]}>{user?.email || 'Not specified'}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Ionicons name="call-outline" size={18} color="#10b981" style={{ marginRight: 10 }} />
            <Text style={[styles.fieldLabel, { color: subTextColor }]}>Mobile:</Text>
            <Text style={[styles.fieldVal, { color: textColor }]}>{user?.mobile || 'Not specified'}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scroll: { padding: 16 },
  profileCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#16a34a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { color: '#ffffff', fontSize: 32, fontWeight: '800' },
  name: { fontSize: 20, fontWeight: '800' },
  divider: { width: '100%', height: 1, marginVertical: 20 },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
  },
  fieldLabel: { fontSize: 14, fontWeight: '600', marginRight: 8, width: 60 },
  fieldVal: { fontSize: 14, fontWeight: '500', flex: 1 },
});
