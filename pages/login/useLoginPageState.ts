import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

export const useLoginPageState = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const { signIn, signUp } = useAuth();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('エラー', 'メールアドレスとパスワードを入力してください');
      return;
    }

    try {
      setLoading(true);
      let result;

      if (isRegister) {
        // Sign up
        result = await signUp(email, password);
        if (result.error) throw result.error;
        Alert.alert('登録完了');
      } else {
        // Sign in
        result = await signIn(email, password);
        if (result.error) {
          const signUpResult = await signUp(email, password);
          if (signUpResult.error) throw signUpResult.error;
          Alert.alert(
            '新規登録完了',
            'ログイン情報で新規アカウントを作成しました',
          );
        } else {
          router.replace('/'); // ログイン成功
        }
      }
    } catch (error: any) {
      Alert.alert('エラー', error.message || '認証エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };
  const toggleRegister = () => {
    setIsRegister(!isRegister);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    isRegister,
    handleAuth,
    toggleRegister,
  };
};
