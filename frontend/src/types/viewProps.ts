import { Task } from './task';
import { Categories } from './categories';

export type ViewProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  categories: Categories;
  allAssignees: { first_name: string; last_name: string; uid: string }[] | undefined;
};
