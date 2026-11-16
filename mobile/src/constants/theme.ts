import { Role } from '../types';

export const COLORS = {
  light: {
    background: '#f8fafc', // slate-50
    surface: '#ffffff',
    surfaceSecondary: '#f1f5f9',
    border: '#e2e8f0',
    text: '#0f172a', // slate-900
    textSecondary: '#64748b', // slate-500
    textMuted: '#94a3b8',
    primary: '#4f46e5', // indigo-600
    primaryLight: '#e0e7ff',
    inputBg: '#f8fafc',
    inputBorder: '#cbd5e1',
    card: '#ffffff',
  },
  dark: {
    background: '#090d16', // deep dark
    surface: '#111827', // slate-900 / gray-900
    surfaceSecondary: '#1f2937', // gray-800
    border: '#374151', // gray-700
    text: '#f9fafb',
    textSecondary: '#9ca3af',
    textMuted: '#6b7280',
    primary: '#6366f1', // indigo-500
    primaryLight: '#312e81',
    inputBg: '#1f2937',
    inputBorder: '#374151',
    card: '#111827',
  },
};

export const ROLE_CONFIG: Record<
  Role,
  {
    label: string;
    description: string;
    badgeBgLight: string;
    badgeTextLight: string;
    badgeBgDark: string;
    badgeTextDark: string;
    icon: string;
    gradient: string[];
    accentColor: string;
  }
> = {
  ADMIN: {
    label: 'Store Administrator',
    description: 'Full store operations, employee control & inventory analytics',
    badgeBgLight: '#f3e8ff',
    badgeTextLight: '#7e22ce',
    badgeBgDark: '#3b0764',
    badgeTextDark: '#d8b4fe',
    icon: 'shield-checkmark',
    gradient: ['#7e22ce', '#4338ca'],
    accentColor: '#9333ea',
  },
  USER: {
    label: 'Store Staff & Sales',
    description: 'Point of sale, product checkout & customer operations',
    badgeBgLight: '#e0f2fe',
    badgeTextLight: '#0369a1',
    badgeBgDark: '#082f49',
    badgeTextDark: '#7dd3fc',
    icon: 'briefcase',
    gradient: ['#0284c7', '#2563eb'],
    accentColor: '#0284c7',
  },
  CUSTOMER: {
    label: 'Valued Customer',
    description: 'Personal orders, product discovery & loyalty rewards',
    badgeBgLight: '#dcfce7',
    badgeTextLight: '#15803d',
    badgeBgDark: '#052e16',
    badgeTextDark: '#86efac',
    icon: 'person',
    gradient: ['#16a34a', '#0d9488'],
    accentColor: '#16a34a',
  },
};
