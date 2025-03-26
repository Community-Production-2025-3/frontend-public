import { ScheduleMode } from '@/types/schedule';

export const MODE_UNLOCK_RANKS: Record<ScheduleMode, number> = {
  [ScheduleMode.NORMAL]: 0,
  [ScheduleMode.BOOST]: 5,
  [ScheduleMode.VAMPIRE]: 10,
  [ScheduleMode.NUKUNUKU]: 15,
};
