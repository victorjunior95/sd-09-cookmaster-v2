require('dotenv/config');
const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { MONGOLOCAL_DB_URL } = process.env;
const MONGOCONNECTION = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const connection = () => MongoClient.connect(MONGOLOCAL_DB_URL || MONGOCONNECTION, OPTIONS)
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => { console.log(err); process.exit(); });

module.exports = connection; 
