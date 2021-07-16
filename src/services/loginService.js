const {
  getByEmail,
} = require('../models/loginModel');

const errlogin = { message: 'All fields must be filled' };
const emailneed = { message: 'Incorrect username or password' };
const cdi = 401;

const validatefilds = (req, res, next) => {
  if (!req.body.email) { return res.status(cdi).json(errlogin); }
  if (!req.body.password) { return res.status(cdi).json(errlogin); }
  next();
};

const checkUser = async (req, res, next) => {
  const usr = await getByEmail(req.body.email);
  if (!usr || req.body.password !== usr.password) { return res.status(cdi).json(emailneed); }
  next();
};

module.exports = {
  checkUser,
  validatefilds,
};
