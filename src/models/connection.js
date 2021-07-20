const { MongoClient } = require('mongodb');

const MONGO_DB_URL = process.env.MONGO_DB_URL_LOCAL || 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const connection = () => MongoClient
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.log('entrei no erro');
    console.error(err);
    process.exit(1);
  });

module.exports = connection;