import { AppStyle } from '@/constants/AppStyle';
import { useAppColors } from '@/hooks/useAppColors';
import { getAPIwithSupabaseToken } from '@/repository/apiClient';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export const ServerStatus = () => {
  const { modeColors } = useAppColors();
  const [data, setData] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServerStatus = async () => {
      setLoading(true);
      try {
        const res = await getAPIwithSupabaseToken<{
          message: string;
        }>('/');

        setData(res.message);
      } catch (error) {
        console.error(error);
        setError('エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };
    fetchServerStatus();
  }, []);

  return (
    <>
      <Text style={AppStyle.title}>サーバーステータス</Text>
      <View>
        <Text style={{ color: modeColors.text }}>{data}</Text>
        {loading && <Text>Loading...</Text>}
        {error && <Text>Error: {error}</Text>}
      </View>
    </>
  );
};
