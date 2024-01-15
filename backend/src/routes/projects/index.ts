import express, { Router } from 'express';
import {
  getAllProjects,
  getProject,
  createProjectAndInviteUsers,
  getProjectsOfUser,
} from '../../controllers/projects';

const projects: Router = express.Router();

projects.get('/', getAllProjects);
projects.get('/:project_id', getProject);
projects.post('/', createProjectAndInviteUsers);
projects.get('/user/:user_uid', getProjectsOfUser);

export default projects;
