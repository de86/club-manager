require('dotenv').config();

const logger = require('./src/utils/logger');

const express = require('express');
const app = express();

const {SERVER_PORT} = process.env; // eslint-disable-line no-undef

app.get('/', (req, res) => {
  res.send(`Hello World!`)
});

app.listen(SERVER_PORT, () => {
  logger.log(`Example app listening on port ${SERVER_PORT}`)
});