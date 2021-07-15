const express = require('express');
const mdw = require('../middlewares');

const loginRouter = express.Router();

loginRouter.post('/',
  mdw.mdwLogin.loginObjectValidator,
  mdw.mdwLogin.loginExistsValidator,
  mdw.mdwLogin.loginTokenGenerator);

module.exports = loginRouter;
