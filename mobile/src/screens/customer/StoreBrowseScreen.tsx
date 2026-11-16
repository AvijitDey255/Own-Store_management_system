import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../../store/hooks';
import { AppHeader } from '../../components/common/AppHeader';

export const StoreBrowseScreen: React.FC = () => {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  const deals = [
    { title: 'Ethiopian Single Origin Beans 250g', price: '$13.99', tag: 'New Crop' },
    { title: 'Stainless Steel Gooseneck Kettle', price: '$45.00', tag: '20% Off' },
    { title: 'Aeropress Coffee Maker Pack', price: '$39.95', tag: 'Bestseller' },
  ];

  const bgColor = isDark ? '#090d16' : '#f8fafc';
  const cardBg = isDark ? '#111827' : '#ffffff';
  const textColor = isDark ? '#f9fafb' : '#0f172a';
  const subTextColor = isDark ? '#9ca3af' : '#64748b';
  const borderColor = isDark ? '#1f2937' : '#e2e8f0';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]} edges={['top']}>
      <AppHeader title="Store Catalog" subtitle="Browse Available Products" canGoBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        {deals.map((d, i) => (
          <View key={i} style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
            <View style={{ flex: 1 }}>
              <View style={styles.tagWrap}>
                <Text style={styles.tagText}>{d.tag}</Text>
              </View>
              <Text style={[styles.title, { color: textColor }]}>{d.title}</Text>
            </View>
            <Text style={styles.price}>{d.price}</Text>
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
    marginBottom: 12,
  },
  tagWrap: {
    alignSelf: 'flex-start',
    backgroundColor: '#ccfbf1',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  tagText: { color: '#0f766e', fontSize: 11, fontWeight: '700' },
  title: { fontSize: 15, fontWeight: '700' },
  price: { fontSize: 16, fontWeight: '800', color: '#0d9488' },
});
