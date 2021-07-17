const connection = require('./connection');

const create = async (user) => {
    const { name, email, password, role } = user;
    const newUser = await connection()
      .then((db) => db.collection('users').insertOne({ name, email, password, role }))
      .then((result) => result.ops[0]);
  
    const { _id } = newUser;
    
    return {
      user: {
        name,
        email,
        role,
        _id,
      },
    };
};

const getByEmail = (email) => connection()
    .then((db) => db.collection('users').findOne({ email }));

module.exports = {
  create,
  getByEmail,
};