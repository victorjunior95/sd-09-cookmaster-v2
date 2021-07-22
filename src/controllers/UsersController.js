const express = require('express');
// const usersService = require('../services/UsersService');

const UserRouter = express.Router();

UserRouter.post('/users', (req, _res) => {
  console.log(req.body);
  // const { name, email, password } = req.body;
  // const user = { name, email, password, role: 'user' };
  // const { status, newUser } = usersService.register(user);

  // res.status(status).json(newUser);
});

module.exports = UserRouter;

// const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;
//   // console.log(name, email, password);
//   const user = { name, email, password, role: 'user' };
//   const { status, newUser } = await usersService.register(user);

//   res.status(status).json(newUser);
// };
