const { ObjectId } = require('mongodb');
const connection = require('../connection');

module.exports = async (id) => {
  const result = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

  return result;
};
