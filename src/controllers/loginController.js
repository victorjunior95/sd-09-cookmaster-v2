const loginService = require('../services/loginService');

const userLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const login = await loginService.userLoginService(email, password);
    return res.status(200).json(login);
  } catch (error) {
  return next(error);
  }
};

module.exports = userLoginController;
