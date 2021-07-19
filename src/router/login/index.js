const express = require('express');
const { createLogin } = require('../../controllers/login');

const loginRouter = express.Router();

loginRouter.post('/', createLogin);

module.exports = loginRouter;