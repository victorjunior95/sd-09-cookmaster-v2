const { MongoClient } = require('mongodb');
require('dotenv/config');

const MONGO_DB_URL = process.env.MONGO_DB_URL 
? process.env.MONGO_DB_URL : 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

async function connection() {
  return MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      const schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connection;