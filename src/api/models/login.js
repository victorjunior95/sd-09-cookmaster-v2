const connection = require('./connectionMongoDb');

module.exports = async (userData) => {
  const result = await connection()
    .then((db) => db.collection('users')
    .findOne(userData));

  return result;
};
