import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppColors } from '@/hooks/useAppColors';
import { AppStyle } from '@/constants/AppStyle';
import { AuthGuard } from '@/components/AuthGuard';
import { useCreateScheduleState } from './useCreateScheduleState';
import { styles } from './style';
import { Button } from 'react-native-paper';
import { TodoForm } from './components/TodoForm';
import { CompleteModal } from './components/CompleteModal';
import { useState } from 'react';

export default function CreateSchedulePageContent() {
  const { modeColors } = useAppColors();
  const [openModal, setOpenModal] = useState(false);
  const {
    title,
    setTitle,
    todos,
    addTodo,
    updateTodo,
    removeTodo,
    createSchedule,
    isLoading,
    error,
  } = useCreateScheduleState();
  return (
    <AuthGuard>
      <SafeAreaView
        style={[AppStyle.container, { backgroundColor: modeColors.background }]}
        edges={['left', 'right', 'bottom']}
      >
        {error && <Text>{error}</Text>}
        <ScrollView style={styles.scrollView}>
          <View style={AppStyle.section}>
            <Text
              style={[
                AppStyle.title,
                { color: modeColors.text, fontSize: 24, marginBottom: 20 },
              ]}
            >
              予定作成
            </Text>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: modeColors.text }]}>
                スケジュールタイトル
              </Text>
              <TextInput
                style={[styles.input, { color: modeColors.text }]}
                placeholder="タイトルを入力してください"
                placeholderTextColor={modeColors.text}
                value={title}
                onChangeText={setTitle}
                editable={!isLoading}
              />
            </View>

            <Text style={[styles.sectionTitle, { color: modeColors.text }]}>
              Todo リスト
            </Text>

            {todos.map((todo, index) => (
              <TodoForm
                key={index}
                index={index}
                todo={todo}
                updateTodo={updateTodo}
                removeTodo={removeTodo}
                disabled={isLoading}
              />
            ))}
            <TouchableOpacity
              style={[
                styles.addButton,
                { backgroundColor: '#4dabf7' },
                isLoading && { opacity: 0.7 },
              ]}
              onPress={addTodo}
              disabled={isLoading}
            >
              <Text style={styles.addButtonText}>+ Todoを追加</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Button
              mode="contained-tonal"
              icon="check-bold"
              contentStyle={{ flexDirection: 'row-reverse' }}
              labelStyle={{ letterSpacing: 1.5 }}
              style={styles.completeButton}
              theme={{
                colors: {
                  primary: 'white',
                },
              }}
              onPress={() => setOpenModal((prev: boolean) => !prev)}
            >
              <Text style={styles.completeButton}>完了</Text>
            </Button>
          </View>

          <CompleteModal
            isOpenModal={openModal}
            setIsOpenModal={setOpenModal}
            createSchedule={createSchedule}
          />
        </ScrollView>

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#0a7ea4" />
          </View>
        )}
      </SafeAreaView>
    </AuthGuard>
  );
}
