const cookmasterDb = require('./cookmasterDb');

const registerUser = async (newUser) => {
  console.log('Iniciando registro no banco de dados');
  const usersDb = await cookmasterDb().then((data) => data.collection('users'));
  console.log(usersDb);
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

module.exports = { registerUser };