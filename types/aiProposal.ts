export interface AiProposalMaster {
  id: string;
  userId: string;
  scheduleId: string;
  created_at: string;
  updated_at: string;
}

export interface CreateAiProposal {
  content: string;
}

export interface UpdateAiProposal {
  content: string;
}

export interface AiProposalContent extends AiProposalMaster {
  id: string;
  start_time: string;
  end_time: string;
  content: string;
  status: boolean;
}

export const aiProposalContentsToString = (
  aiProposalContents: AiProposalContent[] | undefined,
): string => {
  if (!Array.isArray(aiProposalContents)) {
    console.error('aiProposalContents is not an array:', aiProposalContents);
    return '';
  }

  return aiProposalContents
    .map(
      (content) =>
        `${content.start_time} - ${content.end_time}: ${content.content}`,
    )
    .join('\n');
};
