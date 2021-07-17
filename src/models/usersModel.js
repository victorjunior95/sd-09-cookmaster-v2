const connection = require('./connection');

const collectionUsers = 'users';

const create = async (name, email, password) => {
  const newUser = await connection().then((db) =>
    db.collection(collectionUsers).insertOne({ name, email, password, role: 'user' }));
  return newUser.ops[0];
};

const findUser = async (email) => {
  const user = await connection().then((db) =>
  db.collection(collectionUsers).findOne({ email }));
    return user;
};
module.exports = {
  create,
  findUser,
};