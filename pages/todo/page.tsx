import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { ActivityIndicator, Text } from 'react-native-paper';
import { FlatList, ScrollView, View } from 'react-native';
import { Todo, TodoStatus } from '@/types/todo';
import {
  getAPIwithSupabaseToken,
  putAPIwithSupabaseToken,
} from '@/repository/apiClient';
import { styles } from './style';
import TodoItem from './components/TodoItem';
import UserCard from './components/UserCard';

export default function TodoPageContent() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const data = await getAPIwithSupabaseToken<Todo[]>('/api/todos');
      if (!data) {
        setError('Failed to load todos. Please try again later.');
        return;
      }
      setTodos(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
      setError('Failed to load todos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const updateTodoStatus = async (id: string, status: TodoStatus) => {
    try {
      const res = await putAPIwithSupabaseToken(`/api/todo/${id}`, { status });
      if (!res) {
        setError('Failed to update todo. Please try again later.');
        return;
      }
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, status: status } : todo,
        ),
      );
      fetchTodos();
    } catch (err) {
      console.error('Failed to update todo status:', err);
      setError('Failed to update todo. Please try again later.');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <Stack.Screen
        options={{
          title: 'TODO',
          headerShown: true,
        }}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        {todos && <UserCard todos={todos} />}
        {loading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            scrollEnabled={false}
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TodoItem
                todo={item}
                onStatusChange={(status: TodoStatus) =>
                  updateTodoStatus(item.id, status)
                }
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text>No todos found. Create some to get started!</Text>
              </View>
            }
          />
        )}
        {/* <View style={{marginBottom:20}}></View> */}
      </ScrollView>
    </SafeAreaView>
  );
}
