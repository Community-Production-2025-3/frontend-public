export interface UserComment {
  id: string;
  user_id: string;
  schedule_id: string;
  ai_proposal_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export type CreateUserCommentParams = {
  content: string;
};
