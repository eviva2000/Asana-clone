export type Task = {
  id: number | string;
  title: string;
  description: string;
  status: string;
  due_date: string | null;
  assignee?: string;
  completed: boolean;
  priority: string;
  project_id: number | undefined;
  user_uid: string;
};
