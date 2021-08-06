const JOI = require('joi');
const model = require('../model');
const { USER_SCHEMA } = require('./joiSchemas');

const validateJOISchema = (data, schema) => JOI.assert(data, schema);

const customError = (message, type) => ({ details: [{ message, type }] });

const validateEmailDuplicity = async ({ email }, collection) => {
  const validation = await model.searchEmail(email, collection);

  if (validation) throw customError('Email already registered', 'emailTaken');
};

const validateUserData = async (userObj, collection) => {
  const { role = 'user' } = userObj;
  const data = { ...userObj, role };

  validateJOISchema(data, USER_SCHEMA);
  await validateEmailDuplicity(userObj, collection);

  const { ops: [createdUser] } = await model.createItem(data, collection);

  return createdUser;
};

module.exports = {
  validateUserData,
};