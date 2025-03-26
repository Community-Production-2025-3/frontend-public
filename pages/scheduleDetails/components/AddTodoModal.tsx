import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { styles } from '../style';
import { Ionicons } from '@expo/vector-icons';

interface AddTodoModalProps {
  visible: boolean;
  todoTitle: string;
  setTodoTitle: (title: string) => void;
  todoMinutes: number;
  setTodoMinutes: (minutes: number) => void;
  addingTodo: boolean;
  todoError: string | null;
  onClose: () => void;
  onAdd: () => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  visible,
  todoTitle,
  setTodoTitle,
  todoMinutes,
  setTodoMinutes,
  addingTodo,
  todoError,
  onClose,
  onAdd,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <TouchableWithoutFeedback>
            <View style={styles.todoDialogContainer}>
              <Text style={styles.todoDialogTitle}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color="#4A86E8"
                />{' '}
                新規Todoを追加
              </Text>

              {todoError && <Text style={styles.errorText}>{todoError}</Text>}

              <TextInput
                placeholder="タイトル"
                value={todoTitle}
                onChangeText={setTodoTitle}
                style={styles.todoInput}
              />

              <TextInput
                style={[styles.todoInput]}
                placeholder="分"
                value={
                  todoMinutes === 0 && todoMinutes.toString() === '0'
                    ? ''
                    : todoMinutes.toString()
                }
                onChangeText={(text) => {
                  const minutes = Number(text);
                  if (!isNaN(minutes) && minutes >= 0) {
                    setTodoMinutes(minutes);
                  }
                }}
                keyboardType="numeric"
              />

              <View style={styles.todoDialogButtonContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={onClose}
                >
                  <Text style={[styles.modalButtonText, { color: '#666666' }]}>
                    キャンセル
                  </Text>
                </TouchableOpacity>

                {addingTodo ? (
                  <ActivityIndicator size="small" color="#4A86E8" />
                ) : (
                  <TouchableOpacity
                    style={[styles.modalButton, styles.addButton]}
                    onPress={onAdd}
                  >
                    <Text
                      style={[styles.modalButtonText, { color: '#FFFFFF' }]}
                    >
                      追加
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddTodoModal;
