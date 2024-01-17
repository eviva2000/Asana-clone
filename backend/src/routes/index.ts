import express, { Router } from 'express';
import auth from './auth';
import userRoute from './user';
import projects from './projects';
import tasks from './tasks';
import { validateAuth } from '../helpers/auth';

const router: Router = express.Router();

router.use('/auth', auth);
router.use('/user', userRoute);
router.use('/project', projects);
router.use('/project/tasks', tasks);
export default router;
