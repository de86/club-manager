const express = require('express');

const authController = require('../controllers/auth');
const validateRequest = require('../middleware/validateRequest');
const {postLoginValidationSchema} = require('../validation/schema/api/auth');

const authRouter = new express.Router();

authRouter.post(
    '/login',
    validateRequest({bodyValidationSchema: postLoginValidationSchema}),
    authController.login,
)

module.exports = authRouter;