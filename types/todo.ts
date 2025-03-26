export interface Todo {
  id: string;
  userId: string;
  title: string;
  minutes: number;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTodo {
  title: string;
  minutes: number;
}

export interface UpdateTodoStatusParams {
  status: TodoStatus;
}

export enum TodoStatus {
  yet = 0,
  inProgress = 1,
  done = 2,
}
