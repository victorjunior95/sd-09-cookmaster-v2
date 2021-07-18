const Joi = require('joi');

const validateUser = (req, _res, next) => {
  const { name, email, password } = req.body;

  const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().regex(/^\w+@\w+\.\w+$/).required(),
    password: Joi.string().required(),
  });

  const userValidation = userSchema.validate({ name, email, password }); 

  if (userValidation.error) {
    throw Object.assign(
      new Error('Invalid entries. Try again.'),
      { code: 'badRequest' },
   );
  }

  return next();
};

module.exports = validateUser;
