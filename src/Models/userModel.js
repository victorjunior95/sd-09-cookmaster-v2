const connection = require('../api/connection');

const addUser = async (name, email) =>
    connection()
        .then((db) => db.collection('users').insertOne({ name, email, role: 'user' }))
        .then((result) => result.ops[0]);

const findByEmail = async (email) => connection()
        .then((db) => db.collection('users').findOne({ email }));

module.exports = {
    addUser,
    findByEmail,
};