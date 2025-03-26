import { useState } from 'react';
import { View, Text, Pressable, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  API_BASE_URLS,
  changeApiBaseUrl,
  getApiBaseUrl,
} from '@/contexts/APIBaseURL';
import { useAppColors } from '@/hooks/useAppColors';
import { ModeColorsType } from '@/constants/AppColors';
import { AppStyle } from '@/constants/AppStyle';

export const EndpointSelector = () => {
  const baseURL = getApiBaseUrl();
  const baseURLKeys = Object.keys(
    API_BASE_URLS,
  ) as (keyof typeof API_BASE_URLS)[];
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { modeColors } = useAppColors();

  const handleBaseURLChange = (newBaseURLKey: keyof typeof API_BASE_URLS) => {
    changeApiBaseUrl(newBaseURLKey);
    setModalVisible(false);
  };

  const currentBaseURLKey =
    baseURLKeys.find(
      (key) => API_BASE_URLS[key as keyof typeof API_BASE_URLS] === baseURL,
    ) || '';

  return (
    <>
      <Text style={[AppStyle.title, { marginTop: 10 }]}>
        エンドポイント選択
      </Text>
      <View>
        <Text style={{ color: modeColors.text }}>現在のエンドポイント</Text>
        <Text style={{ color: modeColors.text }}>
          {currentBaseURLKey} : {baseURL}
        </Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={{ color: modeColors.text }}>エンドポイント変更</Text>
        </Pressable>
      </View>

      <EndpointModal
        currentBaseURLKey={currentBaseURLKey}
        baseURLKeys={baseURLKeys}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleBaseURLChange={handleBaseURLChange}
        modeColors={modeColors}
      />
    </>
  );
};

const EndpointModal = ({
  currentBaseURLKey,
  baseURLKeys,
  modalVisible,
  setModalVisible,
  handleBaseURLChange,
  modeColors,
}: {
  currentBaseURLKey: keyof typeof API_BASE_URLS | '';
  baseURLKeys: (keyof typeof API_BASE_URLS)[];
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  handleBaseURLChange: (newBaseURLKey: keyof typeof API_BASE_URLS) => void;
  modeColors: ModeColorsType;
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
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
              エンドポイントを選択
            </Text>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={{ padding: 4 }}
            >
              <Ionicons name="close" size={24} color={modeColors.text} />
            </Pressable>
          </View>

          <ScrollView>
            {baseURLKeys.map((key) => (
              <Pressable
                key={key}
                style={{
                  padding: 16,
                  borderRadius: 10,
                  marginBottom: 8,
                  backgroundColor:
                    key === currentBaseURLKey
                      ? modeColors.tint + '20'
                      : 'transparent',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => handleBaseURLChange(key)}
              >
                {key === currentBaseURLKey && (
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={modeColors.tint}
                    style={{ marginRight: 10 }}
                  />
                )}
                <Text style={{ color: modeColors.text, fontSize: 16 }}>
                  {key}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
