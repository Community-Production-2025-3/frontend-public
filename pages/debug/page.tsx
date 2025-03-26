import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { ServerStatus } from './components/ServerStatus';
import { EndpointSelector } from './components/EndpointSelector';
import { UserInfo } from './components/UserInfo';
import { ColorPalette } from './components/ColorPalette';
import { AppStyle } from '@/constants/AppStyle';
import { AuthGuard } from '@/components/AuthGuard';

export default function DebugPageContent() {
  return (
    <AuthGuard>
      <SafeAreaView style={AppStyle.container}>
        <ScrollView>
          <EndpointSelector />
          <ServerStatus />
          <UserInfo />
          <ColorPalette />
        </ScrollView>
      </SafeAreaView>
    </AuthGuard>
  );
}
