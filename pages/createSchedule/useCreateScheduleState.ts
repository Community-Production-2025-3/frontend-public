import { useState } from 'react';
import { router } from 'expo-router';
import { CreateTodo } from '@/types/todo';
import { postAPIwithSupabaseToken } from '@/repository/apiClient';
import { CreateScheduleParams, Schedule, ScheduleMode } from '@/types/schedule';

export const useCreateScheduleState = () => {
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .split('T')[0];
  const defaultTitle = `${tomorrow}のスケジュール`;
  const [title, setTitle] = useState<string>(defaultTitle);
  const [todos, setTodos] = useState<CreateTodo[]>([{ title: '', minutes: 0 }]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const addTodo = () => {
    setTodos([...todos, { title: '', minutes: 0 }]);
  };

  const updateTodo = (
    index: number,
    field: keyof CreateTodo,
    value: string,
  ) => {
    const newTodos = [...todos];
    if (field === 'minutes') {
      const minutesValue = value === '' ? 0 : parseInt(value) || 0;
      newTodos[index] = { ...newTodos[index], [field]: minutesValue };
    } else {
      newTodos[index] = { ...newTodos[index], [field]: value };
    }
    setTodos(newTodos);
  };

  const removeTodo = (index: number) => {
    if (todos.length > 1) {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    }
  };

  const createSchedule = async (mode: ScheduleMode = ScheduleMode.NORMAL) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await postAPIwithSupabaseToken<Schedule>(
        '/api/schedule',
        {
          title,
          todos,
          mode,
        } as CreateScheduleParams,
      );
      if (response && response.id) {
        router.navigate(`/schedule/${response.id}`);
      } else {
        setError('スケジュールの作成に失敗しました');
      }
    } catch (error) {
      console.error(error);
      setError('スケジュールの作成に失敗しました');
    } finally {
      setTitle('');
      setTodos([{ title: '', minutes: 0 }]);
      setIsLoading(false);
    }
  };

  return {
    title,
    setTitle,
    todos,
    addTodo,
    updateTodo,
    removeTodo,
    createSchedule,
    isLoading,
    error,
  };
};
