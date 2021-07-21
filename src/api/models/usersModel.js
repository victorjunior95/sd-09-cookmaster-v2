const connection = require('./connection');

const getUserByEmail = async (email) => {
  const db = await connection();
  let userFound = null;
  userFound = await db.collection('users').findOne({ email });
  return userFound;
};

const registerUser = async (newUser) => {
  const db = await connection();
  const register = await db.collection('users').insertOne(newUser);
  // o insertProduct.ops retorna um array que na posiçao zero tem a minha inserção
  return register.ops[0];
};

module.exports = {
  getUserByEmail,
  registerUser,
};
