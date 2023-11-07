import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

const signUp = (req: Request, res: Response) => {
  check('email', 'Invalid Email').isEmail();
  check('password', 'Password must be at least 8 characters long').isLength({
    min: 8,
  });
  check('password', 'Password must contain special character').matches(
    /[$*.{}()?"!@#%&/,><':;|_~`]/,
  );
  check('password', 'Password must contain a number').matches(/[0-9]/);
  check('password', 'Password must contain a lower case letter').matches(/[a-z]/);
  check('password', 'Password must contain an upper case letter').matches(/[A-Z]/);
  check('password', 'Passwords do not match').equals(req.body.confirm_password);

  const Result = validationResult(req);
  console.error('Result.errors:', Result);
  if (!Result.isEmpty()) {
    return res.status(401).send(Result.array());
  }

  res.status(200).send({ message: 'User registered' });
};

const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  res.status(200).send({
    message: `User loged in with  email ${email} and pass ${password}`,
  });
};

const testAuth = (req: Request, res: Response) => {
  res.status(200).send({ message: 'Test auth route works successfully!!!!' });
};

export default { signUp, login, testAuth };
