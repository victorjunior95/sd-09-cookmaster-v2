const express = require('express');

const UserRouter = express.Router();

UserRouter.post('/', async (_req, _res, _next) => {
  //
});

// UserRouter.get('/', (req, res) => {  })

module.exports = UserRouter;
