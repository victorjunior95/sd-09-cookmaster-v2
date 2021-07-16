const Auth = require('../auth');
const UserModel = require('../model/userModel');
const Errors = require('../errors');

const login = async (email, password) => {
  const user = await UserModel.findByEmail(email);

  if (!user || user.password !== password) throw new Errors.InvalidCredentialsError();

  const { password: _, ...userWithoutPassword } = user;

  const token = Auth.generateToken(userWithoutPassword);

  return token;
};

module.exports = {
  login,
};