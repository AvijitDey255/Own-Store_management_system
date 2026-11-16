import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutUser } from '../../store/slices/authSlice';
import { RoleBadge } from '../../components/common/RoleBadge';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import { CustomButton } from '../../components/common/CustomButton';
import { showToast } from '../../components/toast/ToastConfig';
import { ROLE_CONFIG } from '../../constants/theme';
import { Role } from '../../types';

export const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  const { user } = useAppSelector((state) => state.auth);
  const themeMode = useAppSelector((state) => state.theme.mode);
  const isDark = themeMode === 'dark';

  const userRole: Role = user?.role || 'USER';
  const roleConfig = ROLE_CONFIG[userRole] || ROLE_CONFIG.USER;

  const handleLogout = () => {
    Alert.alert(
      'Confirm Sign Out',
      'Are you sure you wish to log out from this device?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await dispatch(logoutUser());
            showToast.success('You have been signed out successfully.', 'Session Closed');
          },
        },
      ]
    );
  };

  // Role-specific action tiles based on user role
  const getRoleActions = () => {
    switch (userRole) {
      case 'ADMIN':
        return [
          {
            title: 'Admin Control Hub',
            desc: 'System health, KPIs and business overview',
            icon: 'shield-checkmark',
            screen: 'AdminDashboard',
            color: '#9333ea',
          },
          {
            title: 'User Management',
            desc: 'Manage staff, roles & system credentials',
            icon: 'people',
            screen: 'UserManagement',
            color: '#8b5cf6',
          },
          {
            title: 'Store Analytics',
            desc: 'Sales performance & financial reports',
            icon: 'stats-chart',
            screen: 'StoreAnalytics',
            color: '#3b82f6',
          },
          {
            title: 'Inventory & Warehousing',
            desc: 'Real-time stock levels & low-stock triggers',
            icon: 'cube',
            screen: 'Inventory',
            color: '#10b981',
          },
        ];

      case 'USER':
        return [
          {
            title: 'Staff Register',
            desc: 'Active shift console & daily metrics',
            icon: 'briefcase',
            screen: 'StaffDashboard',
            color: '#0284c7',
          },
          {
            title: 'POS Sales Checkout',
            desc: 'Process cart, issue bills & print receipts',
            icon: 'receipt',
            screen: 'SalesBilling',
            color: '#2563eb',
          },
          {
            title: 'Product Catalog',
            desc: 'Price inquiries & in-store item lookup',
            icon: 'pricetags',
            screen: 'ProductCatalog',
            color: '#10b981',
          },
          {
            title: 'Customer Directory',
            desc: 'Look up orders & loyalty balances',
            icon: 'person-search',
            screen: 'CustomerLookup',
            color: '#f59e0b',
          },
        ];

      case 'CUSTOMER':
      default:
        return [
          {
            title: 'Customer Hub',
            desc: 'Membership card & rewards summary',
            icon: 'sparkles',
            screen: 'CustomerDashboard',
            color: '#16a34a',
          },
          {
            title: 'My Orders & Invoices',
            desc: 'View recent purchases and delivery tracking',
            icon: 'receipt',
            screen: 'MyOrders',
            color: '#0d9488',
          },
          {
            title: 'Store Catalog & Deals',
            desc: 'Explore popular products & special offers',
            icon: 'bag-handle',
            screen: 'StoreBrowse',
            color: '#0284c7',
          },
          {
            title: 'Account Settings',
            desc: 'Manage contact details & notification options',
            icon: 'person-circle',
            screen: 'CustomerProfile',
            color: '#6366f1',
          },
        ];
    }
  };

  const roleActions = getRoleActions();

  const bgColor = isDark ? '#090d16' : '#f8fafc';
  const cardBg = isDark ? '#111827' : '#ffffff';
  const textColor = isDark ? '#f9fafb' : '#0f172a';
  const subTextColor = isDark ? '#9ca3af' : '#64748b';
  const borderColor = isDark ? '#1f2937' : '#e2e8f0';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]} edges={['top']}>
      {/* Top Header */}
      <View
        style={[
          styles.headerRow,
          {
            backgroundColor: cardBg,
            borderBottomColor: borderColor,
          },
        ]}
      >
        <View style={styles.brandGroup}>
          <View style={[styles.logoBadge, { backgroundColor: roleConfig.accentColor + '20' }]}>
            <Ionicons name="storefront" size={20} color={roleConfig.accentColor} />
          </View>
          <Text style={[styles.brandText, { color: textColor }]}>Store Portal</Text>
        </View>

        <View style={styles.headerRight}>
          <ThemeToggle size="sm" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Profile Card */}
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: cardBg,
              borderColor: borderColor,
            },
          ]}
        >
          <View style={styles.profileTop}>
            <View
              style={[
                styles.avatarCircle,
                { backgroundColor: roleConfig.accentColor },
              ]}
            >
              <Text style={styles.avatarInitials}>
                {(user?.name || 'U').charAt(0).toUpperCase()}
              </Text>
            </View>

            <View style={styles.profileInfo}>
              <Text style={[styles.userName, { color: textColor }]}>
                {user?.name || 'Authorized User'}
              </Text>
              <View style={{ marginTop: 4 }}>
                <RoleBadge role={userRole} size="sm" />
              </View>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: borderColor }]} />

          {/* User Details Details: Name, Email, Mobile, Role */}
          <View style={styles.detailList}>
            <View style={styles.detailItem}>
              <View style={[styles.detailIcon, { backgroundColor: '#eef2ff' }]}>
                <Ionicons name="person-outline" size={16} color="#6366f1" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.detailLabel, { color: subTextColor }]}>Full Name</Text>
                <Text style={[styles.detailVal, { color: textColor }]}>
                  {user?.name || 'Not Available'}
                </Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={[styles.detailIcon, { backgroundColor: '#f0fdf4' }]}>
                <Ionicons name="mail-outline" size={16} color="#16a34a" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.detailLabel, { color: subTextColor }]}>Email Address</Text>
                <Text style={[styles.detailVal, { color: textColor }]}>
                  {user?.email || 'No email attached'}
                </Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={[styles.detailIcon, { backgroundColor: '#e0f2fe' }]}>
                <Ionicons name="call-outline" size={16} color="#0284c7" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.detailLabel, { color: subTextColor }]}>Mobile Number</Text>
                <Text style={[styles.detailVal, { color: textColor }]}>
                  {user?.mobile || 'No mobile attached'}
                </Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={[styles.detailIcon, { backgroundColor: roleConfig.accentColor + '15' }]}>
                <Ionicons name="shield-checkmark-outline" size={16} color={roleConfig.accentColor} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.detailLabel, { color: subTextColor }]}>Assigned Role</Text>
                <Text style={[styles.detailVal, { color: roleConfig.accentColor, fontWeight: '700' }]}>
                  {userRole} • {roleConfig.label}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Role Specific Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            {userRole} Workspace Modules
          </Text>
          <Text style={[styles.sectionSub, { color: subTextColor }]}>
            {roleConfig.description}
          </Text>
        </View>

        {/* Role Modules List */}
        <View style={styles.modulesContainer}>
          {roleActions.map((action, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => navigation.navigate(action.screen)}
              style={[
                styles.actionCard,
                {
                  backgroundColor: cardBg,
                  borderColor: borderColor,
                },
              ]}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.actionIconWrap,
                  { backgroundColor: action.color + '18' },
                ]}
              >
                <Ionicons
                  name={action.icon as any}
                  size={24}
                  color={action.color}
                />
              </View>

              <View style={styles.actionContent}>
                <Text style={[styles.actionTitle, { color: textColor }]}>
                  {action.title}
                </Text>
                <Text
                  style={[styles.actionDesc, { color: subTextColor }]}
                  numberOfLines={2}
                >
                  {action.desc}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={subTextColor}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Action Button */}
        <View style={styles.logoutWrapper}>
          <CustomButton
            title="Sign Out"
            onPress={handleLogout}
            variant="danger"
            iconName="log-out-outline"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 40,
  },
  profileCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarInitials: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  detailList: {
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  detailVal: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 1,
  },
  sectionHeader: {
    marginTop: 26,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  sectionSub: {
    fontSize: 13,
    marginTop: 3,
  },
  modulesContainer: {
    gap: 12,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  actionIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  actionDesc: {
    fontSize: 13,
    marginTop: 3,
    lineHeight: 18,
  },
  logoutWrapper: {
    marginTop: 28,
  },
});
