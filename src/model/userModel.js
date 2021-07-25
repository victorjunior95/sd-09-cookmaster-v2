const connection = require('./connection');

const createNewUser = async (email, name, password) => {
  const user = await connection().then((db) =>
    db.collection('users')
      .insertOne({ email, name, password, role: 'user' }));
  const { password: passBD, ...userWithoutPassword } = user.ops[0];
  return userWithoutPassword;
};

const getOneUser = async (email) => {
  const users = await connection().then((db) => db.collection('users')
  .findOne({ email }));
  if (users) {
    const { password: passBD, ...userWithoutPassword } = users;
    return userWithoutPassword;
  } 
  return users;
};

const userLogin = async (email, password) => {
  const users = await connection().then((db) => db.collection('users')
  .findOne({ email, password }).then((user) => user));
  if (users) {
    const { password: passBD, ...userWithoutPassword } = users;
    return userWithoutPassword;
  } 

  return users;
};

module.exports = {
  createNewUser,
  userLogin,
  getOneUser,
};
