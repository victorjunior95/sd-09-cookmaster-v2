const jwt = require('jsonwebtoken');

const UserModel = require('../../models/users');

const secret = 'Fenix Iorp';
const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const SUCCESS_CODE = 200;
const UNAUTHORIZED_CODE = 401;
const ALL_FIELDS_MESSAGE = 'All fields must be filled';
const INCORRECT_MESSAGE = 'Incorrect username or password';

module.exports = async (req, res, _next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(UNAUTHORIZED_CODE).json({ message: ALL_FIELDS_MESSAGE });
  }

  const user = await UserModel.getOneUser(email);

  if (!user || user.password !== password) {
    return res.status(UNAUTHORIZED_CODE).json({ message: INCORRECT_MESSAGE });
  }

  const token = jwt.sign({ data: user }, secret, jwtConfig);

  res.status(SUCCESS_CODE).json({ token });
};
