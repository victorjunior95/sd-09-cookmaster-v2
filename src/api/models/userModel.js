const connection = require('./connection');

const create = async (name, email, password, role) => {
  const userCreated = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }));

  return userCreated.ops[0];
};

const findEmail = async (email) => {
  const userEmail = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  
  return userEmail;
};

const login = async (email, password) => {
  const logon = await connection()
    .then((db) => db.collection('users').findOne({ email, password }));

  return logon;
};

module.exports = {
  create,
  findEmail,
  login,
};
