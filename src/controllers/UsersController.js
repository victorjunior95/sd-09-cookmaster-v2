const express = require('express');
const mdw = require('../middlewares');

const usersRouter = express.Router();

usersRouter.get('/', mdw.mdwUsers.usersGetAll);
usersRouter.post('/',
  mdw.mdwUsers.newUserObjectValidator,
  mdw.mdwUsers.newUserExistsValidator,
  mdw.mdwUsers.newUserAdd);

usersRouter.post('/admin',
  mdw.mdwUsers.newUserObjectValidator,
  mdw.mdwLogin.loginTokenValidator,
  mdw.mdwUsers.newUserExistsValidator,
  mdw.mdwUsers.newUserAdminAdd);

module.exports = usersRouter;
