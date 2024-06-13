require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const initDb = require('./database');
const authRouter = require('./routers/auth');
const userRouter = require('./routers/user');
const logger = require('./utils/logger');
const {httpStatus} = require('./utils/constants');

// Init DB
initDb();

// Init app
const {SERVER_PORT} = process.env; // eslint-disable-line no-undef
const app = express();

// Global middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Attach routes
app.get('/', (req, res) => res.status(httpStatus.OK).send('OK'));
app.use('/auth', authRouter);
app.use('/user', userRouter);

// Start server
app.listen(SERVER_PORT, () => {
    logger.info(`Example app listening on port ${SERVER_PORT}`)
});