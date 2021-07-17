const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => connection()
  .then((db) => db.collection('users').find().toArray())
  .then((userArray) => userArray.map(({ _id, name, email, role }) => 
    ({ user: { _id, name, email, role } })));

const create = async (name, email, password) => connection()
  .then((db) => db.collection('users')
    .insertOne({ name, email, password, role: 'user' }))
  .then((user) => ({ user: { '_id': user.insertedId, name, email, role: 'user' } }));

const findById = async (id) => connection()
  .then((db) => db.collection('users').findOne(new ObjectId(id)))
  .then((user) => (user));

const login = async (email, password) => connection()
  .then((db) => db.collection('users').findOne({ email: email, password: password }))
  .then((user) => (user));

module.exports = {
  getAll,
  create,
  findById,
  login
};
