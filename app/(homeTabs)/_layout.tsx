import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Icon } from 'react-native-paper';
import { AuthGuard } from '@/components/AuthGuard';

export default function HomeTabLayout() {
  return (
    <AuthGuard>
      <Tabs
        initialRouteName="(menuDrawer)"
        screenOptions={{
          headerShown: false,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="(menuDrawer)"
          options={{
            title: 'ホーム',
            tabBarIcon: ({ color }) => (
              <Icon size={28} source="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="currentSchedule"
          options={{
            title: 'スケジュール',
            tabBarIcon: ({ color }) => (
              <Icon size={28} source="calendar" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="todos"
          options={{
            title: 'TODO',
            tabBarIcon: ({ color }) => (
              <Icon size={28} source="check-circle-outline" color={color} />
            ),
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}
