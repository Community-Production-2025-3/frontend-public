import { Alert, Text, View } from 'react-native';
import { styles } from './styles';
import { StaticInfo, StaticInfoItem } from '@/types/userDetail';
import { useEffect, useState } from 'react';
import { getAPIwithSupabaseToken } from '@/repository/apiClient';

const UserAbstract = () => {
  const [staticsItems, setStaticsItems] = useState<StaticInfo>([]);
  const getStaticInfo = async () => {
    try {
      const data =
        (await getAPIwithSupabaseToken<StaticInfo>('/api/static')) || [];

      if (!data || data.length === 0) {
        Alert.alert('APIからのデータが受信されませんでした。');
      }
      setStaticsItems(data);
    } catch (error) {
      Alert.alert('静的情報の取得中にエラーが発生しました:', String(error));
    }
  };

  useEffect(() => {
    getStaticInfo();
  }, []);
  return (
    <View style={styles.tabContent}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>統計情報</Text>
          <Text style={styles.cardDescription}>ユーザーの活動と統計の概要</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.statsContainer}>
            {staticsItems.map((staticsItem: StaticInfoItem) => (
              <View key={staticsItem.name} style={styles.statItem}>
                <Text style={styles.statLabel}>{staticsItem.name}</Text>
                <Text style={styles.statValue}>{staticsItem.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};
export default UserAbstract;
