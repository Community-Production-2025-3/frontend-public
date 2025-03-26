import { Drawer } from 'expo-router/drawer';

export default function MenuDrawerLayout() {
  return (
    <Drawer screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="home" options={{ title: 'Home' }} />
      <Drawer.Screen
        name="createSchedule"
        options={{ title: 'スケジュール作成' }}
      />
      <Drawer.Screen
        name="scheduleList"
        options={{ title: 'スケジュール一覧' }}
      />
    </Drawer>
  );
}
