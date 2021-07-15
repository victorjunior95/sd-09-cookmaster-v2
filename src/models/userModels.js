const connect = require('../configdatabase/conn');

const addUser = async (name, email, password) => {
  const database = connect()
  .then((db) => db.collection('users').insertOne({
    name, email, password, role: 'user' }))
  .then((result) => result.ops[0]);

 return database;
};

module.exports = {
  addUser,
};
