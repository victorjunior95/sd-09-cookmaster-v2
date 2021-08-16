const connection = require('../connection');

module.exports = async () => {
  const result = await connection()
    .then((db) => db.collection('recipes').find().toArray());

  return result;
};
