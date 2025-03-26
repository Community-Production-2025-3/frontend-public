import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  Alert,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppColors } from '@/hooks/useAppColors';
import { AppStyle } from '@/constants/AppStyle';
import { AuthGuard } from '@/components/AuthGuard';
import {
  getAPIwithSupabaseToken,
  putAPIwithSupabaseToken,
} from '@/repository/apiClient';
import { styles } from './style';
import { ScheduleWithLatestAiProposal } from '@/types/schedule';
import { AiProposalContent } from '@/types/aiProposal';
import { Stack } from 'expo-router';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function CurrentSchedulePageContent() {
  const { modeColors } = useAppColors();
  const [scheduleContentsItem, setScheduleContentsItem] = useState<
    AiProposalContent[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCurrentSchedule = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAPIwithSupabaseToken<ScheduleWithLatestAiProposal>(
        '/api/active-schedule',
      );

      console.log('Schedule data received:', data);

      if (!data || !data.latest_ai_proposal) {
        setError('スケジュールデータが見つかりませんでした。');
        setLoading(false);
        return;
      }

      const sortedContents = (data.latest_ai_proposal.contents || []).sort(
        (a, b) => a.start_time.localeCompare(b.start_time),
      );
      setScheduleContentsItem(sortedContents);
    } catch (error) {
      console.error('スケジュール取得エラー:', error);
      setError(
        'スケジュールの取得に失敗しました。ネットワーク接続を確認してください。',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentSchedule();
  }, []);

  const updateScheduleStatus = async (id: string, newStatus: boolean) => {
    try {
      const res = await putAPIwithSupabaseToken(
        `/api/aiProposalContents/${id}`,
        { newStatus },
      );
      console.log('リクエスト内容:', {
        endpoint: `/api/aiProposalContents/${id}`,
      });

      if (!res) {
        console.error('PUT APIリクエスト失敗:', res);
        Alert.alert('失敗しました。もう一度お試しください。');
        return;
      }
      setScheduleContentsItem((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item,
        ),
      );
      if (newStatus) {
        Alert.alert('完了');
      }
    } catch (error) {
      console.error('エラー詳細:', error);
      Alert.alert('失敗した。もう一度お試しください。');
    }
  };

  return (
    <AuthGuard>
      <SafeAreaView
        style={[AppStyle.container, { backgroundColor: modeColors.background }]}
        edges={['left', 'right', 'bottom']}
      >
        <Stack.Screen
          options={{
            title: 'スケジュール',
            headerShown: true,
            headerTitleStyle: styles.headerTitle,
          }}
        />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {loading ? (
            <ActivityIndicator size="large" color="#4A90E2" />
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={getCurrentSchedule}
              >
                <Text style={styles.retryButtonText}>再読み込み</Text>
              </TouchableOpacity>
            </View>
          ) : scheduleContentsItem?.length > 0 ? (
            scheduleContentsItem.map((item, index) => (
              <Animated.View
                key={item.id}
                style={styles.itemCard}
                entering={FadeInUp.delay(index * 100).springify()}
              >
                <View style={styles.decorativeLine} />
                <View style={styles.leftContent}>
                  <Text style={styles.itemContentText} numberOfLines={2}>
                    {item.content}
                  </Text>
                  <View style={styles.timeBadge}>
                    <MaterialCommunityIcons
                      name="clock-outline"
                      size={14}
                      color="#fff"
                    />
                    <Text style={styles.itemTimeText}>
                      {item.start_time} - {item.end_time}
                    </Text>
                  </View>
                </View>

                <View style={styles.rightContent}>
                  <BouncyCheckbox
                    size={28}
                    fillColor="#7C3AED"
                    unFillColor="#FFFFFF"
                    iconStyle={{
                      borderColor: '#4A90E2',
                      borderRadius: 6,
                      borderWidth: 2,
                    }}
                    innerIconStyle={{
                      borderWidth: 0,
                      borderRadius: 4,
                    }}
                    ImageComponent={() => (
                      <MaterialCommunityIcons
                        name="check-bold"
                        size={20}
                        color="white"
                      />
                    )}
                    isChecked={item.status}
                    onPress={() => updateScheduleStatus(item.id, !item.status)}
                    bounceEffect={0.8}
                    bounceFriction={3}
                  />
                </View>
              </Animated.View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>スケジュールがありません</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </AuthGuard>
  );
}
