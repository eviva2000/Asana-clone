import React, { useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import thum1 from '../../assets/images/thum1.jpg';
import thum2 from '../../assets/images/thum2.jpg';
import thum3 from '../../assets/images/thum3.jpg';
import thum4 from '../../assets/images/thum4.svg';
import { Project } from '../../types/Project';
import api from '../../api';
import axios from 'axios';

function ProjectList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [projects, setProjects] = useState<Project[]>();
  const thumbnails = [thum1, thum2, thum3, thum4];

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
        // const req = await api();
        const res = await axios.get(`http://localhost:5000/api/project/user/${userId}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getProjects();
  }, [userId]);
  return (
    <div>
      {projects && projects.map((project) => <div key={project.id}>project{project.title}</div>)}
    </div>
  );
}

export default ProjectList;
