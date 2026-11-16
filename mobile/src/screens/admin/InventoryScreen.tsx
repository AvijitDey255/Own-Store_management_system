import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../../store/hooks';
import { AppHeader } from '../../components/common/AppHeader';

export const InventoryScreen: React.FC = () => {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  const items = [
    { name: 'Wireless Barcode Scanner', sku: 'SKU-8921', stock: 45, status: 'In Stock', price: '$89.00' },
    { name: 'Thermal Receipt Rolls (50pk)', sku: 'SKU-1029', stock: 120, status: 'In Stock', price: '$35.00' },
    { name: 'Electronic Cash Drawer', sku: 'SKU-4412', stock: 4, status: 'Low Stock', price: '$120.00' },
    { name: 'Smart POS Display Terminal', sku: 'SKU-7721', stock: 18, status: 'In Stock', price: '$349.00' },
  ];

  const bgColor = isDark ? '#090d16' : '#f8fafc';
  const cardBg = isDark ? '#111827' : '#ffffff';
  const textColor = isDark ? '#f9fafb' : '#0f172a';
  const subTextColor = isDark ? '#9ca3af' : '#64748b';
  const borderColor = isDark ? '#1f2937' : '#e2e8f0';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]} edges={['top']}>
      <AppHeader title="Inventory & Stock" subtitle="Warehouse & Shelf Levels" canGoBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        {items.map((item, i) => (
          <View key={i} style={[styles.itemCard, { backgroundColor: cardBg, borderColor }]}>
            <View style={styles.topRow}>
              <Text style={[styles.name, { color: textColor }]}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
            <View style={styles.bottomRow}>
              <Text style={[styles.sku, { color: subTextColor }]}>{item.sku}</Text>
              <View style={[styles.statusBadge, { backgroundColor: item.stock <= 5 ? '#fef2f2' : '#ecfdf5' }]}>
                <Text style={{ color: item.stock <= 5 ? '#ef4444' : '#10b981', fontSize: 12, fontWeight: '700' }}>
                  {item.stock} units ({item.status})
                </Text>
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
  itemCard: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 15, fontWeight: '700', flex: 1, marginRight: 8 },
  price: { fontSize: 16, fontWeight: '800', color: '#6366f1' },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  sku: { fontSize: 12 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
});
