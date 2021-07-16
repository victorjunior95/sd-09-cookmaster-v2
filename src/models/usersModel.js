const connection = require('./connection');

console.log(connection);
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

module.exports = {
  createUser,
  uniqueEmail,
};

// fonte de consulta: aula do Mariotto sobre Joi