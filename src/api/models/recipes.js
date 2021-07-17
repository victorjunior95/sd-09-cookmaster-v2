const { ObjectID } = require('mongodb');
const connection = require('./connection');

const create = ({ name, ingredients, preparation }, userId) => connection().then((db) =>
  db.collection('recipes').insertOne({ name, ingredients, preparation, userId })
  .then(({ ops }) => ops[0]));

const getAll = () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getById = (id) => connection()
  .then((db) => db.collection('recipes').findOne(ObjectID(id)));

module.exports = { create, getAll, getById };
