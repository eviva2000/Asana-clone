import { Add } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import styles from './kanbanView.module.css';
import KanbanColumn from '../kanbanColumn/KanbanColumn';
import { ViewProps } from '../../types/viewProps';

const KanbanView = ({
  tasks,
  setTasks,
  title,
  setTitle,
  editing,
  setEditing,
  addNewTask,
  onDragEnd,
  editTitle,
  categories,
  allAssignees,
}: ViewProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.kanban}>
        {Object.entries(categories).map(([sectionTitle, status]) => (
          <div className={styles.column} key={status}>
            <div className={styles.section_title}>
              <h4>{sectionTitle}</h4>
              {editing === status ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addNewTask(status);
                    setEditing('');
                    setTitle('');
                  }}
                >
                  <TextField
                    placeholder='Enter a title'
                    variant='filled'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    inputProps={{
                      style: {
                        padding: 5,
                        background: 'white',
                      },
                    }}
                  />
                </form>
              ) : (
                <Add
                  sx={{ cursor: 'pointer', color: '#7D7A89' }}
                  onClick={() => editTitle(status)}
                />
              )}
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
    </DragDropContext>
  );
};

export default KanbanView;
