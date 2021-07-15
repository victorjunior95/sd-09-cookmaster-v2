const {
  registerUserService,
  loginService,
} = require('../services/usersService');

const registerUserController = async (req, res) => {
  const { body } = req;
  const result = await registerUserService(body);
  const { code, response } = result;
  res.status(code).json(response);
};

const loginController = async (req, res) => {
  const { body } = req;
  const result = await loginService(body);
  const { code, response } = result;
  res.status(code).json(response);
};

module.exports = {
  registerUserController,
  loginController,
};
