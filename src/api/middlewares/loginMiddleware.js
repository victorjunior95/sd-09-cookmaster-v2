const joi = require('joi');
const { findUser } = require('../models/usersModel');

const checkLoginInput = async (req, res, next) => { 
  const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/;
  const inputIsValid = joi.object({
    email: joi.string().regex(validEmail).required(),
    password: joi.string().required(),
  }).validate(req.body);

  if (inputIsValid.error) {
    return res.status(401).json({
      message: 'All fields must be filled',
    }); 
  }
  
  const { email, password } = req.body;
  const user = await findUser({ email });

  if (!user || user.password !== password) {
    return res.status(401).send({
      message: 'Incorrect username or password',
    });
  }

  return next();
};

module.exports = { checkLoginInput };