import { Task } from '../../types/task';
import React from 'react';
import { useEffect, useState } from 'react';
import { MoreHoriz } from '@mui/icons-material';
import styles from './kanbanColumn.module.css';

type KanbanColumnProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  listId: string;
  allAssignees: { first_name: string; last_name: string; uid: string }[] | undefined;
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({ tasks, listId, allAssignees }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div>
      <div className={styles.droppable}>
        {tasks
          .filter((task) => task.status === listId)
          .map((task) => {
            return (
              <div className={styles.kanban_task} key={task.id}>
                <div className={styles.kanban_task_row}>
                  <span className={`${styles.priority} ${styles[task.priority.toLowerCase()]}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                  <MoreHoriz sx={{ color: '#7D7A89' }} /* on click open task detail component */ />
                </div>
                <h2
                  className={`${styles.kanban_title} ${
                    task.completed ? styles.completed_task : ''
                  }`}
                >
                  {task.title}
                </h2>
                <div className={styles.description}>{task.description}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default KanbanColumn;
