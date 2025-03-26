export type ConstantColorsType = {
  primary: string;
  secondary: string;
  accent: string;
  error: string;
  success: string;
  white: string;
};

export type ModeColorsType = {
  text: string;
  textSecondary: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  headerBackground: string;
  primary: string;
  cardBackground: string;
  error: string;
  onPrimary: string;
};

export const AppColors: {
  constant: ConstantColorsType;
  light: ModeColorsType;
  dark: ModeColorsType;
} = {
  constant: {
    primary: '#0a7ea4',
    secondary: '#6c757d',
    accent: '#ff9800',
    error: '#dc3545',
    success: '#28a745',
    white: '#fff',
  },
  light: {
    text: '#11181C',
    textSecondary: '#687076',
    background: '#fff',
    tint: '#0a7ea4',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0a7ea4',
    headerBackground: '#fff',
    primary: '#0a7ea4',
    cardBackground: '#F5F7F8',
    error: '#dc3545',
    onPrimary: '#ffffff',
  },
  dark: {
    text: '#ECEDEE',
    textSecondary: '#9BA1A6',
    background: '#151718',
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
    headerBackground: '#151718',
    primary: '#0a7ea4',
    cardBackground: '#1E2021',
    error: '#ef5350',
    onPrimary: '#ffffff',
  },
};
