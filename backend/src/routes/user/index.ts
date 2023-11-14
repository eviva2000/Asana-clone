import {
  registerUserToDb,
  updateUserByIdInDB,
  getUserById,
  getAllUsers,
} from '../../controllers/user';
import express, { Router } from 'express';

const userRoute: Router = express.Router();

userRoute.get('/:uid', getUserById);
userRoute.get('/', getAllUsers);
userRoute.put('/', updateUserByIdInDB);
userRoute.post('/', registerUserToDb);

export default userRoute;
