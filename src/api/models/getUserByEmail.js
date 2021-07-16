const connection = require('./connectionMongoDb');

module.exports = async (userEmail) => {
  const result = await connection()
    .then((db) => db.collection('users')
    .findOne({ email: userEmail }));

  return result;
};
