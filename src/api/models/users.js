const connection = require('./connection');

const create = async (user, role = 'user') => 
  connection().then((db) => db
    .collection('users')
      .insertOne({ ...user, role })
      .then(({ ops }) => ops[0]));

module.exports = { create };