import React, { useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { Project } from '../../types/Project';
import Modal from '../../components/modal/Modal';
import styles from './projectList.module.css';
import ProjectsItems from './ProjectsItems';
import { User as UserType } from '../../types/user';
function ProjectList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [projects, setProjects] = useState<Project[]>();
  const thumb1 = '/assets/images/thum1.jpg';
  const thumb2 = '/assets/images/thum2.jpg';
  const thumb3 = '/assets/images/thum3.jpg';
  const thumb4 = '/assets/images/thum4.svg';
  const thumbnails = [thumb1, thumb2, thumb3, thumb4];

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

  const getProjects = async () => {
    try {
      if (userId) {
        const res = await axios.get(`http://localhost:5000/api/project/user/${userId}`);
        const projects = await Promise.all(
          res.data.map(async (project: Project, index: number) => {
            project.thumbnail_link = thumbnails[index % thumbnails.length];
            return project;
          }),
        );
        setProjects(projects);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getProjects();
  }, [userId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProject = async (projectName: string, team: UserType[]) => {
    if (projectName.trim()) {
      const invitedUserUids = team.map((user) => user.uid);
      const project = {
        title: projectName,
        date_of_creation: new Date().toISOString().split('T')[0],
        user_uid: userId,
        thumbnail_link: thumbnails[projects ? projects.length % thumbnails.length : 0],
        uids: invitedUserUids,
      };
      try {
        const res = await axios.post(`http://localhost:5000/api/project`, project);
        const newProject = res.data;
        if (projects) {
          setProjects([...projects, newProject]);
        } else {
          setProjects(newProject);
        }
      } catch (e) {
        console.error(e);
      }
    }
    closeModal();
  };
  console.log(projects);
  return (
    <div className={styles.project_list_container}>
      <div className={styles.right_align}>
        <button className={styles.create_project} onClick={openModal}>
          Create a project
        </button>
      </div>
      {projects?.length ? (
        <>
          <ProjectsItems projects={projects} />
          {isModalOpen && (
            <Modal
              handleCreateProject={handleCreateProject}
              closeModal={closeModal}
              thumbnail={thumbnails[projects ? projects.length % thumbnails.length : 0]}
              userUid={userId}
            />
          )}
        </>
      ) : (
        <div className={styles.no_project}>You dont have any project yet!</div>
      )}
    </div>
  );
}

export default ProjectList;
