const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, email) =>
  connection().then((db) =>
    db.collection('users').insertOne({ name, email, role: 'user' }));

const findEmail = async (email) => connection()
    .then((db) => db.collection('users').findOne({ email }));
    
const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) =>
    db.collection('users').findOne(new ObjectId(id)));
};

module.exports = { create, findEmail, getById };   