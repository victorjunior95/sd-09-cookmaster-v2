const Joi = require('joi');
const usersModel = require('../models/usersModel');

const HTTP_BADREQ_STATUS = 400;
const HTTP_CONFLIT_STATUS = 409;
const HTTP_CREATED_STATUS = 201;

const schemaCreate = Joi.object({
  name: Joi.string()
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required(),
});

const create = async ({ name, email, password }) => {
  const validationCreate = schemaCreate.validate({ name, email, password });
  if (validationCreate.error) {
    return {
      status: HTTP_BADREQ_STATUS, err: 'Invalid entries. Try again.',
  };
}
  const existsUser = await usersModel.findEmail(email);
  if (existsUser) {
    return {
      status: HTTP_CONFLIT_STATUS, err: 'Email already registered',
    };
  }
  const user = await usersModel.create(name, email, password);
  const { password: passDB, ...userWithoutPassword } = user;
  return {
    status: HTTP_CREATED_STATUS, user: userWithoutPassword,
  };
};
module.exports = { 
  create,
};