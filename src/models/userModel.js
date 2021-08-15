const getConnection = require('./connection');

async function create({ name, email, password, role }) {
    const userCollection = await getConnection('users');
    userCollection.insertOne({
        name, email, password, role,
    });
}

module.exports = {
    create,
};