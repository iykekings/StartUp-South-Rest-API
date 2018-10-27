import express from 'express';
import userController from './user.controller';

export const userRouter = express.Router();

userRouter.post('/signUp', userController.signUp);
userRouter.post('/login', userController.login);
