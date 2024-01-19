import { Add } from '@mui/icons-material';
import styles from './kanbanView.module.css';
import KanbanColumn from '../kanbanColumn/KanbanColumn';
import { ViewProps } from '../../types/viewProps';

const KanbanView = ({ tasks, setTasks, categories, allAssignees }: ViewProps) => {
  return (
    <div className={styles.kanban}>
      {Object.entries(categories).map(([sectionTitle, status]) => (
        <div className={styles.column} key={status}>
          <div className={styles.section_title}>
            <h4>{sectionTitle}</h4>

            <Add sx={{ cursor: 'pointer', color: '#7D7A89' }} />
          </div>
          <KanbanColumn
            listId={status}
            tasks={tasks}
            setTasks={setTasks}
            allAssignees={allAssignees}
          />
        </div>
      ))}
    </div>
  );
};

export default KanbanView;
