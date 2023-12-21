import React, { useEffect } from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

function ProjectList() {
  useEffect(() => {
    const setUser = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user: User | null) => {
        if (user) {
          console.log('user exists');
        }
      });
    };
    setUser();
  }, []);

  return <div>Projects list</div>;
}

export default ProjectList;
