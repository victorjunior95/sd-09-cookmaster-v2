const connection = require('./connection');

const getAll = async () => connection().then((db) => db.collection('users').find().toArray());

const create = async (name, email, password) => connection()
.then((db) => db.collection('users').insertOne({
        name, email, password, role: 'user',
    }));

const getUserByEmail = async (email) => {
    const getEmail = await connection().then((db) => db.collection('users').findOne({ email }));
    if (!getEmail) return null;
    return getEmail;
};

module.exports = {
    getAll,
    create,
    getUserByEmail,
};