const Joi = require('joi');

const { getAllUsers, getByEmail } = require('../models/usersModels')

const FIELDS_MESSAGE_ERROR = 'All fields must be filled';
const INCORRECT_INPUT_MESSAGE_ERROR = 'Incorrect username or password';
const UNAUTHORIZED = 401;

const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).messages({
  'any.required': FIELDS_MESSAGE_ERROR,
  'string.empty': FIELDS_MESSAGE_ERROR,
});

const authLogin = async ({ email, password }) => {
  const user = await getByEmail({ email });

  if (!user || user.password !== password)
    return false;

  return user;
};

const validateLogin = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(UNAUTHORIZED).json({ message: error.message });

  const autorizatedUser = await authLogin(req.body);

  if (!autorizatedUser) return res.status(UNAUTHORIZED).json({ message: INCORRECT_INPUT_MESSAGE_ERROR });

  const { password: _, ...userWithoutPassword } = autorizatedUser;
  req.user = userWithoutPassword;

  next();
};

module.exports = validateLogin;
