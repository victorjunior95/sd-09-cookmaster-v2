// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findEmail = async (search) => {
  const result = await connection()
    .then((db) => db.collection('users')
      .findOne({ email: search }));

  return result;
};

const insertUser = async (email, name, password) => {
  const result = await connection()
    .then((db) => db.collection('users')
      .insertOne({ email, name, password, role: 'user' }))
    .then((res) => res.ops[0]);
  
  return result;
};

module.exports = {
  findEmail,
  insertUser,
};