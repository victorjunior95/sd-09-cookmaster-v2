const connection = require('./connections');

const findUser = async (email, password) => {
  return await connection()
    .then((db) => db.collection('users').findOne({ email, password }));
};

module.exports = { findUser };
