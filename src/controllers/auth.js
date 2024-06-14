const jwt = require('jsonwebtoken');
const {verifyPassword} = require('../utils/password');

const {httpStatus} = require('../utils/constants');
const {signJWTAsync, verifyJWTAsync} = require('../utils/jwt');
const {User} = require('../models/User');
const logger = require('../utils/logger');


module.exports = {
    login,
    refreshAccessToken,
}


async function login (req, res) {
    let user;
    try {
        user = await User.getByEmail(req.body.email);
        if (!user) {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
    } catch (e) {
        logger.error(`Error retrieving user data for id ${decoded.userId}:`, e);
        
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
        const isPasswordValid = await verifyPassword(req.body.password, user.data.password);
        if (!isPasswordValid) {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
    } catch (e) {
        logger.error(`Error verifying password for user with id ${decoded.userId}:`, e);
        
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }

    let accessToken, refreshToken;
    try {
        accessToken = await signJWTAsync(
            {userId: user.data.id},
            process.env.JWT_SIGNING_PRIVATE_KEY,
            {expiresIn: process.env.ACCESS_TOKEN_LIFETIME},
        );
        refreshToken = await signJWTAsync(
            {userId: user.data.id},
            process.env.JWT_SIGNING_PRIVATE_KEY,
            {expiresIn: process.env.REFRESH_TOKEN_LIFETIME}
        );
    } catch (e) {
        logger.error(`Error singing JWT for user id ${decoded.userId}:`, e);
        
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }

    return res.status(httpStatus.OK).send({accessToken, refreshToken});
}


async function refreshAccessToken (req, res) {
    let decoded;
    try {
        decoded = await verifyJWTAsync(req.body.refreshToken, process.env.JWT_SIGNING_PRIVATE_KEY);
    } catch (e) {
        logger.error('Error decoding refresh token:', e);
        
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    let user;
    try {
        user = await User.getById(decoded.userId);
        if (!user) {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
    } catch (e) {
        logger.error(`Error retrieving user data for id ${decoded.userId}:`, e);
        
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }

    let accessToken;
    try {
        accessToken = await signJWTAsync(
            {userId: user.data.id},
            process.env.JWT_SIGNING_PRIVATE_KEY,
            {expiresIn: process.env.REFRESH_TOKEN_LIFETIME}
        );
    } catch (e) {
        logger.error(`Error signing JWT for id ${decoded.userId}:`, e);
        
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }

    return res.status(httpStatus.OK).send({accessToken});
}
