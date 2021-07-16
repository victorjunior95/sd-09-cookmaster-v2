const Joi = require('joi');
const usersModel = require('../models/usersModel');

const minString = 1;

const schema = Joi.object({
  name: Joi.string()
    .min(minString)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .min(1)
    .required(),
  role: Joi.string(),
});

const validateUser = async (body) => {
  const { name, email, password } = body;
  const userWithRole = {
    name,
    email,
    password,
    role: 'user',
  };

  try {
    const userValidated = await schema.validate(userWithRole);
    const duplicateEmail = await usersModel.getByEmail(email);

    if (duplicateEmail) return { message: 'Email already registered' };

    return usersModel.createUser(userValidated);
  } catch (err) {
    console.error(err);
    return err;
  }
};

const createAdmin = async (body) => {
  const { name, email, password } = body;

  const newUser = {
    name,
    email,
    password,
    role: 'admin',
  };
  
  const created = await usersModel.createUser(newUser);
  const id = '_id';

  return {
    user: {
      _id: created[id],
      name: created.name,
      email: created.email,
      password: created.password,
      role: created.role,
    },
  };
};

module.exports = {
  validateUser,
  createAdmin,
};
