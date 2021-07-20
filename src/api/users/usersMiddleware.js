const Joi = require('joi');

const validateUser = async (req, _res, next) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(req.body);
  if (error) return next({ error: 'invalidEntries' });
  next();
};

module.exports = { validateUser };
