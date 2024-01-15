import React from 'react';
import styles from './TaskItem.module.css';
import Calendar from '../../assets/icons/calendar.png';
import Assigned from '../../assets/icons/assigned.png';
import Circle from '../../assets/icons/checked.png';
import { Project } from '../../types/Project';
import { useNavigate } from 'react-router-dom';

interface TaskItemProps {
  project: Project;
}

function TaskItem({ project }: TaskItemProps) {
  const { title, thumbnail_link, date_of_creation, amount_of_tasks, amount_of_completed_tasks } =
    project;
  const navigate = useNavigate();

  const completedPercentage =
    amount_of_completed_tasks && amount_of_tasks && +amount_of_completed_tasks
      ? ((amount_of_completed_tasks / amount_of_tasks) * 100).toFixed(0)
      : 0;

  return (
    <div className={styles.task_item} onClick={() => navigate(`/project/${project.id}`)}>
      <div className={styles.task_info}>
        <img src={thumbnail_link} className={styles.thumbnail_image} />
        <div>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.icon_container}>
            <p>
              <img src={Calendar} alt='Calendar' />{' '}
              {new Intl.DateTimeFormat('en-GB', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              })
                .format(new Date(date_of_creation))
                .replace(`/`, '.')
                .replace(`/`, '.')}
            </p>
            <p>
              <img src={Assigned} alt='assigned-task' /> {amount_of_tasks}
            </p>
            <p>
              <img src={Circle} alt='Circle' /> {amount_of_completed_tasks}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.progress_conteiner}>
        <div className={styles.progress_bar}>
          <div className={styles.percentage_bar} style={{ width: `${completedPercentage}%` }}></div>
        </div>
        <span className={styles.percentage_number}>{completedPercentage}%</span>
      </div>
    </div>
  );
}

export default TaskItem;
