const Joi = require('joi');
const jwt = require('jsonwebtoken');

const Model = require('../models/UserModel');
const { INVALID_DATA, EMAIL_ALREADY_EXIST, UNAUTHORIZED } = require('../middleware/httpStatus');

const SECRET = 'meusegredosupersecreto';

const JWT_CONF = {
  expiresIn: '50m',
  algorithm: 'HS256',
};

const userValidate = Joi.object({
  name: Joi.string().not().empty().required(),
  email: Joi.string().email().not().empty()
    .required(),
  password: Joi.string().not().empty().required(),
});

const loginValidate = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const createUser = async ({ name, email, password, role }) => {
  const { error } = userValidate.validate({ name, email, password });
  // console.log(error);
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

const login = async ({ email, password }) => {
  if (!email || !password) {
    return { error: {
        status: UNAUTHORIZED,
        message: 'All fields must be filled',
      },
    };
  }
  const { error } = loginValidate.validate({ email, password });
  const userLogin = await Model.findByEmail(email);

  if (error || !userLogin) {
    return { error: {
        status: UNAUTHORIZED,
        message: 'Incorrect username or password',
      },
    };
  }

  const token = jwt.sign({ data: userLogin }, SECRET, JWT_CONF);
  return { token }; 
};

module.exports = {
  createUser,
  login,
};