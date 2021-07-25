const Joi = require('joi');
const Model = require('../models/UserModel');
const { INVALID_DATA, EMAIL_ALREADY_EXIST } = require('../middleware/httpStatus');

const userValidate = Joi.object({
  name: Joi.string().not().empty().required(),
  email: Joi.string().email().not().empty()
    .required(),
  password: Joi.string().not().empty().required(),
});

// const LoginSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().min(8).required(),
// });

const createUser = async ({ name, email, password, role }) => {
  const { error } = userValidate.validate({ name, email, password });
  
  if (error) {
    return { error: { 
      status: INVALID_DATA, message: 'Invalid entries. Try again.', 
    } };
  }
  
  const hasUser = await Model.findByEmail(email);
    
  if (hasUser) {
    return { error: {
      status: EMAIL_ALREADY_EXIST, 
      message: 'Email already registered', 
    } };
  }
  
  const create = await Model.create({ name, email, password, role });
  return create;
};

module.exports = {
  createUser,
};