const {
  registerUserService,
  loginService,
  registerAdminService,
} = require('../services/usersService');

const registerUserController = async (req, res) => {
  const { body } = req;
  const result = await registerUserService(body);
  const { code, response } = result;
  return res.status(code).json(response);
};

const loginController = async (req, res) => {
  const { body } = req;
  const result = await loginService(body);
  const { code, response } = result;
  return res.status(code).json(response);
};

const registerAdminController = async (req, res) => {
  const { body, payload } = req;
  const result = await registerAdminService(body, payload);
  const { code, response } = result;
  return res.status(code).json(response);
};

module.exports = {
  registerUserController,
  loginController,
  registerAdminController,
};
