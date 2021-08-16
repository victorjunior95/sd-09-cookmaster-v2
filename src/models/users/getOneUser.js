const connection = require('../connection');

module.exports = async (email) => {
  const result = await connection()
    .then((db) => db.collection('users').findOne({ email }));

  return result;
};
