const { ObjectID } = require('mongodb');
const connection = require('./connections');

const findEmail = (searchEmail) => (connection()
    .then((db) => db.collection('users').findOne({ email: searchEmail })));

const createUser = async (user) => {
  const userData = { ...user, role: 'user' };
  const { password: _, ...result } = userData;

  const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne(userData));

  return { ...result, _id: insertedId };
};

const createUserAdmin = async (user) => {
  await connection()
    .then((db) => db.collection('users').insertOne(user));
};

const getById = (id) => {
  if (!ObjectID.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('users').findOne({ _id: ObjectID(id) }));
};

module.exports = {
  createUser,
  findEmail,
  createUserAdmin,
  getById,
};
