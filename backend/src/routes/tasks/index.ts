import express, { Router } from 'express';

import { getTasksForProjectAndUser, getAllTasksOfProject } from '../../controllers/tasks';
const tasks: Router = express.Router();
tasks.get('/:project_id/:user_id', getTasksForProjectAndUser);
tasks.get('/:project_id/', getAllTasksOfProject);

export default tasks;
