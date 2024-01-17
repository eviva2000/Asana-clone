export class Task {
  title = '';
  description = null;
  status = '';
  due_date = null;
  user_uid = '';
  completed = false;
  priority = 'medium';
  project_id: number | undefined = undefined;
}
