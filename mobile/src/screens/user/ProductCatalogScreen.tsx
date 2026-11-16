import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../../store/hooks';
import { AppHeader } from '../../components/common/AppHeader';

export const ProductCatalogScreen: React.FC = () => {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  const products = [
    { name: 'Organic Colombian Supremo', category: 'Beverages', price: '$16.99', stock: 52 },
    { name: 'Handheld Milk Frother', category: 'Accessories', price: '$12.50', stock: 34 },
    { name: 'Double Wall Glass Mug (Set of 2)', category: 'Tableware', price: '$22.00', stock: 19 },
    { name: 'Cold Brew Infusion Pitcher 1L', category: 'Brewing', price: '$29.99', stock: 8 },
  ];

  const bgColor = isDark ? '#090d16' : '#f8fafc';
  const cardBg = isDark ? '#111827' : '#ffffff';
  const textColor = isDark ? '#f9fafb' : '#0f172a';
  const subTextColor = isDark ? '#9ca3af' : '#64748b';
  const borderColor = isDark ? '#1f2937' : '#e2e8f0';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]} edges={['top']}>
      <AppHeader title="Product Catalog" subtitle="Shelf Lookups & Barcodes" canGoBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        {products.map((p, i) => (
          <View key={i} style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.name, { color: textColor }]}>{p.name}</Text>
              <Text style={[styles.cat, { color: subTextColor }]}>{p.category} • {p.stock} in inventory</Text>
            </View>
            <Text style={styles.price}>{p.price}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
  },
  name: { fontSize: 15, fontWeight: '700' },
  cat: { fontSize: 12, marginTop: 4 },
  price: { fontSize: 16, fontWeight: '800', color: '#0284c7' },
});
