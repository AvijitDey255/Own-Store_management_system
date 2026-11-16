import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../../store/hooks';
import { AppHeader } from '../../components/common/AppHeader';

export const CustomerDashboard: React.FC = () => {
  const navigation = useNavigation<any>();
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  const customerCards = [
    {
      title: 'My Orders',
      desc: 'Track recent purchases, delivery status & invoices',
      icon: 'receipt',
      screen: 'MyOrders',
      color: '#16a34a',
    },
    {
      title: 'Store Catalog',
      desc: 'Browse current specials, new arrivals & store inventory',
      icon: 'bag-handle',
      screen: 'StoreBrowse',
      color: '#0d9488',
    },
    {
      title: 'Customer Account',
      desc: 'Update email, phone number & loyalty preferences',
      icon: 'person-circle',
      screen: 'CustomerProfile',
      color: '#6366f1',
    },
  ];

  const bgColor = isDark ? '#090d16' : '#f8fafc';
  const cardBg = isDark ? '#111827' : '#ffffff';
  const textColor = isDark ? '#f9fafb' : '#0f172a';
  const subTextColor = isDark ? '#9ca3af' : '#64748b';
  const borderColor = isDark ? '#1f2937' : '#e2e8f0';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]} edges={['top']}>
      <AppHeader title="Customer Hub" subtitle="Your Orders & Rewards" canGoBack showRoleBadge />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Loyalty reward card */}
        <View style={styles.rewardsCard}>
          <View style={styles.rewardsTop}>
            <Text style={styles.rewardsTitle}>Store Rewards Member</Text>
            <Ionicons name="sparkles" size={20} color="#fbbf24" />
          </View>
          <Text style={styles.pointsCount}>480 Points</Text>
          <Text style={styles.pointsSub}>20 points away from your next $10 voucher!</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: textColor, marginTop: 20 }]}>
          Customer Services
        </Text>
        {customerCards.map((c, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => navigation.navigate(c.screen)}
            style={[styles.card, { backgroundColor: cardBg, borderColor }]}
            activeOpacity={0.7}
          >
            <View style={[styles.iconWrap, { backgroundColor: c.color + '20' }]}>
              <Ionicons name={c.icon as any} size={24} color={c.color} />
            </View>
            <View style={styles.content}>
              <Text style={[styles.title, { color: textColor }]}>{c.title}</Text>
              <Text style={[styles.desc, { color: subTextColor }]}>{c.desc}</Text>
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
  rewardsCard: {
    backgroundColor: '#15803d',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  rewardsTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rewardsTitle: { color: '#bbf7d0', fontSize: 13, fontWeight: '700', textTransform: 'uppercase' },
  pointsCount: { color: '#ffffff', fontSize: 32, fontWeight: '900', marginTop: 10 },
  pointsSub: { color: '#f0fdf4', fontSize: 13, marginTop: 4 },
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
