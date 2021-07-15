// usersModel
const connection = require('./connection');

const findOneUser = async (objSearch) => {
  const user = await connection()
    .then((db) => db.collection('users').findOne(objSearch));
  return user;
};

const findAllUsers = async () => {
  const users = await connection()
    .then((db) => db.collection('users').find().toArray());
  return users;
};

const addOneUser = async (userObject) => {
  const user = await connection()
    .then((db) => db.collection('users').insertOne(userObject));
  return user.ops[0];
};

module.exports = { 
  findOneUser,
  findAllUsers,
  addOneUser,
};
