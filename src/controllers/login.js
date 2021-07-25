const jwt = require('jsonwebtoken');
const Login = require('../services/login');

const secret = 'sd-09-cookmaster-v2';

module.exports = async (req, res, next) => {
  try {
    const loginUser = await Login(req.body);

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ payload: loginUser }, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
};
