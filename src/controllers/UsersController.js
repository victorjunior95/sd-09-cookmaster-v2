const express = require('express');
const mdw = require('../middlewares');

const usersRouter = express.Router();

usersRouter.get('/', mdw.mdwUsers.users);

module.exports = usersRouter;
