const connection = require('./connection');

const createUser = async (name, email, password) => connection()
  .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }))
  .then((user) => ({ user: { name, email, role: user.ops[0].role, _id: user.insertedId } }));

const createAdmin = async (name, email, password) => connection()
.then((db) => db.collection('users').insertOne({ name, email, password, role: 'admin' }))
.then((user) => ({ user: { name, email, role: user.ops[0].role, _id: user.insertedId } }));

const getAllUsers = async () => connection()
  .then((db) => db.collection('users').find().toArray())
  .then((users) => users.map(({ _id, name, email }) => ({ _id, name, email })));

const getByEmail = async ({ email }) => connection()
  .then((db) => db.collection('users').findOne({ email }))
  .then((user) => (user));

module.exports = {
  createUser,
  getAllUsers,
  getByEmail,
  createAdmin,
};
