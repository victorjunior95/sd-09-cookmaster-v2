const setLogin = require('../../services/login/login');
const { STATUS_OK } = require('../../services/utils/constants');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const response = await setLogin(email, password);

  if (response.error) return next(response);

  res.status(STATUS_OK).json({ token: response.message });
};

module.exports = login;
