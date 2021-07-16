const jwt = require('jsonwebtoken');
const userModel = require('../models/userModels');
const errors = require('../utils/errors');

const SECRET = 'cookMaster';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return { response: { message: 'missing token' }, status: 401 };
  }

  try {
    const payload = jwt.verify(token, SECRET);

    const user = await userModel.findUserByEmail(payload.email);

    if (!user) return { message: errors.userNotFoundErr, status: 401 };

    const { password: _, ...setUser } = user;
    
    req.user = setUser;

    next();
  } catch (err) {
    res.status(401).json(err);
  }
};

module.exports = {
  validateToken,
};
