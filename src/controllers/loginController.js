const jwt = require('jsonwebtoken');
const userServices = require('../services/userServices');

const secret = 'secret';

const login = async (req, res) => {
  const { email, password } = req.body;
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const { _id, role } = await userServices.login({ email, password });
  const token = jwt.sign({ data: { id: _id, email, role } }, secret, jwtConfig);
  return res
    .status(200)
    .json({ token });
};

module.exports = {
  login,
};