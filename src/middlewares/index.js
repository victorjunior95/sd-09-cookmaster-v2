const { ObjectId } = require('mongodb');
const Joi = require('joi');
const { findEmail } = require('../models/Users');
const Bad_Request = '400';
const Unauthorized = '401';
const Conflict = '409';

const checkUserData = (validateData) => {
  return (req, res, next) => {
    const { error } = validateData.userSchemas.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      let message = details.map((i) => i.message).join(',');
      if (message.match(/email/)) message = 'Invalid entries. Try again.';
      res.status(Bad_Request).json({ message: message });
    }
  };
};

const checkUniqueEmail = async (req, res, next) => {
  const { email } = req.body;
  let check = await findEmail(email);
  if (check)
    return res.status(Conflict).json({ message: 'Email already registered' });
  next();
};

const checkRecipesData = (validateData) => {
  return (req, res, next) => {
    const { error } = validateData.recipesSchemas.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      let message = details.map((i) => i.message).join(',');
      res.status(Bad_Request).json({ message: message });
    }
  };
};

const checkLoginData = (validateData) => {
  return (req, res, next) => {
    const { error } = validateData.loginSchemas.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      let message = details.map((i) => i.message).join(',');
      if (message.match(/email/)) message = 'Incorrect username or password';
      res.status(Unauthorized).json({ message: message });
    }
  };
};

module.exports = {
  checkUserData,
  checkUniqueEmail,
  checkLoginData,
  checkRecipesData
};