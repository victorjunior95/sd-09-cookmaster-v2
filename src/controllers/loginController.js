const loginService = require('../services/loginService');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const loginIsValid = await loginService.authentication(email, password);

  return loginIsValid.message
    ? next(loginIsValid)
    : res.status(200).json({ token: loginIsValid });
};

module.exports = {
  login,
};
