const { ObjectID } = require('mongodb');
const connection = require('../middlewares/conn');

const findUser = async (email) => {
  const user = await connection().then((db) =>
    db.collection('users').findOne({ email }));
  return user;
};

const findUserById = async (id) => {
  const user = await connection().then((db) =>
    db.collection('users').findOne({ _id: ObjectID(id) }));
  return user;
};

const registerNewUser = async (name, email, password) => {
  const user = await connection().then((db) =>
    db.collection('users').insertOne({
      name,
      email,
      password,
      role: 'user',
    }).then((result) => result.ops[0]));
  return user;
};

module.exports = {
  registerNewUser,
  findUser,
  findUserById,
};
