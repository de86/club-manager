const express = require('express');

const authController = require('../controllers/auth');
const validateRequest = require('../middleware/validateRequest');
const {
    postLoginValidationSchema,
    postRefreshSchema
} = require('../validation/schema/api/auth');

const authRouter = new express.Router();

authRouter.post(
    '/login',
    validateRequest({bodyValidationSchema: postLoginValidationSchema}),
    authController.login,
);
authRouter.post(
    '/refresh',
    validateRequest({bodyValidationSchema: postRefreshSchema}),
    authController.refreshAccessToken,
);

module.exports = authRouter;
