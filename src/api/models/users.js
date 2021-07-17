// const { ObjectID } = require('mongodb');
const connection = require('./connection');

const create = (user) => connection().then((db) =>
  db.collection('users').insertOne({ ...user, role: 'user' }).then(({ ops }) => ops[0]));

const getByEmail = (email) => connection().then((db) =>
  db.collection('users').findOne({ email }));

module.exports = { create, getByEmail };
