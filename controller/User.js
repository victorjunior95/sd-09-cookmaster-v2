const User = require('../service/User');

const validateBodyReq = (name, password, email) => {
  let invalid = false;
  // https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
  const emailRegex = /\S+@\S+\.\S+/;
  const validateEmail = emailRegex.test(email);
  if (!name || !password || !email) invalid = true;
  if (!validateEmail) invalid = true;
  return invalid;
};

const create = async (req, res) => {
  const { name, password, email } = req.body;
  const invalid = validateBodyReq(name, password, email);
  if (invalid) return res.status(400).json({ message: 'Invalid entries. Try again.' });
  const newUser = await User.create(name, password, email);
  if (newUser.message) return res.status(409).json(newUser);
  return res.status(201).json(newUser);
};

module.exports = { create };