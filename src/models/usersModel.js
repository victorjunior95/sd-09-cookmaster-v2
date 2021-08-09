const connection = require('./connections');

const findByEmail = async ({ email }) => {
  const result = await connection().then((db) => db
    .collection('users').findOne({ email }));
  return result;
};

const userRegistration = async ({ name, email, password }) => {
  const newRegister = await connection().then((db) => db
    .collection('users').insertOne({ name, email, password }));

  return { user: { _id: newRegister.insertedId, name, email, role: 'user' } };
};

module.exports = {
  findByEmail,
  userRegistration,
};
