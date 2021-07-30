const { ObjectID } = require('mongodb');
const connection = require('./connection');

const create = async (recipe) => 
  connection().then((db) => db
    .collection('recipes')
      .insertOne(recipe)
      .then(({ ops }) => ops[0]));

const getAll = () => 
  connection().then((db) => db
    .collection('recipes')
      .find()
        .toArray());

const getById = (id) => 
  connection().then((db) => db
    .collection('recipes')
      .findOne(ObjectID(id)));

const update = (id, recipe) => 
  connection().then((db) => db
    .collection('recipes')
      .updateOne({ _id: ObjectID(id) }, { $set: recipe }));

module.exports = { create, getAll, getById, update };