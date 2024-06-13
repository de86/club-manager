const express = require('express');

const {postUserValidationSchema} = require('../validation/schema/api/user');

const userController = require('../controllers/user');
const validateRequest = require('../middleware/validateRequest');

const userRouter = new express.Router();

userRouter.get('/:id', userController.getUser);
userRouter.post(
    '/',
    validateRequest({bodyValidationSchema: postUserValidationSchema}),
    userController.createUser,
);

module.exports = userRouter;
