const connection = require('./connection');

const usersCollection = 'users';
const userRole = 'user';

const checkForUserEmail = async ({ email }) => {
  const data = await connection().then((db) =>
    db.collection(usersCollection).findOne({ email }));

  return data;
};

const createUser = async ({ name, email, password }) => {
  const data = await connection().then((db) =>
    db.collection(usersCollection).insertOne({
      name,
      email,
      password,
      role: userRole,
    }));
  return data.ops[0];
};

const findUser = async ({ email }) => {
  const data = await connection().then((db) => db.collection(usersCollection).findOne({ email }));
  return data;
};

module.exports = { createUser, checkForUserEmail, findUser };