import React from 'react';
import ProjectItem from './ProjectItem';
import styles from './projectList.module.css';
import { Project } from '../../types/Project';

interface TaskListProps {
  projects: Project[];
}

function TaskList({ projects }: TaskListProps) {
  return (
    <div className={styles.task_list}>
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
}

export default TaskList;
