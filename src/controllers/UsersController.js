const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');

const list = async (_req, res, next) => {
  try {
    const users = await UserService.listAllUsers();

    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await UserService.registerUser(user);
    return res.status(201).json(newUser);
  } catch (err) {
    return next(err);
  }
};

const secret = 'meuSegredoSuperSegreto';
const jwtParams = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const login = async (req, res, next) => {
  try {
    const user = req.body;
    const userLogin = await UserService.loginUser(user);
    const { _id, role, email } = userLogin;
    const payload = {
      id: _id,
      email,
      role,
    };
  
    const token = jwt.sign(payload, secret, jwtParams);
    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  list,
  register,
  login,
};
