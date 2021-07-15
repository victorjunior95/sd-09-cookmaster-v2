const Joi = require('joi');

const validateNewUser = (req, res, next) => {
  const JoiValidation = Joi.string().not().empty().required();

  const { error } = Joi.object({
    email: JoiValidation,
    password: JoiValidation,
  }).validate(req.body);
  
  if (error) {
    error.details[0].code = 401;
    error.details[0].message = 'All fields must be filled';
    return next(error);
  }

  next();
};

module.exports = validateNewUser;