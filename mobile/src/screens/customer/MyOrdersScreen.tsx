import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../../store/hooks';
import { AppHeader } from '../../components/common/AppHeader';

export const MyOrdersScreen: React.FC = () => {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  const orders = [
    { orderId: '#ORD-8821', date: 'Yesterday, 4:15 PM', items: '2 items', total: '$42.50', status: 'Delivered' },
    { orderId: '#ORD-8710', date: 'Nov 12, 2026', items: '1 item', total: '$18.00', status: 'Delivered' },
    { orderId: '#ORD-8504', date: 'Oct 28, 2026', items: '4 items', total: '$94.20', status: 'Delivered' },
  ];

  const bgColor = isDark ? '#090d16' : '#f8fafc';
  const cardBg = isDark ? '#111827' : '#ffffff';
  const textColor = isDark ? '#f9fafb' : '#0f172a';
  const subTextColor = isDark ? '#9ca3af' : '#64748b';
  const borderColor = isDark ? '#1f2937' : '#e2e8f0';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]} edges={['top']}>
      <AppHeader title="My Orders" subtitle="Purchase Records & Receipts" canGoBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        {orders.map((o, i) => (
          <View key={i} style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
            <View style={styles.topRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="receipt-outline" size={18} color="#16a34a" style={{ marginRight: 6 }} />
                <Text style={[styles.orderId, { color: textColor }]}>{o.orderId}</Text>
              </View>
              <Text style={styles.total}>{o.total}</Text>
            </View>
            <View style={styles.bottomRow}>
              <Text style={[styles.date, { color: subTextColor }]}>{o.date} • {o.items}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{o.status}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scroll: { padding: 16 },
  card: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderId: { fontSize: 16, fontWeight: '700' },
  total: { fontSize: 16, fontWeight: '800', color: '#16a34a' },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  date: { fontSize: 13 },
  statusBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusText: { color: '#15803d', fontSize: 11, fontWeight: '800' },
});
