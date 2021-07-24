const { MongoClient } = require('mongodb');
require('dotenv').config();

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const { MONGO_DB_URL_ENV } = process.env;

const MONGO_DB_URL = MONGO_DB_URL_ENV || 'mongodb://mongodb:27017/Cookmaster';

let db = null;

const connection = () => (
    db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
    db = conn.db('Cookmaster');
    return db;
    })
);

module.exports = connection;
