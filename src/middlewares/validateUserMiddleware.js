const status = require('../statuscode/status');
const UsersModel = require('../models/userModels');

// validar os campos obrigatorio
const validateall = (req, res, next) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    return res.status(status.BAD_REQUEST).json({ message: status.INVALID_ENTRIES });
  }
  next();
};

// validar o email corretamente
const validateEmail = async (req, res, next) => {
  // https://regexr.com/3e48o
  const { email } = req.body;

  const emailRegex = () => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);

  const getByEmail = await UsersModel.getByEmail(email);

  if (!emailRegex()) {
    return res.status(status.BAD_REQUEST).json({ message: status.INVALID_ENTRIES });
  }

  if (getByEmail) {
    return res.status(status.CONFLICT).json({ message: 'Email already registered' });
  }

  next();
};

module.exports = {
  validateall,
  validateEmail,
};