import React, { ReactNode, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

type AuthGuardProps = {
  children: ReactNode;
  requireAuth?: boolean;
};

export const AuthGuard = ({ children, requireAuth = true }: AuthGuardProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        // If auth is required but user is not logged in
        router.replace('/login');
      } else if (!requireAuth && user) {
        // If on a non-auth page (like login) but user is already logged in
        router.replace('/');
      }
    }
  }, [loading, user, requireAuth, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // Don't render children until we've checked auth state
  if ((requireAuth && !user) || (!requireAuth && user)) {
    return null;
  }

  return <>{children}</>;
};
