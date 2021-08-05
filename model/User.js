const connection = require('./connection');

const formatUser = ({ name, email, role, _id }) => ({ _id, name, email, role });

const findByEmail = async (email) => {
  const user = await connection().then((db) => db.collection('users')
  .findOne({ email }));
  if (!user) return null;
  return user;
};

const create = async (name, password, email) => {
  const db = await connection();
  const createNew = await db.collection('users').insertOne({ name, password, email, role: 'user' });
  const result = createNew.ops[0];
  return formatUser(result);
};

const createAdmin = async (name, password, email) => {
  const db = await connection();
  const createNew = await db.collection('users')
  .insertOne({ name, password, email, role: 'admin' });
  const result = createNew.ops[0];
  return formatUser(result);
};

const login = async (email, password) => {
  const user = await findByEmail(email);
  if (!user || password !== user.password) {
    return { message: 'Incorrect username or password' };
  }
  const { role, _id } = user;
  return { role, _id };
};

module.exports = { findByEmail, create, login, createAdmin };