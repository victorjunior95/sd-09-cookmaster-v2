const userService = require('../services/users');

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const response = await userService.userLogin(email, password);
  return res.status(response.status).json(response.payload);
};

module.exports = loginController;
