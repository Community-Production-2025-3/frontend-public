import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from '@/contexts/AuthContext';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { initializeApiBaseUrl } from '@/contexts/APIBaseURL';
import { View } from 'react-native';
import { ErrorAlert } from '@/components/ui/ErrorAlert';

export default function RootLayout() {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function initialize() {
      try {
        await initializeApiBaseUrl();
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setErrorMsg('Failed to initialize app');
      } finally {
        setInitializing(false);
      }
    }

    initialize();
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoadingOverlay visible={true} message="アプリを初期化中..." />
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ErrorAlert message={errorMsg} />
      </View>
    );
  }

  return (
    <PaperProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
          <Stack.Screen name="(homeTabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </AuthProvider>
    </PaperProvider>
  );
}
