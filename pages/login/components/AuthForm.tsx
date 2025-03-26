import { useAppColors } from '@/hooks/useAppColors';
import React from 'react';
import {
  TextInput,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

type AuthFormProps = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  isRegister: boolean;
  handleAuth: () => void;
  toggleRegister: () => void;
};

export const AuthForm = ({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  isRegister,
  handleAuth,
  toggleRegister,
}: AuthFormProps) => {
  const { modeColors, constantColors } = useAppColors();

  return (
    <View>
      <TextInput
        placeholder="メールアドレス"
        placeholderTextColor={constantColors.primary}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={{ color: '#0066CC' }}
        placeholder="パスワード"
        placeholderTextColor={constantColors.primary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable onPress={handleAuth} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={modeColors.text} />
        ) : (
          <Text style={{ color: modeColors.text }}>
            {isRegister ? '登録する' : 'ログインする'}
          </Text>
        )}
      </Pressable>

      <TouchableOpacity onPress={toggleRegister}>
        <Text style={{ color: modeColors.text }}>
          {isRegister
            ? '既にアカウントをお持ちですか？ログイン'
            : 'アカウントをお持ちでないですか？新規登録'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
