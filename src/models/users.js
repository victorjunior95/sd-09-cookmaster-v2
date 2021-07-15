const connection = require('./connection');

const checkEmail = async (email) => {
  const user = await connection()
    .then((db) => db.collection('users').findOne({ email }));

  return user;
};

const checkPassword = async (password) => {
  const user = await connection()
    .then((db) => db.collection('users').findOne({ password }));

  return user;
};

const registerUser = async ({ name, email, password }) => {
  const user = await checkEmail(email);

  if (user) return null;

  const { ops } = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }));

  return ops[0];
};

const userLogin = async ({ email, password }) => {
  const emailChecked = await checkEmail(email);
  const passChecked = await checkPassword(password);

  if (!emailChecked || !passChecked) return false;

  return emailChecked;
};

module.exports = {
  registerUser,
  userLogin,
};
