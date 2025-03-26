import { useColorScheme } from 'react-native';
import { AppColors } from '@/constants/AppColors';

export const useAppColors = () => {
  const colorScheme = useColorScheme();
  const modeColors = AppColors[colorScheme || 'light'];
  const constantColors = AppColors.constant;

  return { modeColors, constantColors };
};
