import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, getAuth, onAuthStateChanged } from '@firebase/auth';
import styles from './projectView.module.css';
import thumbnail from '../../assets/images/Rectangle 3025.svg';
import { Task } from '../../types/task';
import { Project } from '../../types/project';
import { Categories } from '../../types/categories';
import api from '../../api';
import { Task as TaskConstructor } from '../../classes/Task';
import { AddCircle } from '@mui/icons-material';
import { Avatar, AvatarGroup, CircularProgress, Tooltip } from '@mui/material';
import { useProjectStore } from '../../store/task.store';

const ProjectView = () => {
  const { id: project_id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [project, setProject] = useState<Project>();
  const [view, setView] = useState<string>('kanban');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [editing, setEditing] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [addUsers, setAddUsers] = useState<boolean>(false);
  const [projectMembers, setProjectMembers] = useState<string[]>();
  const [projectMemberUsernames, setProjectMemberUsernames] = useState<string[]>();
  const { setProjectTitle } = useProjectStore();
  const [allAssignees, setAllassignees] =
    useState<{ first_name: string; last_name: string; uid: string }[]>();
  const categories: Categories = {
    Documentation: 'documentation',
    Ongoing: 'ongoing',
    Todo: 'to_do',
    Done: 'done',
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  };

  const checkIfUserHasAccess = async () => {
    try {
      const req = await api();
      const res = await req.get(`project/${project_id}/users`);
      const fetchedUsers: { project_id: number; user_uid: string }[] = await res.data;
      const users = fetchedUsers.map((user) => user.user_uid);
      setProjectMembers(users);
      users.includes(userId) ? setHasAccess(true) : setHasAccess(false);
      return users.includes(userId);
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const getTasks = async () => {
    const userHasAccess = await checkIfUserHasAccess();
    try {
      if (userHasAccess) {
        const req = await api();
        const res = await req.get(`project/tasks/${project_id}`);
        const tasks = await res.data;
        setTasks(tasks);
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getProject = async () => {
    try {
      const req = await api();
      const res = await req.get(`/project/${project_id}`);
      const project = await res.data;
      setProject(project);
      setProjectTitle(project.title);
    } catch (e) {
      console.error(e);
    }
  };

  const getProjectMemberNames = async () => {
    try {
      if (projectMembers) {
        const req = await api();
        const res = await req.post('/user/names', { uids: projectMembers });
        const data: { first_name: string; last_name: string }[] = res.data;
        const usernames = data.map((user) => `${user.first_name} ${user.last_name}`);
        setProjectMemberUsernames(usernames);
        setAllassignees(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const setUser = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user: User | null) => {
        if (user) {
          setUserId(user.uid);
        }
      });
    };
    setUser();
  }, []);

  useEffect(() => {
    getTasks();
    getProject();
  }, [userId]);

  useEffect(() => {
    getProjectMemberNames();
  }, [projectMembers]);

  const changeView = (view: string) => {
    setView(view);
  };

  const editTitle = (status: string) => {
    setEditing(status);
    setTitle('');
  };

  return !isLoading ? (
    project && hasAccess ? (
      <div className={styles.project_view}>
        <div className={styles.project_box}>
          <div>
            <div className={styles.image_wrap}>
              <img className={styles.thumbnail} src={thumbnail} alt='project thumbnail' />
            </div>
            <div className={styles.title}>
              <span>Project / </span>
              <span className={styles.bold}>Details</span>
              <div className={styles.flex_row}>
                <h2 className={styles.project_title}>{project.title}</h2>
                <AvatarGroup max={4} className={styles.user_icons}>
                  {projectMemberUsernames
                    ? projectMemberUsernames.map((userName) => (
                        <Tooltip key={userName} title={userName}>
                          <Avatar
                            style={{
                              border: '3px solid #fff',
                              marginLeft: '-1rem',
                            }}
                          >
                            {getUserInitials(userName)}
                          </Avatar>
                        </Tooltip>
                      ))
                    : null}
                </AvatarGroup>
                <AddCircle
                  style={{ color: '#110D59', cursor: 'pointer', width: '2.5rem', height: '2.5rem' }}
                  onClick={() => setAddUsers(true)}
                />
              </div>
            </div>
          </div>
          <div className={styles.views}>
            <span
              onClick={() => changeView('kanban')}
              className={`${view === 'kanban' ? styles.bold : ''}`}
            >
              Kanban
            </span>{' '}
            <span
              onClick={() => changeView('list')}
              className={`${view === 'list' ? styles.bold : ''}`}
            >
              List
            </span>
          </div>
        </div>
      </div>
    ) : (
      <h3>Project Not Found</h3>
    )
  ) : (
    <CircularProgress />
  );
};

export default ProjectView;
