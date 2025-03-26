import React from 'react';
import { FlatList, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, ActivityIndicator, FAB } from 'react-native-paper';
import { useAppColors } from '@/hooks/useAppColors';
import { AuthGuard } from '@/components/AuthGuard';
import { useScheduleList } from './useScheduleList';
import { ScheduleItem } from './components/ScheduleItem';
import { useRouter } from 'expo-router';
import { styles } from './style';

export default function ScheduleListPageContent() {
  const { modeColors } = useAppColors();
  const { schedules, isLoading, error, refreshSchedules } = useScheduleList();
  const router = useRouter();

  const handleCreateSchedule = () => {
    router.push('/createSchedule');
  };

  // アイテム間のセパレーターとして使用する空のビュー
  const ItemSeparator = () => <View style={{ height: 12 }} />;

  return (
    <AuthGuard>
      <SafeAreaView
        style={[styles.container, { backgroundColor: modeColors.background }]}
        edges={['left', 'right', 'bottom']}
      >
        <View style={styles.content}>
          {isLoading ? (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color={modeColors.primary} />
              <Text style={{ color: modeColors.text, marginTop: 16 }}>
                読み込み中...
              </Text>
            </View>
          ) : error ? (
            <View style={styles.centerContainer}>
              <Text style={{ color: modeColors.error }}>{error}</Text>
              <Button
                mode="contained"
                onPress={refreshSchedules}
                style={{ marginTop: 16 }}
              >
                再読み込み
              </Button>
            </View>
          ) : schedules.length === 0 ? (
            <View style={styles.centerContainer}>
              <Text style={{ color: modeColors.text, marginBottom: 16 }}>
                スケジュールがありません
              </Text>
              <Button mode="contained" onPress={handleCreateSchedule}>
                スケジュールを作成
              </Button>
            </View>
          ) : (
            <FlatList
              data={schedules}
              renderItem={({ item }) => <ScheduleItem schedule={item} />}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={ItemSeparator}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={5}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={refreshSchedules}
                  colors={[modeColors.primary]}
                />
              }
            />
          )}
        </View>

        <FAB
          icon="plus"
          style={[styles.fab, { backgroundColor: modeColors.primary }]}
          onPress={handleCreateSchedule}
          color={modeColors.onPrimary}
        />
      </SafeAreaView>
    </AuthGuard>
  );
}
