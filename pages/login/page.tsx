import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { AuthGuard } from '@/components/AuthGuard';
import { AuthForm } from '@/pages/login/components/AuthForm';
import { useLoginPageState } from './useLoginPageState';
import { useAppColors } from '@/hooks/useAppColors';
import { Stack } from 'expo-router';

export default function LoginPageContent() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    isRegister,
    handleAuth,
    toggleRegister,
  } = useLoginPageState();
  const { modeColors } = useAppColors();

  return (
    <AuthGuard requireAuth={false}>
      <Stack.Screen options={{ headerShown: true, headerTitle: 'ログイン' }} />
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View>
            <Text style={{ color: modeColors.text }}>
              {isRegister ? 'アカウント作成' : 'ログイン'}
            </Text>
            <AuthForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
              isRegister={isRegister}
              handleAuth={handleAuth}
              toggleRegister={toggleRegister}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AuthGuard>
  );
}
