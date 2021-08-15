const Joi = require('@hapi/joi');

const validObject = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .required(),
  password: Joi.string().required(),
});

const validateCreate = (name, email, password) => {
  const { error } = validObject.validate({
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

module.exports = {
  validateCreate,
};