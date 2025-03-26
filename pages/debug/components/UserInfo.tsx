import { AppStyle } from '@/constants/AppStyle';
import { useAuth } from '@/contexts/AuthContext';
import { Alert } from 'react-native';
import { Pressable, Text } from 'react-native';

export const UserInfo = () => {
  const { user, signOut } = useAuth();
  if (!user?.id) {
    Alert.alert('ユーザー情報が取得できませんでした');
    return null;
  }
  return (
    <>
      <Text style={AppStyle.title}>ユーザー情報</Text>
      <Text>{user?.id}</Text>
      <Text>{user?.email}</Text>
      <Text>{user?.rank}</Text>
      <Text>{user?.exp}</Text>
      <Pressable onPress={async () => await signOut()}>
        <Text>ログアウト</Text>
      </Pressable>
    </>
  );
};
