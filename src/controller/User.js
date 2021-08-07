const jwt = require('jsonwebtoken');
const User = require('../service/User');

const secret = 'supersegredotrybe';

const validateBodyReq = (name, password, email) => {
  let invalid = false;
  // https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
  const emailRegex = /\S+@\S+\.\S+/;
  const validateEmail = emailRegex.test(email);
  if (!name || !password || !email) invalid = true;
  if (!validateEmail) invalid = true;
  return invalid;
};

const ping = (_req, res) => {
  res.status(200).json({ ping: 'pong' });
};

const getAll = async (_req, res) => {
  const users = await User.getAll();
  return res.status(200).json(users);
};

const model = (_req, res) => {
  const response = User.model();
  res.status(200).json(response);
};

const validateLoginBody = (email, password) => {
  if (!email || !password) return { message: 'All fields must be filled' };
  const emailRegex = /\S+@\S+\.\S+/;
  const validateEmail = emailRegex.test(email);
  if (!validateEmail) return { message: 'Incorrect username or password' };
  return null;
};

const create = async (req, res) => {
  const { name, password, email } = req.body;
  const invalid = validateBodyReq(name, password, email);
  if (invalid) return res.status(400).json({ message: 'Invalid entries. Try again.' });
  const newUser = await User.create(name, password, email);
  if (newUser.message) return res.status(409).json(newUser);
  return res.status(201).json(newUser);
};

const createAdmin = async (req, res) => {
  const { name, password, email } = req.body;
  const { user } = req;
  const newAdmin = await User.createAdmin(user, name, password, email);
  if (newAdmin.message) return res.status(403).json(newAdmin);
  return res.status(201).json(newAdmin);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const invalid = validateLoginBody(email, password);
  if (invalid) return res.status(401).json(invalid);
  const makeLogin = await User.login(email, password);
  if (makeLogin.message) return res.status(401).json(makeLogin);
  const { role, _id } = makeLogin;
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { _id, email, role } }, secret, jwtConfig);
  return res.status(200).json({ token });
};

module.exports = { create, login, createAdmin, ping, getAll, model };