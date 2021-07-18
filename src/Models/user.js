const connection = require('../api/connection');

const addUser = async (name, email, password) =>
    connection()
    .then((db) => db.collection('users').insertOne({ name, email, password }))
    .then((result) => result.ops[0]);

module.exports = {
    addUser,
};