const connection = require('./connections');

const getUserByEmail = async (email) => connection()
    .then((db) => db.collection('users').findOne({ email }));

module.exports = {
  getUserByEmail,
};
