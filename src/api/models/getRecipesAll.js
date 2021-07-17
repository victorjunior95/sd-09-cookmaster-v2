const connection = require('./connectionMongoDb');

module.exports = () => connection()
  .then((db) => db.collection('recipes')
  .find({}).toArray());
