const connection = require('./connection');

const formatUser = ({ name, password, email, role, _id }) => ({ _id, name, email, password, role });

const findByEmail = async (email) => {
  const user = await connection().then((db) => db.collection('users')
  .findOne({ email }));
  if (!user) return null;
  return formatUser(user);
};

const create = async (name, password, email) => {
  const db = await connection();
  const createNew = await db.collection('users').insertOne({ name, password, email, role: 'user' });
  const result = createNew.ops[0];
  return formatUser(result);
};

module.exports = { findByEmail, create };