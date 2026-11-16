import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../../store/hooks';
import { AppHeader } from '../../components/common/AppHeader';

export const StaffDashboard: React.FC = () => {
  const navigation = useNavigation<any>();
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  const modules = [
    {
      title: 'POS & Sales Checkout',
      desc: 'Process customer cart, scan barcodes & generate receipts',
      icon: 'receipt',
      screen: 'SalesBilling',
      color: '#0284c7',
    },
    {
      title: 'Product Catalog',
      desc: 'Browse product database, check shelf prices & stock info',
      icon: 'pricetags',
      screen: 'ProductCatalog',
      color: '#10b981',
    },
    {
      title: 'Customer Directory',
      desc: 'Lookup customer orders, loyalty points & purchase records',
      icon: 'person-search',
      screen: 'CustomerLookup',
      color: '#f59e0b',
    },
  ];

  const bgColor = isDark ? '#090d16' : '#f8fafc';
  const cardBg = isDark ? '#111827' : '#ffffff';
  const textColor = isDark ? '#f9fafb' : '#0f172a';
  const subTextColor = isDark ? '#9ca3af' : '#64748b';
  const borderColor = isDark ? '#1f2937' : '#e2e8f0';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]} edges={['top']}>
      <AppHeader title="Staff Terminal" subtitle="Point of Sale & Store Operations" canGoBack showRoleBadge />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.banner}>
          <Ionicons name="flash" size={24} color="#0284c7" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.bannerTitle}>Shift Active</Text>
            <Text style={styles.bannerSub}>Register #04 • Terminal Connected to Spring Boot API</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: textColor, marginTop: 18 }]}>
          Staff Operations
        </Text>
        {modules.map((m, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => navigation.navigate(m.screen)}
            style={[styles.card, { backgroundColor: cardBg, borderColor }]}
            activeOpacity={0.7}
          >
            <View style={[styles.iconWrap, { backgroundColor: m.color + '20' }]}>
              <Ionicons name={m.icon as any} size={24} color={m.color} />
            </View>
            <View style={styles.content}>
              <Text style={[styles.title, { color: textColor }]}>{m.title}</Text>
              <Text style={[styles.desc, { color: subTextColor }]}>{m.desc}</Text>
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
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  bannerTitle: { fontSize: 15, fontWeight: '700', color: '#0369a1' },
  bannerSub: { fontSize: 12, color: '#0284c7', marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700' },
  desc: { fontSize: 13, marginTop: 2, lineHeight: 18 },
});
