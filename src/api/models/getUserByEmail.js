const connection = require('./connectionMongoDb');

const getUserByEmail = async (Useremail) => {
  const result = await connection()
    .then((db) => db.collection('users')
    .findOne({ email: Useremail }));

  return result;
};

module.exports = getUserByEmail;
