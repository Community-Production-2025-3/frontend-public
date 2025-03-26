import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="[userId]" />
      </Stack>
    </AuthProvider>
  );
}
