// UserSettings.tsx
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const UserSettings = () => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>アカウント設定</Text>
        <Text style={styles.cardDescription}>アカウント情報の管理</Text>
      </View>
      <View style={styles.cardContent}>
        {[
          { title: 'プロフィール情報', desc: '個人情報の編集', action: '編集' },
          {
            title: 'パスワード変更',
            desc: 'セキュリティ設定の管理',
            action: '変更',
          },
          { title: '通知設定', desc: '通知の受信方法を設定', action: '設定' },
          {
            title: 'プライバシー設定',
            desc: 'アカウントの公開範囲を管理',
            action: '設定',
          },
        ].map((item, i, arr) => (
          <View
            key={item.title}
            style={[
              styles.settingItem,
              i < arr.length - 1 && styles.borderBottom,
            ]}
          >
            <View>
              <Text style={styles.settingTitle}>{item.title}</Text>
              <Text style={styles.settingDesc}>{item.desc}</Text>
            </View>
            <TouchableOpacity style={styles.ghostButtonSmall}>
              <Text style={styles.ghostButtonText}>{item.action}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default UserSettings;
