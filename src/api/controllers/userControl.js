const jwt = require('jsonwebtoken');
const loginUser = require('../services/login');
const {
  createUserService,
} = require('../services/userService');

const jwtConfig = {
  expiresIn: 60 * 5,
  algorithm: 'HS256',
};

const secret = 'karla';
const CREATED = '201';

const createUserControl = async (req, res) => {
  const { name, password, email } = req.body;

  const user = await createUserService(name, email, password);

  if (user.err) {
    return res.status(user.err.error).send({ message: user.err.message });
  }

  return res.status(CREATED).json({ user });
};

const loginControl = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).send({ message: 'All fields must be filled' });
  }

  const user = await loginUser(email, password);
  if (user.err) {
    return res.status(401).send(user.err);
  }

  const token = jwt.sign({ data: user.email }, secret, jwtConfig);
  return res.status(200).json({ token });
};

module.exports = {
  createUserControl,
  loginControl,
};