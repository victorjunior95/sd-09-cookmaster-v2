// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUser = async (name, email) => connection()
  .then((db) => db.collection('users').insertOne({ user: { name, email, role: 'user' } }))
  .then((result) => result.ops[0]);

const findByEmail = async (email) => connection()
  .then((db) => db.collection('users').findOne({ 'user.email': email }));

const findUserInfo = (email, password) => connection()
  .then((db) => db.collection('users').findOne(
    { 'user.email': email },
    { 'user.password': password },
  ));

module.exports = {
  createUser,
  findByEmail,
  findUserInfo,
};
