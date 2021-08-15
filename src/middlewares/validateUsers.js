const Joi = require('@hapi/joi');

const validObjectCreateUsers = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .required(),
  password: Joi.string().required(),
});

const validObjectLoginUser = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .required(),
  password: Joi.string().required(),
});

const validateCreate = (name, email, password) => {
  const { error } = validObjectCreateUsers.validate({
    name,
    email,
    password,
  });

  if (error) {
    return {
          status: 400,
          error: {
            message: 'Invalid entries. Try again.',
          },
        };
  } 
};

const validateLogin = (email, password) => {
  const { error } = validObjectLoginUser.validate({
    email,
    password,
  });

  if (error) {
    return {
      status: 401,
      error: {
        message: 'All fields must be filled',
      },
    };
  }
};

module.exports = {
  validateCreate,
  validateLogin,
};