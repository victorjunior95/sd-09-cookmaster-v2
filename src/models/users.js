const connection = require('./connections');

const findByEmail = async (email) => {
  const user = await connection().then((db) =>
    db.collection('users').findOne({ email }));

  return !!user;
};

const create = async (user) => {
  const newUser = await connection().then((db) =>
    db.collection('users').insertOne({ ...user, role: 'user' }));

  return newUser.ops[0];
};

module.exports = {
  findByEmail,
  create,
};
