// UserInfos.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  Image,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { rankUpThreshold } from '@/utils/userRank';
import { formatISODateJSTSimple } from '@/utils/formatDate';
import { supabase } from '@/utils/supabase';
import { styles } from './styles';

const UserInfos = () => {
  const { user } = useAuth();
  const [userName, setUserName] = useState(user?.userName || '');
  const maxExp = rankUpThreshold(user?.rank ?? 1);
  const formatDate = user?.created_at
    ? formatISODateJSTSimple(user.created_at)
    : '';
  const [showEditField, setShowEditField] = useState(false);
  const [editedUserName, setEditedUserName] = useState(userName || '');

  const updateUserName = useCallback(async () => {
    if (!user?.id) {
      Alert.alert('ユーザーIDが無効です');
      return;
    }
    const { error } = await supabase
      .from('users')
      .update({ userName: editedUserName })
      .eq('id', user?.id);
    if (error) {
      console.error(error);
      Alert.alert('ユーザー名の更新に失敗しました');
      return;
    }
    setUserName(editedUserName);
    setShowEditField(false);
  }, [editedUserName, user?.id]);

  useEffect(() => {
    if (!showEditField) {
      updateUserName();
    }
  }, [showEditField, updateUserName]);

  return (
    <View style={styles.card}>
      <View style={styles.userHeader}>
        <Image
          source={{ uri: 'https://via.placeholder.com/96' }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          {showEditField ? (
            <TextInput
              style={[styles.userName, styles.userNameInput]}
              value={editedUserName}
              onChangeText={setEditedUserName}
              autoFocus
            />
          ) : (
            <Text style={styles.userName}>{editedUserName}</Text>
          )}
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Rank:{user?.rank}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Ionicons
              name="mail"
              size={16}
              color="#666"
              style={styles.contactIcon}
            />
            <Text style={styles.contactText}>{user?.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons
              name="trophy"
              size={16}
              color="#666"
              style={styles.contactIcon}
            />
            <Text style={styles.contactText}>RANK {user?.rank}</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons
              name="trending-up"
              size={16}
              color="#666"
              style={styles.contactIcon}
            />
            <Text style={styles.contactText}>
              EXP {user?.exp} / {maxExp}
            </Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons
              name="calendar"
              size={16}
              color="#666"
              style={styles.contactIcon}
            />
            <Text style={styles.contactText}>{formatDate}に登録</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setShowEditField(!showEditField)}
        >
          <Text style={styles.primaryButtonText}>
            {showEditField ? '保存' : 'プロフィール編集'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserInfos;
