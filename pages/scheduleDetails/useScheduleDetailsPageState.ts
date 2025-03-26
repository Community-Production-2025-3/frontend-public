import { useState, useEffect } from 'react';
import { Schedule } from '@/types/schedule';
import { AiProposalContent, AiProposalMaster } from '@/types/aiProposal';
import { CreateUserCommentParams, UserComment } from '@/types/userComment';
import {
  getAPIwithSupabaseToken,
  postAPIwithSupabaseToken,
} from '@/repository/apiClient';
import { supabase } from '@/utils/supabase';
import { CreateTodo } from '@/types/todo';

export interface Message {
  id: string;
  type: 'ai' | 'user';
  schedule_id: string;
  user_id: string;
  content?: string;
  ai_proposal_contents?: AiProposalContent[];
  created_at: string;
  updated_at: string;
}

export const useScheduleDetailsPageState = (scheduleId: string) => {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [todoDialogVisible, setTodoDialogVisible] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoMinutes, setTodoMinutes] = useState<number>(0);
  const [addingTodo, setAddingTodo] = useState(false);
  const [todoError, setTodoError] = useState<string | null>(null);

  useEffect(() => {
    if (!scheduleId) return;

    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        const scheduleData = await getAPIwithSupabaseToken<Schedule>(
          `/api/schedule/${scheduleId}`,
        );
        setSchedule(scheduleData);

        const aiProposalMastersData = await getAPIwithSupabaseToken<
          (AiProposalMaster & { contents: AiProposalContent[] })[]
        >(`/api/aiProposals/${scheduleId}`);

        const userCommentData = await getAPIwithSupabaseToken<UserComment[]>(
          `/api/userComments/${scheduleId}`,
        );

        const formattedMessages: Message[] = [
          ...aiProposalMastersData.map((p) => ({
            ...p,
            type: 'ai' as const,
            schedule_id: p.scheduleId,
            user_id: p.userId,
          })),
          ...userCommentData.map((c) => ({
            ...c,
            type: 'user' as const,
            schedule_id: c.schedule_id,
            user_id: c.user_id,
          })),
        ];

        formattedMessages.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );

        setMessages(formattedMessages);
      } catch (err) {
        console.error(err);
        setError('データの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();

    // ==============================
    // Realtime subscriptions
    // ==============================
    const aiProposalSubscription = supabase
      .channel('ai-proposal-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ai_proposal_masters',
          filter: `schedule_id=eq.${scheduleId}`,
        },
        async (payload) => {
          console.log('AI Proposal change received:', payload);
          if (
            payload.eventType === 'INSERT' ||
            payload.eventType === 'UPDATE'
          ) {
            try {
              const newProposal = payload.new as AiProposalMaster;

              console.log(newProposal);

              const contents = await getAPIwithSupabaseToken<
                AiProposalContent[]
              >(`/api/aiProposalContents/${newProposal.id}`);

              console.log(contents);

              const newMessage: Message = {
                ...newProposal,
                ai_proposal_contents: contents,
                type: 'ai' as const,
                schedule_id: newProposal.scheduleId,
                user_id: newProposal.userId,
              };

              setMessages((prev) => {
                const exists = prev.some((item) => item.id === newProposal.id);
                if (exists) {
                  return prev.map((item) =>
                    item.id === newProposal.id ? newMessage : item,
                  );
                } else {
                  return [...prev, newMessage];
                }
              });
            } catch (err) {
              console.error(err);
            }
          } else if (payload.eventType === 'DELETE') {
            setMessages((prev) =>
              prev.filter((item) => item.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();

    const userCommentSubscription = supabase
      .channel('user-comment-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_comments',
          filter: `schedule_id=eq.${scheduleId}`,
        },
        (payload) => {
          console.log('User Comment change received:', payload);
          if (
            payload.eventType === 'INSERT' ||
            payload.eventType === 'UPDATE'
          ) {
            setMessages((prev) => {
              const newComment = payload.new as UserComment;
              const newMessage = {
                ...newComment,
                type: 'user' as const,
              } as Message;
              const exists = prev.some((item) => item.id === newComment.id);
              if (exists) {
                return prev.map((item) =>
                  item.id === newComment.id ? newMessage : item,
                );
              } else {
                return [...prev, newMessage];
              }
            });
          } else if (payload.eventType === 'DELETE') {
            setMessages((prev) =>
              prev.filter((item) => item.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();

    return () => {
      aiProposalSubscription.unsubscribe();
      userCommentSubscription.unsubscribe();
    };
  }, [scheduleId]);

  const sendUserComment = async (userComment: string) => {
    try {
      await postAPIwithSupabaseToken<UserComment>(
        `/api/userComment/${scheduleId}`,
        {
          content: userComment,
        } as CreateUserCommentParams,
      );
    } catch (err) {
      console.error(err);
      setError('コメントの送信に失敗しました');
    }
  };

  const openTodoDialog = () => {
    setTodoDialogVisible(true);
    setTodoTitle('');
    setTodoMinutes(0);
    setTodoError(null);
  };

  const closeTodoDialog = () => {
    setTodoDialogVisible(false);
  };

  const addTodo = async () => {
    if (!todoTitle.trim()) {
      setTodoError('タイトルを入力してください');
      return;
    }

    if (
      !todoMinutes ||
      isNaN(Number(todoMinutes)) ||
      Number(todoMinutes) <= 0
    ) {
      setTodoError('有効な所要時間（分）を入力してください');
      return;
    }

    try {
      setAddingTodo(true);
      setTodoError(null);

      const newTodo: CreateTodo = {
        title: todoTitle.trim(),
        minutes: Number(todoMinutes),
      };

      await postAPIwithSupabaseToken('/api/todo', {
        scheduleId,
        ...newTodo,
      });

      closeTodoDialog();
    } catch (err) {
      console.error('Failed to add todo:', err);
      setTodoError('Todoの追加に失敗しました');
    } finally {
      setAddingTodo(false);
    }
  };

  return {
    schedule,
    messages,
    loading,
    error,
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
  };
};
