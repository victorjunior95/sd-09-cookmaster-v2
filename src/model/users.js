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
    console.log({ email, password });
    const userFound = await usersDb.find({ email, password }).count() > 0;
    console.log(userFound);
    return userFound;
  } catch (err) {
    console.log('Erro na operação de login');
    console.log(err);
  }
};

module.exports = { registerUser, userLogin };