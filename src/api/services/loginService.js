const userModel = require('../models/userModel');
const {status, message} = require('../services/statusAndMessages');
// const env = require('../env');

const loginCheck = async(req, res, next) => {

  const {email, password} = req.body;

  if(!email || !password) {
    return res.status(status.UNAUTHENTICATED).json(message.loginEmpty);
  }
  const userFind = await userModel.findEmail(email);
  req.user = userFind;
  // console.log(userFind);
  if(!userFind) {
    return res.status(status.UNAUTHENTICATED).json(message.loginIncorrect);
  }
  const passwordCheck = (password === userFind.password);
  if(!passwordCheck) {
    return res.status(status.UNAUTHENTICATED).json(message.loginIncorrect);
  }
  return next();
};

module.exports = {loginCheck};