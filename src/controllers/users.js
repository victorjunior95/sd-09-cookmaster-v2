const jwt = require('jsonwebtoken');
const Users = require('../services/users');

const SECRET = 'XABLAU';

const create = async (req, res) => {
  const { name, email, password, role } = req.body;
  const newUser = await Users.create({ name, email, password, role });

  if (newUser.error) return (newUser);

  const { password: _, ...user } = newUser;

  res.status(201).json({ user });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const result = await Users.login({ email, password });

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  if (await result.error) return next(result);

  const token = jwt.sign({ data: result.user }, SECRET, jwtConfig);

  res.status(200).json({ token }).send(result);
};

module.exports = {
  create,
  login,
};