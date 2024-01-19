import express, { Router } from 'express';

import {
  getTasksForProjectAndUser,
  getAllTasksOfProject,
  addNewTask,
} from '../../controllers/tasks';
const tasks: Router = express.Router();
tasks.get('/:project_id/:user_id', getTasksForProjectAndUser);
tasks.get('/:project_id/', getAllTasksOfProject);
tasks.post('/', addNewTask);

export default tasks;
