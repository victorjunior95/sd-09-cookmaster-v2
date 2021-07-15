const connection = require('./connectionMongoDb');

const createUser = async (userData) => {
  const result = await connection().then((db) => db.collection('users').insertOne(userData));

  return result.ops[0];
};

module.exports = createUser;
