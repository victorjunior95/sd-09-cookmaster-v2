// requisito 1
const { status, message } = require('../schema/status');
const usersModels = require('../models/userModels');

const validateUser = async (req, res, next) => {
  const { name, email, password } = req.body; // captura essas informações do corpo
  // checar o email
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailExists = await usersModels.findUserByEmail(email);
  // checar se o nome é uma string
  if (typeof name !== 'string') {
    return res.status(status.badRequest).json({ message: message.invalidEntries });
  }
  // checar se nome, email e senha existem
  if (!name || !email || !password) {
    return res.status(status.badRequest).json({ message: message.invalidEntries });
  }
  if (typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(status.badRequest).json({ message: message.invalidEntries });
  }
  if (emailExists) {
    return res.status(status.conflict).json({ message: message.emailRegisterd });
  }
  next();
};

module.exports = validateUser;