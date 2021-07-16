const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collectionUsers = 'users';

const create = async (name, email, password) => {
  const newUser = await connection().then((db) =>
    db.collection(collectionUsers).insertOne({ name, email, password, role: 'user' }));
  return newUser.ops[0];
};

const findEmail = async (email) => {
  const emailUser = await connection().then((db) =>
    db.collection(collectionUsers).findOne({ email }));
  if (!emailUser) return false;
  return true;
};
module.exports = {
  create,
  findEmail,
};