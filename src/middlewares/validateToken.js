const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

const SECRET = 'cookmaster';
const HTTP_UNAUTHORIZED_STATUS = 401;

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next({ status: HTTP_UNAUTHORIZED_STATUS, err: 'missing auth token' });
  }
  try {
    const payload = jwt.verify(token, SECRET);
    const user = await userModel.findUser(payload.email);
    if (!user) {
      return next({ status: HTTP_UNAUTHORIZED_STATUS, err: 'invalid user' });
    }
    const { password: _, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
  
    next();
  } catch (error) {
    return next({ status: HTTP_UNAUTHORIZED_STATUS, err: error.message });
  }
};
