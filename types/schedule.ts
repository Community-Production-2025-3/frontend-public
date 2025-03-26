import { AiProposalContent } from './aiProposal';
import { CreateTodo } from './todo';

export interface Schedule {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
}

export interface ScheduleWithLatestAiProposal {
  id: string;
  title: string;
  created_at: string;
  user_id: string;
  latest_ai_proposal: {
    id: string;
    created_at: string;
    updated_at: string;
    user_id: string;
    contents: AiProposalContent[];
    schedule_id: string;
  };
}

export interface CreateScheduleParams {
  title: string;
  todos: CreateTodo[];
  mode: ScheduleMode;
}

/**
 * スケジュールの難易度を表す列挙型
 */
export enum ScheduleMode {
  NORMAL = 1, // 通常の難易度
  BOOST = 2, // 難しい
  VAMPIRE = 3, // 特殊な難易度
  NUKUNUKU = 4, // 簡単な難易度
}

export interface ModeButtonProps {
  isEnabled: boolean;
  onPress: () => void;
  title: string;
  lockedText: string;
  disabled: boolean;
}
