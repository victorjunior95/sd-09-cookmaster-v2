const loginService = require('../services/loginService');

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await loginService.login(email, password);
    return res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
};

module.exports = { userLogin };
