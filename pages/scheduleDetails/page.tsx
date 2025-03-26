import React, { useRef, useEffect } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  Message,
  useScheduleDetailsPageState,
} from './useScheduleDetailsPageState';
import { styles } from './style';
import { aiProposalContentsToString } from '@/types/aiProposal';
import AddTodoModal from './components/AddTodoModal';
import ChatInput from './components/ChatInput';
import { Ionicons } from '@expo/vector-icons';
import { useAppColors } from '@/hooks/useAppColors';

export default function ScheduleDetailsPageContent() {
  const { modeColors } = useAppColors();
  const { scheduleId } = useLocalSearchParams();
  const {
    schedule,
    loading,
    error,
    messages,
    sendUserComment,
    todoDialogVisible,
    todoTitle,
    setTodoTitle,
    todoMinutes,
    setTodoMinutes,
    addingTodo,
    todoError,
    openTodoDialog,
    closeTodoDialog,
    addTodo,
  } = useScheduleDetailsPageState(scheduleId as string);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            headerTitle: schedule?.title ?? 'スケジュール詳細',
            headerTintColor: modeColors.text,
            headerTitleStyle: { fontWeight: 'bold' },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  router.push('/scheduleList');
                }}
                style={{ marginLeft: 10 }}
              >
                <Ionicons name="arrow-back" size={24} color={modeColors.text} />
              </TouchableOpacity>
            ),
          }}
        />
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text>読み込み中...</Text>
          </View>
        ) : error ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <View style={styles.chatContainer}>
            <FlatList
              ref={flatListRef}
              data={messages}
              style={{ flex: 1 }}
              contentContainerStyle={{ paddingVertical: 10 }}
              keyExtractor={(item) => item.id}
              renderItem={({ item }: { item: Message }) => (
                <View key={item.id}>
                  {item.type === 'ai' ? (
                    <View style={styles.aiCard}>
                      <Text style={styles.messageContent}>
                        {aiProposalContentsToString(item.ai_proposal_contents)}
                      </Text>
                      <Text style={styles.timestamp}>
                        {new Date(item.created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.userCard}>
                      <Text style={styles.userMessageContent}>
                        {item.content}
                      </Text>
                      <Text style={styles.userTimestamp}>
                        {new Date(item.created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            />
          </View>
        )}

        <ChatInput
          sendUserComment={sendUserComment}
          openTodoDialog={openTodoDialog}
        />

        <AddTodoModal
          visible={todoDialogVisible}
          todoTitle={todoTitle}
          setTodoTitle={setTodoTitle}
          todoMinutes={todoMinutes}
          setTodoMinutes={setTodoMinutes}
          addingTodo={addingTodo}
          todoError={todoError}
          onClose={closeTodoDialog}
          onAdd={addTodo}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
