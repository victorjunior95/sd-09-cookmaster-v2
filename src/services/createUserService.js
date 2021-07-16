const Joi = require('joi');
const jwt = require('jsonwebtoken');
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
});

const loginSchema = Joi.object({
  email: Joi.string()
      .email()
      .required(),

  password: Joi.required(),
});

const createUserService = async ({ name, email, password, role }) => {
  const exixtEmail = await findByemail(email);
  if (exixtEmail) return joiError({ message: 'Email already registered', status: 409 });
  
  const { value, error } = createUserSchema.validate({ name, email, password, role });
  if (error) return joiError({ message: 'Invalid entries. Try again.', status: 400 });
  const userCreated = await createUserModel(value);

  return userCreated;
};

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const createToken = (payload, secret) => {
 const token = jwt.sign(payload, secret, jwtConfig);
 return token;
};

const validLoginService = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) return joiError({ message: 'All fields must be filled', status: 401 });
  
  const user = await findByemail(email);
  if (!user || user.password !== password) {
 (
    joiError({
      message: 'Incorrect username or password',
      status: 401,
    })); 
}

  // if(user.password !== password) 
  const token = createToken({ email, password }, 'testeJWT');
  console.log(token);
  return token;
};

module.exports = {
    createUserService,
    validLoginService,
};