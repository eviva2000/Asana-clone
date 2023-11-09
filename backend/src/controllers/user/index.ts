import { Request, Response } from 'express';
import db from '../../config/db-config';
import { StatusCodes } from 'http-status-codes';

export const getUserById = async (req: Request, res: Response) => {
  try {
    const uid = req.params.uid;
    const user = await db('users').where({ uid });
    console.log(user);
    res.status(StatusCodes.OK).send({ user });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
