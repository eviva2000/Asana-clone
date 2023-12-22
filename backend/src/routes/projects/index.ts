import express, { Router } from 'express';
import {
  getAllProjects,
  getProject,
  createProjectAndInviteUsers,
} from '../../controllers/projects';

const projects: Router = express.Router();

projects.get('/', getAllProjects);
projects.get('/:project_id', getProject);
projects.post('/', createProjectAndInviteUsers);

export default projects;
