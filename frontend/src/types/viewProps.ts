import { Task } from './task';
import { Categories } from './categories';

export type ViewProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  editing: string;
  setEditing: React.Dispatch<React.SetStateAction<string>>;
  addNewTask: (status: string) => void;
  editTitle: (status: string) => void;
  categories: Categories;
  allAssignees: { first_name: string; uid: string }[] | undefined;
  onDragEnd: (result: any) => void;
};
