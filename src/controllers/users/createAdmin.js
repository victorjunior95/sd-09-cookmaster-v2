const jwt = require('jsonwebtoken');

const UserModel = require('../../models/users');

const secret = 'Fenix Iorp';

const CREATED_CODE = 201;
const FORBIDDEN_CODE = 403;
const ONLY_ADMINS_MESSAGE = 'Only admins can register new admins';

module.exports = async (req, res, _next) => {
  const token = req.headers.authorization;

  const decoded = jwt.decode(token, secret);
  if (!decoded || decoded.data.role !== 'admin') {
    return res.status(FORBIDDEN_CODE).json({ message: ONLY_ADMINS_MESSAGE });
  }

  const { name, email, password } = req.body;
  const role = 'admin';
  const response = await UserModel.createUser({ name, email, password, role });

  res.status(CREATED_CODE).json({ user: response });
};
