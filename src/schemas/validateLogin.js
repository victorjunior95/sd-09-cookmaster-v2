const Joi = require('joi');

const { getByEmail } = require('../models/usersModels');

const {
  code: { UNAUTHORIZED },
  message: {
    INCORRECT_USER_PASSWORD,
    ALL_FIELDS_MUST_BY,
  },
} = require('../utils');

const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).messages({
  'any.required': ALL_FIELDS_MUST_BY,
  'string.empty': ALL_FIELDS_MUST_BY,
});

const authLogin = async ({ email, password }) => {
  const user = await getByEmail({ email });

  if (!user || user.password !== password) return false;

  return user;
};

const validateLogin = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(UNAUTHORIZED).json({ message: error.message });

  const autorizatedUser = await authLogin(req.body);

  if (!autorizatedUser) {
    return res.status(UNAUTHORIZED).json({ message: INCORRECT_USER_PASSWORD });
  }

  const { password: _, ...userWithoutPassword } = autorizatedUser;
  req.user = userWithoutPassword;

  next();
};

module.exports = validateLogin;
