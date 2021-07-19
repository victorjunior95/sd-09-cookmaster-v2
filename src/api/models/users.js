const connection = require('./connection');

const create = (user) => connection().then((db) =>
  db.collection('users').insertOne({ ...user, role: 'user' }).then(({ ops }) => ops[0]));

const getByEmail = (email) => connection().then((db) =>
  db.collection('users').findOne({ email }));

const createAdmin = (user) => connection().then((db) =>
  db.collection('users').insertOne({ ...user, role: 'admin' }).then(({ ops }) => ops[0]));

module.exports = { create, getByEmail, createAdmin };
