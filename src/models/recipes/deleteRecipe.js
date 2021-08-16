const connection = require('../connection');

module.exports = async (_id) => {
  await connection().then((db) => db.collection('recipes')
    .deleteOne({ _id }));
};
