const authentication = require('./authentication_Middleware');
const { MISSING_TOKEN } = require('../Messages/errors');

const validateLogin = async (req, res, next) => {
  const token = req.headers.authorization;
  const { code, message } = MISSING_TOKEN;

  try {
    const userId = await authentication(token);
    if (userId.code === 401) {
      return res.status(code).json({ message });
    }
    req.payload = userId;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(code).json({ message });
  }
};

module.exports = validateLogin;
