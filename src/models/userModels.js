// requisito 1
const connection = require('./connection');
// query com o mongo para inserir os campos, um de cada vez
const registerUser = async (name, email, password) => {
  const { insertedId: _id } = await connection().then((db) => 
    db.collection('users').insertOne({ name, email, password, role: 'user' }));
  return { name, email, password, role: 'user', _id };
};
// query com o mongo para inserir um email
const findUserByEmail = async (email) => {
  const emailFound = await connection().then((db) =>
    db.collection('users').findOne({ email }));
  return emailFound;
};

module.exports = {
  registerUser,
  findUserByEmail,
};
