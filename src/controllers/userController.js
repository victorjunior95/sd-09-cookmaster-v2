const jwt = require('jsonwebtoken');
const { createUserService, loginService } = require('../services/userService');

const secret = 'tokensecret';

const OK = 200;
const CREATED = 201;

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await createUserService(name, email, password);

  if (newUser.isError) return res.status(newUser.status).json({ message: newUser.message });
  res.status(CREATED).json({ 
    user: newUser,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const response = await loginService(email, password);

  if (response.isError) return res.status(response.status).json({ message: response.message });

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: response }, secret, jwtConfig);

  res.status(OK).json({ token });
};

module.exports = {
  createUser,
  login,
};