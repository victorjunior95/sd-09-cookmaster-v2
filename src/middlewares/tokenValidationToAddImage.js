const jwt = require('jsonwebtoken');

const SECRET = 'xinforinfola'; // SECRETE aqui apenas para fins didaticos

const tokenValidationToAddImage = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const objectError = {
      code: 401,
      message: 'missing auth token',
    };
    next(objectError);
  }
  try {
    jwt.verify(token, SECRET);
    return next();
  } catch (error) {
    const err = { code: 401, message: error.message };
    return next(err);
  }
};

module.exports = tokenValidationToAddImage;