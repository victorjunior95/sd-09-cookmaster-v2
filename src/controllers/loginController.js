const loginService = require('../services/loginService');

const chekLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validationResult = await loginService.login(email, password);

    return res.status(200).json(validationResult);
  } catch (err) {
    console.log('[Error login Controller] > ', err.message);
    return next(err);
  }
};

module.exports = { chekLogin };
