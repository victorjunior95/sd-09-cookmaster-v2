const { admin } = require('../../services/users/authUser');
const setUser = require('../../services/users/user');
const { STATUS_CREATED } = require('../../services/utils/constants');

const user = async (req, res, next) => {
  const { name, email, password } = req.body;
  const response = await setUser(name, email, password, 'user');

  if (response.error) next(response);
  else res.status(STATUS_CREATED).json({ user: response.message });
};

const adminUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const token = req.headers.authorization;
  const isAdmin = await admin(token);

  if (isAdmin.error) next(isAdmin);

  const response = await setUser(name, email, password, 'admin');

  if (response.error) next(response);
  else res.status(STATUS_CREATED).json({ user: response.message });
};

module.exports = { 
  user,
  adminUser,
};
