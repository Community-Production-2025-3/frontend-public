import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { ScheduleMode } from '@/types/schedule';
import { MODE_UNLOCK_RANKS } from '@/constants/ModeUnlockRanks';

interface RankUpProps {
  rank: number;
}

export default function RankUp({ rank }: RankUpProps) {
  const [showModal, setShowModal] = useState(false);
  const [previousRank, setPreviousRank] = useState([rank]);
  const [unlockedModes, setUnlockedModes] = useState<ScheduleMode[]>([]);
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const prevRank = previousRank[previousRank.length - 1];

    if (rank > prevRank) {
      const newUnlockedModes: ScheduleMode[] = Object.values(ScheduleMode)
        .filter((value) => typeof value === 'number')
        .filter((mode: ScheduleMode) => {
          const unlockRank = MODE_UNLOCK_RANKS[mode] ?? Infinity;
          return prevRank < unlockRank && rank >= unlockRank;
        }) as ScheduleMode[];

      setUnlockedModes(newUnlockedModes);
      setShowModal(true);

      const animation = Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      });

      animation.start();

      setPreviousRank((prev) => [...prev, rank]);

      return () => {
        animation.stop();
      };
    }
  }, [rank, previousRank, scaleAnim]);

  const closeModal = () => {
    scaleAnim.setValue(0.8);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType="fade"
        visible={showModal}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[styles.modalContent, { transform: [{ scale: scaleAnim }] }]}
          >
            <Text style={styles.modalTitle}>🎉 ランクアップ 🎉</Text>
            <Text style={styles.modalText}>
              <Text style={styles.previousRank}>
                {previousRank[previousRank.length - 2]}
              </Text>{' '}
              → <Text style={styles.newRank}>{rank}</Text>
            </Text>
            <Text style={styles.modalMessage}>
              おめでとうございます！次のステップへ進みましょう！
            </Text>
            {unlockedModes.length > 0 && (
              <View style={styles.modeUnlockContainer}>
                <Text style={styles.modalSubtitle}>
                  新たに解放されたモード:
                </Text>
                {unlockedModes.map((mode) => (
                  <Text key={mode} style={styles.unlockedModeText}>
                    {ScheduleMode[mode]}
                  </Text>
                ))}
              </View>
            )}
            <Text style={styles.modalMessage}>
              おめでとうございます！次のステップへ進みましょう！
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>OK</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff9800',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  previousRank: {
    color: '#757575',
    textDecorationLine: 'line-through',
  },
  newRank: {
    color: '#4CAF50',
    fontSize: 26,
  },
  modeUnlockContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  unlockedModeText: {
    fontSize: 20,
    color: '#2196F3',
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#ff9800',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
