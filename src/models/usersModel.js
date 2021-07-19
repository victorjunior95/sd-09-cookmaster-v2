const connection = require('./connection');

const createUser = async (email, name, password) => {
  const newUser = await connection()
    .then((db) => db.collection('users')
    .insertOne({ email, name, password, role: 'user' }));
    // .then((result) => result.ops[0])

    return newUser.ops[0];
};

const uniqueEmail = async (email) => {
  const user = await connection()
  .then((db) => db.collection('users')
  .findOne({ email }));

  return user;
};

const loginUsers = async (email, password) => {
  const userLogin = await connection()
  .then((db) => db.collection('users')
  .findOne({ email, password }));

  return userLogin;
};

module.exports = {
  createUser,
  uniqueEmail,
  loginUsers,
};

// fonte de consulta: aula do Mariotto sobre Joi