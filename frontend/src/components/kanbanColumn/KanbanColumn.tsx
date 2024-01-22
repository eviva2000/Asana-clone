import { Task } from '../../types/task';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import { MoreHoriz, CalendarMonth } from '@mui/icons-material';
import styles from './kanbanColumn.module.css';
import { Avatar, Tooltip } from '@mui/material';

type KanbanColumnProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  listId: string;
  allAssignees: { first_name: string; uid: string }[] | undefined;
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
      <Droppable droppableId={listId} isDropDisabled={false}>
        {(provided) => (
          <div className={styles.droppable} {...provided.droppableProps} ref={provided.innerRef}>
            {tasks
              .filter((task) => task.status === listId)
              .map((task) => {
                const globalIndex = tasks.findIndex((item) => item.id === task.id);
                return (
                  <Draggable key={task.id} draggableId={String(task.id)} index={globalIndex}>
                    {(provided) => (
                      <div
                        className={styles.kanban_task}
                        key={task.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className={styles.kanban_task_row}>
                          <span
                            className={`${styles.priority} ${styles[task.priority.toLowerCase()]}`}
                          >
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                          <MoreHoriz
                            sx={{ color: '#7D7A89' }} /* on click open task detail component */
                          />
                        </div>
                        <h2
                          className={`${styles.kanban_title} ${
                            task.completed ? styles.completed_task : ''
                          }`}
                        >
                          {task.title}
                        </h2>
                        <div className={styles.description}>{task.description}</div>
                        <div className={styles.kanban_task_row}>
                          {task.user_uid && allAssignees ? (
                            <Tooltip
                              title={`${allAssignees.find(
                                (assignee) => assignee.uid === task.user_uid,
                              )?.first_name}`}
                            >
                              <Avatar
                                sx={{ height: '1.5rem', width: '1.5rem', fontSize: '0.75rem' }}
                              >
                                {
                                  allAssignees.find((assignee) => assignee.uid === task.user_uid)
                                    ?.first_name[0]
                                }
                              </Avatar>
                            </Tooltip>
                          ) : null}
                          <span>{task.assignee}</span>
                          <span className={styles.date}>
                            {task.due_date ? (
                              <>
                                <CalendarMonth
                                  sx={{
                                    color: '#7D7A89',
                                    paddingRight: '0.25rem',
                                  }}
                                />
                                {new Date(task.due_date).toLocaleString('en-GB', {
                                  month: 'short',
                                })}
                              </>
                            ) : null}
                          </span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
