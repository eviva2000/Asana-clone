import React, { useState, useEffect } from 'react';
import { Task } from '../../types/task';
import styles from './listTable.module.css';
import { Avatar, Checkbox, Tooltip, useMediaQuery } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, Flag } from '@mui/icons-material';
import { Draggable, Droppable } from 'react-beautiful-dnd';

type ListTableProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  listId: string;
  allAssignees: { first_name: string; uid: string }[] | undefined;
};

const ListTable: React.FC<ListTableProps> = ({ tasks, listId, allAssignees }: ListTableProps) => {
  const isMobile = useMediaQuery('(max-width: 550px)');
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
    <div className={styles.border_radius}>
      {!isMobile ? (
        <div className={styles.grid_container}>
          <div className={`${styles.grid_item} ${styles.first_row} ${styles.title}`}>Task</div>
          <div className={`${styles.grid_item} ${styles.first_row}`}>DueDate</div>
          <div className={`${styles.grid_item} ${styles.first_row}`}>Priority</div>
          <div className={`${styles.grid_item} ${styles.first_row}`}>Assigne</div>
        </div>
      ) : null}
      <Droppable droppableId={listId} isDropDisabled={false}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className={styles.droppable}>
            {tasks
              .filter((task) => task.status === listId)
              .map((task) => {
                const globalIndex = tasks.findIndex((item) => item.id === task.id);
                return (
                  <Draggable key={task.id} draggableId={String(task.id)} index={globalIndex}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div
                          className={`${styles.grid_container} ${styles.task_row}`}
                          key={task.id}
                        >
                          <div
                            className={`${styles.grid_item} ${styles.title} ${
                              task.completed ? styles.completed_task : ''
                            }`}
                          >
                            <Checkbox
                              checked={task.completed}
                              icon={<RadioButtonUnchecked style={{ color: '#7D7A89' }} />}
                              checkedIcon={<CheckCircle style={{ color: '#5FB918' }} />}
                              // onClick={() => handleCheckbox(task)}
                            />
                            {task.title}
                          </div>
                          <div className={styles.grid_item}>
                            {task.due_date
                              ? new Date(task.due_date).toLocaleString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                })
                              : '—'}
                          </div>
                          {!isMobile ? (
                            <div className={styles.grid_item}>
                              <Flag
                                style={{
                                  color:
                                    task.priority === 'easy'
                                      ? '#1AC391'
                                      : task.priority === 'hard'
                                      ? '#F14D4D'
                                      : '#F18524',
                                }}
                              />
                              {task.priority}
                            </div>
                          ) : null}

                          <div className={styles.grid_item}>
                            {' '}
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
                          </div>
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

export default ListTable;
