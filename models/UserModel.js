const connection = require('./connection');

const create = async (name, email, password) => {
  const newUser = await connection()
  .then((db) => db.collection('users').insertOne({
    name,
    email,
    password,
    role: 'user',
  }));
  const { password: passBD, ...userWithoutPassword } = newUser.ops[0];

  return userWithoutPassword;
};

const getByEmail = async (email) => {
  const findEmail = await connection()
    .then((db) => db.collection('users').findOne({ email }));

  return findEmail;
};

module.exports = {
  create,
  getByEmail,
};