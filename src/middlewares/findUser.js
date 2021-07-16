const userModel = require('../models/userModels');
const errors = require('../utils/errors');

const findUser = async (req, res, next) => {
  const { email } = req.body;
  const request = await userModel.findUserByEmail(email);
  console.log(request);
  if (request) res.status(errors.emailExistErr.status).json(errors.emailExistErr.response);

  next();
};

module.exports = findUser;