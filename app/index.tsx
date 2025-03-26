import { Redirect } from 'expo-router';
import { AuthGuard } from '@/components/AuthGuard';

export default function Index() {
  return (
    <AuthGuard>
      <Redirect href="/home" />
    </AuthGuard>
  );
}
