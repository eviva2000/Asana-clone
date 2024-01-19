import { Autocomplete, Button, CircularProgress, Dialog, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { User } from '../../types/user';
import api from '../../api';
import styles from './modal.module.css';
import axios from 'axios';

const AddUsersDialog = ({
  projectMembers,
  setProjectMembers,
  setAddUsers,
  addUsers,
  projectId,
}: {
  projectMembers: string[] | undefined;
  setAddUsers: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectMembers: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  addUsers: boolean;
  projectId: string | undefined;
}) => {
  const [users, setUsers] = useState<User[]>();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchAndSetUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user');
        const users: User[] = await res.data;
        const filteredUsers = users.filter((user) => !projectMembers?.includes(user.uid));
        setUsers(filteredUsers);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAndSetUsers();
  }, []);

  const inviteUsers = async () => {
    try {
      const uids = selectedUsers.map((user) => user.uid);
      const data = {
        uids: uids,
      };
      await axios.post(`http://localhost:5000/api/project/${projectId}/invite-users`, data);
      if (projectMembers) {
        setProjectMembers([...projectMembers, ...uids]);
      } else {
        setProjectMembers([...uids]);
      }
      setAddUsers(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={addUsers} onClose={() => setAddUsers(false)}>
      <div className={styles.dialog}>
        <h3>Add More Users To This Project</h3>
        {users ? (
          users.length === 0 ? (
            <p>No users available</p>
          ) : (
            <Autocomplete
              multiple
              options={users}
              value={selectedUsers}
              defaultValue={selectedUsers}
              getOptionLabel={(option) => (option ? `${option.first_name}` : '')}
              onChange={(e, addedUser) => {
                setSelectedUsers(addedUser);
              }}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} />}
            />
          )
        ) : (
          <CircularProgress />
        )}
        <Button onClick={inviteUsers}>Add Users</Button>
      </div>
    </Dialog>
  );
};

export default AddUsersDialog;
