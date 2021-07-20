const Joi = require('joi');

const UserShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const validationError = (status, message) => ({ status, message });

const createUser = async (user) => {
  const { error } = UserShema.validate(user);

  if (error) {
    throw validationError(400, error.message);
  }

  if (user.email === 'xabs@gmail.com') {
    throw validationError(400, 'Este usuário já foi registrado, tente de novo');
  }

  // const newUser = await UserModel.registerUser(user);

  return user;
};

module.exports = {
  createUser,
};
