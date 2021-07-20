const jwt = require('jsonwebtoken');
const Joi = require('joi');

const jwtSecret = require('../jwtSecret');

const validateAuth = async (req, _res, next) => {
  const { authorization } = req.headers;
  console.log('authorization', authorization);

  if (!authorization) return next({ error: 'missingToken' });

  try {
    const { _id: userId } = jwt.verify(authorization, jwtSecret);
    req.userId = userId;
    next();
  } catch (error) {
    return next({ error: 'invalidToken' });
  }
};

const validateRecipe = async (req, _res, next) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate(req.body);
  if (error) return next({ error: 'invalidEntries' });
  next();
};

module.exports = {
  validateAuth,
  validateRecipe,
};
