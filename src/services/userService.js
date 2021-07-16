const status = require('../status/httpCodes');
const userModel = require('../models/userModel');

const validName = (req, res, next) => {
  const user = req.body;
  if (user.name === '' || typeof user.name !== 'string' || !user.name) {
    return res.status(status.BAD_REQUEST).json({ message: status.BAD_REQUEST_MESSAGE });
  }
  next();
};

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const validEmail = async (req, res, next) => {
  const regexEmail = /\S+@\S+\.\S+/;
  const { email } = req.body;
  const emailExist = await userModel.findUserByEmail(email);
  if (!email || typeof email !== 'string' || !regexEmail.test(email)) {
    return res.status(status.BAD_REQUEST).json({ message: status.BAD_REQUEST_MESSAGE });
  }
  if (emailExist) {
    return res.status(status.CONFLICT).json({ message: status.CONFLICT_MESSAGE });
  }
  next();
};

const validPassword = async (req, res, next) => {
  const user = req.body;
  if (user.password === '' || typeof user.password !== 'string' || !user.password) {
    return res.status(status.BAD_REQUEST).json({ message: status.BAD_REQUEST_MESSAGE });
  }
  next();
};

module.exports = {
  validName,
  validEmail,
  validPassword,
};