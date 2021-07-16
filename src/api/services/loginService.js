const Joi = require('joi');
const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

const schema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 3, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .min(1)
    .required(),
});

const secret = 'secret';

const validateLoginInfos = async (body) => {
  const { email, password } = body;
  try {
    await schema.validate({ email, password });
    const user = await userModel.getByEmail(email);
    if (!user || password !== user.password) {
      return { message: 'Incorrect username or password' };
    }

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: user }, secret, jwtConfig);
    return token;
  } catch (err) {
    console.error(err);
    return err;
  }
};

module.exports = {
  validateLoginInfos,
};
