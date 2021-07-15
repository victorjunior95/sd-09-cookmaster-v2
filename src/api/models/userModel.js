const connect = require('./connection');

const addUser = async(name, email, password) =>
  connect().then(async(db) => {
    const result = await db.collection('users')
      .insertOne({name, email, password, role: 'user'});
    return result.ops[0];
  });

const getAll = async() =>
  connect().then(async(db) => await db.collection('users').find().toArray());

const findEmail = async(email) =>
  connect().then(async(db) => {
    const result = await db.collection('users').findOne({email});
    // console.log(result);
    return result;
  });

module.exports = {addUser, getAll, findEmail};
