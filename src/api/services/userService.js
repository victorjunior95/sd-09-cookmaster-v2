const userModel = require('../models/userModel');
const {status, message} = require('../services/statusAndMessages');

const newUserCheck = async(req, res, next) => {
  const {name, password, email} = req.body;
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const emailCheck = emailRegex.test(email);

  if (!name || !password || !email || !emailCheck) {
    return res.status(status.BAD_REQUEST).json(message.invalidEntries);
  }
  const userFind = await userModel.findEmail(email);
  if(userFind) {
    return res.status(status.CONFLICT).json(message.emailAlreadyRegistered);
  }
  return next();
};

module.exports = {newUserCheck};