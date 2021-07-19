const connection = require('./connection');

const createUser = async (name, email, password, role) => {
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

const listAllUsers = async () => {
  const result = await connection()
    .then((db) => db.collection('users').find().toArray());

  return result;
};

const findUserByEmail = async (email) => connection()
    .then((db) => db.collection('users').findOne({ email }));

const findUser = async (email, password) => connection()
    .then((db) => db.collection('users').findOne({ email, password }));

module.exports = {
  createUser,
  listAllUsers,
  findUserByEmail,
  findUser,
};
