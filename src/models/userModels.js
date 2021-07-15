const connect = require('../configdatabase/conn');

const addUser = async (name, email, password) => {
  const database = connect()
  .then((db) => db.collection('users').insertOne({
    name, email, password, role: 'user' }))
  .then((result) => result.ops[0]);

 return database;
};

const getByEmail = async (email) => {
  const db = await connect();
  const getUser = await db.collection('users').findOne({ email });
  return getUser;
};

module.exports = {
  addUser,
  getByEmail,
};
