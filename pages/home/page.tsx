import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { useAppColors } from '@/hooks/useAppColors';
import { styles } from './style';
import { AuthGuard } from '@/components/AuthGuard';

export default function HomePageContent() {
  const { modeColors } = useAppColors();

  return (
    <AuthGuard>
      <SafeAreaView
        style={[styles.container, { backgroundColor: modeColors.background }]}
      >
        <View style={styles.section}>
          <Text variant="headlineLarge" style={styles.title}>
            Welcome!
          </Text>
          <Text variant="titleLarge">Kosei-Naoya Project</Text>
          <Text variant="bodyMedium">トップページ</Text>
        </View>
      </SafeAreaView>
    </AuthGuard>
  );
}
