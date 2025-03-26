import { useAuth } from '@/contexts/AuthContext';
import { useAppColors } from '@/hooks/useAppColors';
import { ScheduleMode } from '@/types/schedule';
import { enableModeUnlockRank } from '@/utils/ModeUnlock';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { Pressable, ScrollView, Text } from 'react-native';
import { Modal, View } from 'react-native';

interface ComponentProps {
  isOpenModal: boolean;
  setIsOpenModal: (open: boolean) => void;
  createSchedule: (mode?: ScheduleMode) => Promise<void>;
}

export const CompleteModal = ({
  isOpenModal,
  setIsOpenModal,
  createSchedule,
}: ComponentProps) => {
  const { modeColors } = useAppColors();
  const { user } = useAuth();
  const rankValue = user?.rank ?? 1;
  const isNormalModeEnabled = enableModeUnlockRank(
    ScheduleMode.NORMAL,
    rankValue,
  );
  const isBoostModeEnabled = enableModeUnlockRank(
    ScheduleMode.BOOST,
    rankValue,
  );
  const isVampireModeEnabled = enableModeUnlockRank(
    ScheduleMode.VAMPIRE,
    rankValue,
  );
  const isNukunukuModeEnabled = enableModeUnlockRank(
    ScheduleMode.NUKUNUKU,
    rankValue,
  );

  const buttonModeItems = [
    {
      mode: ScheduleMode.NORMAL,
      name: 'ノーマルモード提案',
      enable: isNormalModeEnabled,
    },
    {
      mode: ScheduleMode.BOOST,
      name: 'ブーストモード提案',
      enable: isBoostModeEnabled,
    },
    {
      mode: ScheduleMode.VAMPIRE,
      name: 'バンパイアライフモード提案',
      enable: isVampireModeEnabled,
    },
    {
      mode: ScheduleMode.NUKUNUKU,
      name: 'ぬくぬくモード提案',
      enable: isNukunukuModeEnabled,
    },
  ];
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpenModal}
      onRequestClose={() => setIsOpenModal(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <View
          style={{
            backgroundColor: modeColors.background,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 16,
            maxHeight: '50%',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: modeColors.text,
              }}
            >
              提案モードを選択
            </Text>
            <Pressable
              onPress={() => setIsOpenModal(false)}
              style={{ padding: 4 }}
            >
              <Ionicons name="close" size={24} color={modeColors.text} />
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {buttonModeItems.map((item) => (
              <Pressable
                key={item.mode}
                onPress={() => {
                  if (item.enable) {
                    createSchedule(item.mode);
                    setIsOpenModal(false);
                  }
                }}
                disabled={!item.enable}
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.pressed,
                  !item.enable && styles.disabled,
                ]}
              >
                <View style={styles.content}>
                  <View style={styles.statusIndicator}>
                    {item.enable ? (
                      <View style={[styles.iconCircle, styles.activeIcon]}>
                        <Ionicons name="checkmark" size={16} color="white" />
                      </View>
                    ) : (
                      <View style={[styles.iconCircle, styles.lockedIcon]}>
                        <Ionicons name="lock-closed" size={16} color="white" />
                      </View>
                    )}
                  </View>

                  {/* メインコンテンツ */}
                  <View style={styles.textContainer}>
                    <Text
                      style={[
                        styles.title,
                        !item.enable && styles.disabledTitle,
                      ]}
                    >
                      {item.name}
                    </Text>
                    {!item.enable && (
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Ionicons name="time-outline" size={12} />
                        <Text style={styles.statusMessage}>
                          現在利用できません
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* アクションアイコン */}
                  {item.enable ? (
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color="#4A90E2"
                    />
                  ) : (
                    <Ionicons
                      name="lock-closed-outline"
                      size={18}
                      color="#CCCCCC"
                    />
                  )}
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  statusIndicator: {
    width: 32,
    alignItems: 'center',
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIcon: {
    backgroundColor: '#4A90E2',
  },
  lockedIcon: {
    backgroundColor: '#CCCCCC',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    lineHeight: 24,
  },
  disabledTitle: {
    color: '#999999',
    textDecorationLine: 'line-through',
  },
  statusMessage: {
    fontSize: 12,
    color: '#CCCCCC',
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pressed: {
    backgroundColor: '#F8F9FF',
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    backgroundColor: '#FCFCFC',
    borderColor: '#F0F0F0',
  },
});
