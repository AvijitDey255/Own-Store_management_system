import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../../store/hooks';
import { AppHeader } from '../../components/common/AppHeader';
import { CustomButton } from '../../components/common/CustomButton';
import { showToast } from '../../components/toast/ToastConfig';

export const SalesBillingScreen: React.FC = () => {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  const [cart, setCart] = useState([
    { id: '1', name: 'Premium Arabica Beans 500g', qty: 2, price: 14.50 },
    { id: '2', name: 'Ceramic Pour-over Dripper', qty: 1, price: 28.00 },
    { id: '3', name: 'Stainless Milk Pitcher', qty: 1, price: 18.00 },
  ]);

  const subtotal = cart.reduce((acc, it) => acc + it.price * it.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = () => {
    showToast.success(`Receipt #ORD-9021 issued for $${total.toFixed(2)}`, 'Payment Settled');
  };

  const bgColor = isDark ? '#090d16' : '#f8fafc';
  const cardBg = isDark ? '#111827' : '#ffffff';
  const textColor = isDark ? '#f9fafb' : '#0f172a';
  const subTextColor = isDark ? '#9ca3af' : '#64748b';
  const borderColor = isDark ? '#1f2937' : '#e2e8f0';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]} edges={['top']}>
      <AppHeader title="POS Sales Checkout" subtitle="Current Transaction" canGoBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Cart Items</Text>
        {cart.map((item) => (
          <View key={item.id} style={[styles.cartItem, { backgroundColor: cardBg, borderColor }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.itemName, { color: textColor }]}>{item.name}</Text>
              <Text style={[styles.itemQty, { color: subTextColor }]}>Qty: {item.qty} × ${item.price.toFixed(2)}</Text>
            </View>
            <Text style={styles.itemTotal}>${(item.qty * item.price).toFixed(2)}</Text>
          </View>
        ))}

        {/* Receipt summary */}
        <View style={[styles.summaryCard, { backgroundColor: cardBg, borderColor }]}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: subTextColor }]}>Subtotal</Text>
            <Text style={[styles.summaryVal, { color: textColor }]}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: subTextColor }]}>Tax (8%)</Text>
            <Text style={[styles.summaryVal, { color: textColor }]}>${tax.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow, { borderTopColor: borderColor }]}>
            <Text style={[styles.totalLabel, { color: textColor }]}>Total Due</Text>
            <Text style={styles.totalVal}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <CustomButton
          title="Charge & Print Receipt"
          onPress={handleCheckout}
          iconName="card-outline"
          style={{ marginTop: 20 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scroll: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  itemName: { fontSize: 14, fontWeight: '700' },
  itemQty: { fontSize: 12, marginTop: 3 },
  itemTotal: { fontSize: 15, fontWeight: '800', color: '#0284c7' },
  summaryCard: { padding: 16, borderRadius: 14, borderWidth: 1, marginTop: 14 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14 },
  summaryVal: { fontSize: 14, fontWeight: '600' },
  totalRow: { borderTopWidth: 1, paddingTop: 10, marginTop: 6, marginBottom: 0 },
  totalLabel: { fontSize: 16, fontWeight: '800' },
  totalVal: { fontSize: 18, fontWeight: '900', color: '#0284c7' },
});
