const connection = require('./src/api/models/connection');

const registerAdmin = (name, email, password) => connection()
  .then((db) => db.collection('users').insertOne(
    { name, email, password, role: 'admin' },
  ))
  .then((result) => result.ops[0]);

module.exports = {
  registerAdmin,
}