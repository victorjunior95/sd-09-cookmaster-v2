const joi = require('joi');

const checkLoginInput = (req, res, next) => { 
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
    return next();
};

module.exports = { checkLoginInput };