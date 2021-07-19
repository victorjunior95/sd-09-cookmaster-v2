const joi = require('joi');
const { checkForUserEmail } = require('../models/usersModel');

const checkNewUserInfo = (req, res, next) => {
  const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/;
  const inputIsValid = joi.object({
    name: joi.string().required(),
    email: joi.string().regex(validEmail).required(),
    password: joi.string().required(),
  }).validate(req.body);

  if (inputIsValid.error) {
 return res.status(400).json({
    message: 'Invalid entries. Try again.',
  }); 
}
  return next();
};

const checkIfEmailExists = async (req, res, next) => {
  const { email } = req.body;
  const emailExists = await checkForUserEmail({ email });
  if (emailExists) {
    return res.status(409).send({
      message: 'Email already registered',
    }); 
  }
  
  return next();
};

module.exports = { checkNewUserInfo, checkIfEmailExists };