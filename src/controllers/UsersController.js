const express = require('express');
const mdw = require('../middlewares');

const usersRouter = express.Router();

usersRouter.get('/', mdw.mdwUsers.usersGetAll);
usersRouter.post('/',
  mdw.mdwUsers.newUserObjectValidator,
  mdw.mdwUsers.newUserExistsValidator,
  mdw.mdwUsers.newUserAdd);

module.exports = usersRouter;
