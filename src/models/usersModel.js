// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUser = async (user) => {
  const newUser = await connection()
    .then((db) => db.collection('users').insertOne({ ...user }));
  delete newUser.ops[0].password;
  return newUser.ops[0];
};

const emailCheck = async (email) => (
  connection().then((db) => db.collection('users').findOne({ email }))
);

const loginUser = async (user) => (
  connection().then((db) => db.collection('users').findOne({ ...user }))
);

module.exports = {
  createUser,
  emailCheck,
  loginUser,
};
