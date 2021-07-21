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
  /* const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne(user)); */

  // return { ...result, _id: insertedId };
};

module.exports = {
  createUser,
  findEmail,
  createUserAdmin,
};
