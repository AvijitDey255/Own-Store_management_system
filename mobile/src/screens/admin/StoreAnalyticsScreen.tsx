import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../../store/hooks';
import { AppHeader } from '../../components/common/AppHeader';

export const StoreAnalyticsScreen: React.FC = () => {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  const metrics = [
    { title: 'Gross Sales', amount: '$128,490', growth: '+14.2%', icon: 'trending-up', color: '#10b981' },
    { title: 'Avg Order Value', amount: '$84.50', growth: '+3.1%', icon: 'cart', color: '#6366f1' },
    { title: 'Customer Retention', amount: '78.4%', growth: '+5.7%', icon: 'heart', color: '#ec4899' },
    { title: 'Refund Rate', amount: '0.8%', growth: '-0.3%', icon: 'refresh', color: '#f59e0b' },
  ];

  const bgColor = isDark ? '#090d16' : '#f8fafc';
  const cardBg = isDark ? '#111827' : '#ffffff';
  const textColor = isDark ? '#f9fafb' : '#0f172a';
  const subTextColor = isDark ? '#9ca3af' : '#64748b';
  const borderColor = isDark ? '#1f2937' : '#e2e8f0';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]} edges={['top']}>
      <AppHeader title="Store Analytics" subtitle="Financial & Sales Intelligence" canGoBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        {metrics.map((m, i) => (
          <View key={i} style={[styles.metricCard, { backgroundColor: cardBg, borderColor }]}>
            <View style={[styles.iconWrap, { backgroundColor: m.color + '20' }]}>
              <Ionicons name={m.icon as any} size={22} color={m.color} />
            </View>
            <View style={styles.content}>
              <Text style={[styles.title, { color: subTextColor }]}>{m.title}</Text>
              <Text style={[styles.amount, { color: textColor }]}>{m.amount}</Text>
            </View>
            <Text style={[styles.growth, { color: '#10b981' }]}>{m.growth}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scroll: { padding: 16 },
  metricCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  content: { flex: 1 },
  title: { fontSize: 13, fontWeight: '500' },
  amount: { fontSize: 20, fontWeight: '800', marginTop: 2 },
  growth: { fontSize: 14, fontWeight: '700' },
});
