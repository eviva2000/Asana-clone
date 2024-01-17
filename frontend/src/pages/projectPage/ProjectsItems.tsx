import React from 'react';
import ProjectItem from './project_item/ProjectItem';
import styles from './projectList.module.css';
import { Project } from '../../types/project';

interface TaskListProps {
  projects: Project[];
}

function ProjectsItems({ projects }: TaskListProps) {
  return (
    <div className={styles.task_list}>
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
}

export default ProjectsItems;
