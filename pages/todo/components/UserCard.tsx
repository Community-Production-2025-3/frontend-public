import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, Alert } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/utils/supabase';
import { rankUpThreshold } from '@/utils/userRank';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RankUp from './RankUp';
import { Todo } from '@/types/todo';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface UserCardProps {
  todos: Todo[];
}

export default function UserCard({ todos }: UserCardProps) {
  const { user } = useAuth();
  const [rank, setRank] = useState(user?.rank);
  const [exp, setExp] = useState(user?.exp);
  const [maxExp, setMaxExp] = useState(rankUpThreshold(rank ?? 1));
  const progressAnim = useRef(new Animated.Value(0)).current;

  const getUserRankAndExp = useCallback(async () => {
    const { data, error } = await supabase
      .from('users')
      .select('exp,rank')
      .eq('id', user?.id);
    if (error) {
      console.error('Failed to fetch user data:', error);
      Alert.alert('ユーザーデータの取得に失敗しました');
      return;
    }
    if (data && data.length > 0) {
      setRank(data[0].rank);
      setExp(data[0].exp);
      setMaxExp(rankUpThreshold(data[0].rank));
    }
  }, [user?.id]);

  useEffect(() => {
    getUserRankAndExp();
  }, [todos, getUserRankAndExp]);

  useEffect(() => {
    const divide = Math.floor(((exp ?? 0) / maxExp) * 100);

    const animation = Animated.timing(progressAnim, {
      toValue: divide,
      duration: 500,
      useNativeDriver: false,
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, [exp, maxExp, progressAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href={`/users/${user?.id}`}>
          <Ionicons name="settings" size={20} color="#FFF" />
          <Text style={{ color: '#FFF', fontSize: 20 }}>編集</Text>
        </Link>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{user?.userName ?? 'anonymous'}</Text>
          <View style={styles.levelBadge}>
            <Icon name="trophy" size={22} color="#FFD700" />
            <Text style={styles.levelText}>Rank {rank}</Text>
          </View>
        </View>

        <View style={styles.progressLabels}>
          <Text style={styles.progressLabel}>exp</Text>
          <Text style={styles.progressLabel}>
            {exp}/{maxExp} XP
          </Text>
        </View>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
      </View>
      {rank !== undefined && <RankUp rank={rank} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
    borderRadius: 18,
    overflow: 'hidden',
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
  },
  header: {
    padding: 24,
    paddingTop: 40,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: '#6C1BFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 1,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    gap: 8,
  },
  levelText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressLabel: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 4,
  },
});
