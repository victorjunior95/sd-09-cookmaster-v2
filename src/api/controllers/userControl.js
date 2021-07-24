const jwt = require('jsonwebtoken');
const login = require('../services/login');

const {
  createUserService,
} = require('../services/userService');

const secret = 'karla';
const CREATED = '201';

const createUserControl = async (req, res) => {
  const { name, password, email } = req.body;

  const { id } = await createUserService({ name, email, password, role: 'user' });

  return res.status(CREATED).json({ user: { _id: id, name, email, role: 'user' } });
};

const loginControl = async (req, res) => {
  const { email, password } = req.body;
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const { _id, role } = await login({ email, password });
  const token = jwt.sign({ data: { id: _id, email, role } }, secret, jwtConfig);
  return res
    .status(200).json({ token });
};

module.exports = {
  createUserControl,
  loginControl,
};