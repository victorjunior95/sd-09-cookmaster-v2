const connection = require('./connection');

const createUser = async (name, email, password) => {
  const db = await connection();
  const result = await db.collection('users')
    .insertOne({ name, email, password, role: 'user' });
  return result.ops[0];
};

const findByEmail = async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email });
  return result;
};

module.exports = {
  createUser,
  findByEmail,
};
