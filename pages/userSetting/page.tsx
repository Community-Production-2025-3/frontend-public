import { AuthGuard } from '@/components/AuthGuard';
import { router, Stack } from 'expo-router';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native';
import UserDetails from './components/UserDetails';

export default function UserSettingPageContent() {
  return (
    <AuthGuard>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            headerTitle: 'ユーザー詳細',
            headerLeft: () => (
              <Button
                onPress={() => {
                  router.back();
                }}
                title="戻る"
              />
            ),
          }}
        />
        <UserDetails />
      </SafeAreaView>
    </AuthGuard>
  );
}
