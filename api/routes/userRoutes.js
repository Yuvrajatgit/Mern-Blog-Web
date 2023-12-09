const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const authRouter = express.Router();
const userRouter = express.Router();

authRouter.post('/register', authController.signup);
authRouter.post('/login', authController.login);

userRouter.get('/', authController.protect, userController.getUser);

module.exports = {authRouter, userRouter};