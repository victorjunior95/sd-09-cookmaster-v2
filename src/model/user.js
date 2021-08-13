const connection = require('../connections/connection');

const addUserRegistration = async (user, role) => {
  const newUser = await connection()
  .then((db) => db.collection('users').insertOne(user));
  return {
    name: newUser.ops[0].name,
    email: newUser.ops[0].email,
    role,
    _id: newUser.insertedId,
  };
};
const searchEmail = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }));

module.exports = { addUserRegistration, searchEmail };