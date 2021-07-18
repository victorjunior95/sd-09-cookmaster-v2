const connection = require('./connection');

const getByEmail = async (email) => {
  const user = await connection()
    .then((db) => db.collection('users')
      .findOne({ email }));

  return user;
};

const create = async (name, email, password) => {
  const result = await connection()
    .then((db) => db.collection('users')
      .insertOne({ name, email, password, role: 'user' }));

  const { password: _, ...newUser } = result.ops[0];

  return newUser;
};

module.exports = {
  getByEmail,
  create,
};