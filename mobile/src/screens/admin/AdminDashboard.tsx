import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../../store/hooks';
import { AppHeader } from '../../components/common/AppHeader';

export const AdminDashboard: React.FC = () => {
  const navigation = useNavigation<any>();
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  const stats = [
    { label: 'Total Revenue', value: '$48,250', change: '+12.5%', icon: 'cash-outline', color: '#10b981' },
    { label: 'Active Users', value: '1,420', change: '+8.2%', icon: 'people-outline', color: '#6366f1' },
    { label: 'Inventory Items', value: '3,840', change: '-2.1%', icon: 'cube-outline', color: '#f59e0b' },
    { label: 'Store Orders', value: '624', change: '+18.4%', icon: 'cart-outline', color: '#ec4899' },
  ];

  const adminModules = [
    {
      title: 'User Management',
      desc: 'Manage staff, assign roles, access permissions & audit logs',
      icon: 'people',
      screen: 'UserManagement',
      color: '#8b5cf6',
    },
    {
      title: 'Store Analytics',
      desc: 'Real-time sales performance, revenue trends & reports',
      icon: 'stats-chart',
      screen: 'StoreAnalytics',
      color: '#3b82f6',
    },
    {
      title: 'Inventory & Stock',
      desc: 'Track warehouse items, low-stock alerts & suppliers',
      icon: 'cube',
      screen: 'Inventory',
      color: '#10b981',
    },
  ];

  const bgColor = isDark ? '#090d16' : '#f8fafc';
  const cardBg = isDark ? '#111827' : '#ffffff';
  const textColor = isDark ? '#f9fafb' : '#0f172a';
  const subTextColor = isDark ? '#9ca3af' : '#64748b';
  const borderColor = isDark ? '#1f2937' : '#e2e8f0';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]} edges={['top']}>
      <AppHeader title="Admin Portal" subtitle="Store Governance & Operations" canGoBack showRoleBadge />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* KPI Grid */}
        <Text style={[styles.sectionTitle, { color: textColor }]}>Store Performance</Text>
        <View style={styles.statsGrid}>
          {stats.map((s, idx) => (
            <View
              key={idx}
              style={[
                styles.statCard,
                { backgroundColor: cardBg, borderColor },
              ]}
            >
              <View style={[styles.statIcon, { backgroundColor: s.color + '20' }]}>
                <Ionicons name={s.icon as any} size={20} color={s.color} />
              </View>
              <Text style={[styles.statVal, { color: textColor }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: subTextColor }]}>{s.label}</Text>
              <Text style={[styles.statChange, { color: s.change.startsWith('+') ? '#10b981' : '#ef4444' }]}>
                {s.change} this month
              </Text>
            </View>
          ))}
        </View>

        {/* Modules */}
        <Text style={[styles.sectionTitle, { color: textColor, marginTop: 24 }]}>
          Administrative Modules
        </Text>
        {adminModules.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => navigation.navigate(item.screen)}
            style={[
              styles.moduleCard,
              { backgroundColor: cardBg, borderColor },
            ]}
            activeOpacity={0.7}
          >
            <View style={[styles.moduleIcon, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon as any} size={24} color={item.color} />
            </View>
            <View style={styles.moduleText}>
              <Text style={[styles.moduleTitle, { color: textColor }]}>{item.title}</Text>
              <Text style={[styles.moduleDesc, { color: subTextColor }]}>{item.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={subTextColor} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scroll: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statCard: {
    width: '48%',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statVal: { fontSize: 18, fontWeight: '800' },
  statLabel: { fontSize: 12, marginTop: 2 },
  statChange: { fontSize: 11, fontWeight: '600', marginTop: 4 },
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  moduleIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  moduleText: { flex: 1 },
  moduleTitle: { fontSize: 16, fontWeight: '700' },
  moduleDesc: { fontSize: 13, marginTop: 2, lineHeight: 18 },
});
