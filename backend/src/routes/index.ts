import express, { Router } from 'express';
import auth from './auth';
import userRoute from './user';
const router: Router = express.Router();

router.use('/auth', auth);
router.use('/user', userRoute);
export default router;
