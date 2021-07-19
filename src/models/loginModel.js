const connection = require('./connections');

const findUser = (email, password) => (connection()
    .then((db) => db.collection('users').findOne({ email, password })));

module.exports = { findUser };
