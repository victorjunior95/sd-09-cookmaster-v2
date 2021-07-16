// const { ObjectId } = require('mongodb');
// const Joi = require('joi');
// const { string } = require('joi');
const { findEmail } = require('../models/Users');
const { validateToken } = require('../services/tokenValidate');

const msgMissingToken = 'missing auth token';
const msgJWTMalformed = 'jwt malformed';

const BadRequest = '400';
const Unauthorized = '401';
const Conflict = '409';

const checkUserData = (validateData) => (req, res, next) => {
    const { error } = validateData.userSchemas.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      let message = details.map((i) => i.message).join(',');
      if (message.match(/email/)) message = 'Invalid entries. Try again.';
      res.status(BadRequest).json({ message });
    }
  };

const checkUniqueEmail = async (req, res, next) => {
  const { email } = req.body;
  const check = await findEmail(email);
  if (check) return res.status(Conflict).json({ message: 'Email already registered' });
  next();
};

const checkRecipesData = (validateData) => (req, res, next) => {
    const { error } = validateData.recipesSchemas.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
      res.status(BadRequest).json({ message });
    }
  };

const checkLoginData = (validateData) => (req, res, next) => {
    const { error } = validateData.loginSchemas.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      let message = details.map((i) => i.message).join(',');
      if (message.match(/email/)) message = 'Incorrect username or password';
      res.status(Unauthorized).json({ message });
    }
};
  
const checkToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) res.status(Unauthorized).json({ message: msgMissingToken }); 
  if (!validateToken(token)) {
    res.status(Unauthorized).json({ message: msgJWTMalformed });
  }
  next();
};

module.exports = {
  checkUserData,
  checkUniqueEmail,
  checkLoginData,
  checkRecipesData,
  checkToken,
};