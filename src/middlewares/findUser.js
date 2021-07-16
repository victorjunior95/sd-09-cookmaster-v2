const userModel = require('../models/userModels');
const errors = require('../utils/errors');

const findUser = async (req, res, next) => {
  const { email } = req.body;
  const request = await userModel.findUserByEmail(email);

  if (request) return res.status(errors.emailExistErr.status).json(errors.emailExistErr.response);

  next();
};

const checkUser = async (req, res, next) => {
  const { email, password } = req.body;
  const request = await userModel.findUserByEmail(email);
  if (!email || !password) { 
    return res.status(errors.emptyFieldsErr.status).json(errors.emptyFieldsErr.response); 
}
  if (!request) { 
    return res.status(errors.incorrectField.status).json(errors.incorrectField.response); 
  }

  next();
};

module.exports = {
  findUser,
  checkUser,
 };