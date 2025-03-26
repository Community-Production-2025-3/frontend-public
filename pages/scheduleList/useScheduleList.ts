import { getAPIwithSupabaseToken } from '@/repository/apiClient';
import { Schedule } from '@/types/schedule';
import { useEffect, useState, useCallback } from 'react';

export const useScheduleList = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const schedules =
        await getAPIwithSupabaseToken<Schedule[]>('/api/schedules');
      setSchedules(schedules);
    } catch (error) {
      console.error(error);
      setError('スケジュールの取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshSchedules = useCallback(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  return { schedules, isLoading, error, refreshSchedules };
};
