const jwt = require('jsonwebtoken');
const UserModel = require('../models/UsersModel');

const SECRET = 'meutokensupersecreto';
const jwtConfig = {
  expiresIn: '3h',
  algorithm: 'HS256',
};

const createUser = async (name, email, password, role) => {
  const { insertedId } = await UserModel.createUser(name, email, password, role);
  return {
    user: {
      name,
      email,
      role,
      _id: insertedId,
    },
  };
};

const findUser = async (email) => {
  const user = await UserModel.findUserByEmail(email);

  const { password: _, ...userWithoutPassword } = user;

  const token = jwt.sign(userWithoutPassword, SECRET, jwtConfig);
  return { token };
};

module.exports = {
  createUser,
  findUser,
};