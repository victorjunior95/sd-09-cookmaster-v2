const connection = require('./connection');

// busca um usuario no db usando o email
const getUserByEmail = async (email) => {
  const result = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  return result;
};

// insere um novo usuario no db
const insertUser = async (userInfo) => {
  const result = await connection()
    .then((db) => db.collection('users').insertOne({ ...userInfo, role: 'user' }));
  return result;
};

// verifica se o usuario ja existe, e caso não exista, chama a funcão de adicionar o mesmo
const postNewUser = async (userInfo) => {
  const user = await getUserByEmail(userInfo.email);

  if (user) return user;

  const result = await insertUser(userInfo);

  // retorna com o id do usuário cadastrado
  return { insertedId: result.insertedId };
};

module.exports = {
  postNewUser,
  getUserByEmail,
};
