// UserDetails.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { styles } from './styles';
import UserInfos from './UserInfos';
import UserSettings from './UserSettings';
import UserAbstract from './UserAbstract';

const UserDetails = () => {
  const INITIAL_TAB = 'overview';
  const [activeTab, setActiveTab] = useState(INITIAL_TAB);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <UserAbstract />;
      case 'settings':
        return <UserSettings />;
      default:
        return <Text>タブが見つかりません。</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.sidebar}>
            <UserInfos />
          </View>

          <View style={styles.mainContent}>
            <View style={styles.tabs}>
              {['overview', 'settings'].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tab, activeTab === tab && styles.activeTab]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab && styles.activeTabText,
                    ]}
                  >
                    {tab === 'overview' ? '概要' : '設定'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {renderTabContent()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserDetails;
