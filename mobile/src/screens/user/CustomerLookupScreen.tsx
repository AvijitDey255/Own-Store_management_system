import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../../store/hooks';
import { AppHeader } from '../../components/common/AppHeader';

export const CustomerLookupScreen: React.FC = () => {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  const customers = [
    { name: 'David Miller', phone: '+1 555-8392', points: '340 pts', visits: 14 },
    { name: 'Jessica Taylor', phone: '+1 555-4921', points: '1,120 pts', visits: 42 },
    { name: 'Liam Wilson', phone: '+1 555-9011', points: '80 pts', visits: 3 },
  ];

  const bgColor = isDark ? '#090d16' : '#f8fafc';
  const cardBg = isDark ? '#111827' : '#ffffff';
  const textColor = isDark ? '#f9fafb' : '#0f172a';
  const subTextColor = isDark ? '#9ca3af' : '#64748b';
  const borderColor = isDark ? '#1f2937' : '#e2e8f0';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]} edges={['top']}>
      <AppHeader title="Customer Directory" subtitle="Lookup Loyalty & Purchase History" canGoBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        {customers.map((c, i) => (
          <View key={i} style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
            <View style={styles.iconCircle}>
              <Ionicons name="person" size={20} color="#f59e0b" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.name, { color: textColor }]}>{c.name}</Text>
              <Text style={[styles.phone, { color: subTextColor }]}>{c.phone} • {c.visits} orders</Text>
            </View>
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsText}>{c.points}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fef3c7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  name: { fontSize: 15, fontWeight: '700' },
  phone: { fontSize: 12, marginTop: 3 },
  pointsBadge: { backgroundColor: '#fef3c7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 16 },
  pointsText: { color: '#b45309', fontSize: 12, fontWeight: '800' },
});
