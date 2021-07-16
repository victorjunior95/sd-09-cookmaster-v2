const connection = require('../config/connection');

const createUser = async (name, email, password, role = 'user') => {
  const user = await connection().then((db) => db
    .collection('users')
    .insertOne({ name, email, password }));
  return { 
    user: {
      name,
      email,
      role,
      _id: user.insertedId,
    },
  };
};

const findUserByEmail = async (email) => connection().then((db) => db
    .collection('users')
    .findOne({ email }));

module.exports = {
  createUser,
  findUserByEmail,
};