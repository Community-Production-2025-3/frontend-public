import { MODE_UNLOCK_RANKS } from '@/constants/ModeUnlockRanks';
import { ScheduleMode } from '@/types/schedule';

export function enableModeUnlockRank(
  mode: ScheduleMode,
  rank: number,
): boolean {
  return rank >= (MODE_UNLOCK_RANKS[mode] ?? Infinity);
}
