const connection = require('../connection/connection');

const registerUser = async (user, role) => {
  const newUser = await connection()
  .then((db) => db.collection('users').insertOne(user));
  return {
    name: newUser.ops[0].name,
    email: newUser.ops[0].email,
    role,
    _id: newUser.insertedId,
  };
};

const findEmail = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }));

module.exports = { registerUser, findEmail };