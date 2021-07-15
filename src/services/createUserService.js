const Joi = require('joi');
const {
  createUserModel,
  findByemail,
} = require('../models/createUserModel');

const joiError = ({ status, message }) => {
    const errJoi = Error(message);
    errJoi.status = status;
    throw errJoi;
};

const createUserSchema = Joi.object({
    name: Joi.string()
      .required(),
    
    email: Joi.string()
      .email()
      .required(),

    password: Joi.required(),

    role: Joi.string()
    .default('user'),
}).error(() => joiError({ message: 'Invalid entries. Try again.', status: 400 }));

const createUserService = async ({ name, email, password, role }) => {
  const exixtEmail = await findByemail(email);
  if (exixtEmail) joiError({ message: 'Email already registered', status: 409 });
  
  const { value } = createUserSchema.validate({ name, email, password, role });
    const userCreated = await createUserModel(value);

    return userCreated;
};

module.exports = {
    createUserService,
};