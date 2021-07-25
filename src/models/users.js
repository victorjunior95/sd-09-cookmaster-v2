const connection = require('./connection');

const find = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

const create = async (name, email, password, role) => {
  const db = await connection();
  const user = await db.collection('users').insertOne({ name, email, password, role });
  const { _id } = user.ops[0];
  return _id;
};

module.exports = {
  create,
  find,
};
