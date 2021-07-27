const cookmasterDb = require('./cookmasterDb');

const registerUser = async (newUser) => {
  const usersDb = await cookmasterDb().then((data) => data.collection('users'));
  try {
    const { ops } = await usersDb.insertOne(newUser);
    console.log('Registrou');
    const { name, email, role, _id } = ops[0];
    return { name, email, role, _id };
  } catch (err) {
    console.log('Erro no registro');
    console.log(err);
    return null;
  }
};

const userLogin = async (email, password) => {
  try {
    const usersDb = await cookmasterDb().then((db) => db.collection('users'));
    const userFound = await usersDb.find({ email, password }).toArray();
    return userFound[0];
  } catch (err) {
    console.log('Erro na operação de login');
    console.log(err);
  }
};

const findUserByEmail = async (email) => {
  console.log(email);
  try {
    const usersDb = await cookmasterDb().then((db) => db.collection('users'));
    const isUserFound = await usersDb.find({ email }).toArray();
    return isUserFound[0];
  } catch (err) {
    console.log(err);
  }
};

const getUserIdByEmail = module.exports = { registerUser, userLogin, findUserByEmail };