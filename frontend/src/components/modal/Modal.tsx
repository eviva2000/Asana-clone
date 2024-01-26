import React, { useState, useEffect } from 'react';
import styles from './modal.module.css';
import { Autocomplete, TextField } from '@mui/material';
import { User } from '../../types/user';
import axios from 'axios';

interface ProjectModalProps {
  closeModal: () => void;
  handleCreateProject: any;
  thumbnail: string;
  userUid: string;
}

function ProjectModal({ closeModal, handleCreateProject, thumbnail, userUid }: ProjectModalProps) {
  const [users, setUsers] = useState<User[]>();
  const [projectName, setProjectName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchAndSetUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user');
        const users = await res.data;
        setUsers(users);
        setSelectedUsers([users.find((user: User) => user.uid === userUid)]);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAndSetUsers();
  }, []);

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <div className={styles.flex_row}>
          <h2>New Project</h2>
          <button className={styles.close_button} onClick={closeModal}>
            <img src='/assets/icons/x.png' alt='Close' className={styles.close_icon} />
          </button>
        </div>
        <div className={styles.left_content}>
          <label>Thumbnail</label>
          <div className={styles.thumbnail_container}>
            <img src={thumbnail} alt='Thumbnail' className={styles.modal_thumbnail_image} />
          </div>
        </div>
        <div>
          <label>Project name</label>
          <TextField
            variant='outlined'
            value={projectName}
            placeholder='Input Text Here'
            onChange={(e) => setProjectName(e.target.value)}
            className={styles.mui}
            sx={{
              '& .MuiInputBase-root.MuiOutlinedInput-root ::placeholder': {
                color: '#2B283D',
                opacity: 1,
              },
            }}
          />
          {users ? (
            <>
              <label>Team</label>
              <Autocomplete
                className={styles.mui}
                multiple
                options={users}
                value={selectedUsers}
                defaultValue={selectedUsers}
                getOptionLabel={(option) => (option ? `${option.first_name}` : '')}
                onChange={(e, addedUser) => {
                  setSelectedUsers(addedUser);
                }}
                filterSelectedOptions
                renderInput={(params) => <TextField className={styles.mui} {...params} />}
              />
            </>
          ) : null}
        </div>
        <button
          className={styles.create_button}
          onClick={() => handleCreateProject(projectName, selectedUsers)}
        >
          Create Project
        </button>
      </div>
    </div>
  );
}

export default ProjectModal;
