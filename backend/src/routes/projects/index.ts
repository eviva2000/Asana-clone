import express, { Router } from 'express';
import {
  getAllProjects,
  getProject,
  createProjectAndInviteUsers,
  getProjectsOfUser,
  getAmountOfTasks,
  getUsersOfProject,
  inviteUsersToProject,
} from '../../controllers/projects';

const projects: Router = express.Router();

projects.get('/', getAllProjects);
projects.get('/:project_id', getProject);
projects.post('/', createProjectAndInviteUsers);
projects.get('/user/:user_uid', getProjectsOfUser);
projects.get('/:project_id/tasks/count', getAmountOfTasks);
projects.get('/:project_id/users', getUsersOfProject);
projects.post('/:project_id/invite-users', inviteUsersToProject);

export default projects;
