const connection = require('./connection');

const createUser = async (name, email, password, role = 'user') => {
  const result = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }));
    // .then((result) => result.ops[0]);

  return {
    _id: result.insertedId,
    name,
    email,
    role,
  };
};

const findUserByEmail = async (email) => connection()
    .then((db) => db.collection('users').findOne({ email }));

const findUser = async (email, password) => connection()
    .then((db) => db.collection('users').findOne({ email, password }));

module.exports = {
  createUser,
  findUserByEmail,
  findUser,
};
