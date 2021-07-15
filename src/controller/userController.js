const express = require('express');

const UserRouter = express.Router();

UserRouter.get('/', async (req, res) => {
  return res.status(200).json({ hello: 'world' });
});

module.exports = UserRouter;