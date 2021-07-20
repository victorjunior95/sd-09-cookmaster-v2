const jwt = require('jsonwebtoken');
const services = require('../services/users');
const loginServices = require('../services/login');

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

const secret = 'secret';
const CREATED = '201';

const createUser = async (req, res) => {
  const { name, password, email } = req.body;
    const user = await services.createUser(name, email, password);
    if (user.err) {
      return res.status(user.err.error).send({ message: user.err.message });
    }
      return res.status(CREATED).json({ user });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({ message: 'All fields must be filled' });
    }
    const user = await loginServices(email, password);
    if (!user.err) {
      const token = jwt.sign({ data: user.email }, secret, jwtConfig);
      return res.status(200).json({ token });
    }
    return res.status(401).send(user.err);
};

module.exports = {
  createUser,
  login,
};