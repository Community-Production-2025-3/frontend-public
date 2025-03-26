export interface OpenAISchedule {
  schedule: {
    start_time: string;
    end_time: string;
    content: string;
  }[];
}
