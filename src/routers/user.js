const express = require('express');

const userController = require('../controllers/user');

const userRouter = new express.Router();

userRouter.get('/:id', userController.getUser);
userRouter.post('/', userController.createUser);

module.exports = userRouter;
