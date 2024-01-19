import { Request, Response } from 'express';
import db from '../../config/db-config';
import { StatusCodes } from 'http-status-codes';
import { user } from '../../interfaces/user';
export const getUserById = async (req: Request, res: Response) => {
  try {
    const uid = req.params.uid;
    const user = await db('users').where({ uid });
    res.status(StatusCodes.OK).send({ user });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const updateUserByIdInDB = async (req: Request, res: Response) => {
  try {
    const uid = req.params.uid;

    const { first_name, last_name, photo_url, phone_number } = req.body;

    const userInfo = await db('users')
      .where('uid', uid)
      .update(first_name, last_name, photo_url, phone_number);
    if (!userInfo) {
      res.status(StatusCodes.NOT_FOUND);
    }
    res.status(StatusCodes.OK).send({ userInfo });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const registerUserToDb = async (req: Request, res: Response) => {
  try {
    const { uid, first_name, email }: user = req.body;

    const newUser = await db('users').insert({
      uid,
      first_name,
      email,
    });

    res.status(StatusCodes.OK).send({ newUser });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await db('users').select('first_name', 'uid');
    res.status(StatusCodes.OK).send(users);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const getUserNamesByUids = async (req: Request, res: Response) => {
  const { uids } = req.body;
  try {
    const users = await db('users').select('first_name', 'uid').whereIn('uid', uids);
    res.status(StatusCodes.OK).send(users);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
