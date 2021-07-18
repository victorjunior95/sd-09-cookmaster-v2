const jwt = require('jsonwebtoken');
const userModel = require('../models/userModels');
const errors = require('../utils/errors');

const SECRET = 'cookMaster';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  console.log();
  if (!token) {
   return res.status(errors.missingToken.status).json(errors.missingToken.response);
  }
  try {
    const payload = jwt.verify(token, SECRET);
    
    const user = await userModel.findUserByEmail(payload.email);
    
    if (!user) return { message: errors.incorrectField, status: 401 };

    const { password: _, ...setUser } = user;

    req.user = setUser;
    next();
  } catch (err) {
    res.status(errors.jwtErr.status).json(errors.jwtErr.response);
  }
};

module.exports = {
  validateToken,
};
