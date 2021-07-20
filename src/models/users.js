// const { ObjectId } = require('mongodb');
const connection = require('../config/connection');

const create = async (name, email, password, role) => { 
  const newUser = await connection()
  .then((db) => 
    db.collection('users')
      .insertOne({ name, email, password, role }));
return { name, email, role, _id: newUser.insertedId };
};

const findByEmail = async (email) => {
  const findEmail = await connection()
  .then((db) => 
    db.collection('users')
      .findOne(email));
  if (!findEmail) {
    return false;
  }
  return true;
};

const getUser = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }));

module.exports = {
  create,
  findByEmail,
  getUser,
};