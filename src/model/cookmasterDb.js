const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//  URL para trabalhar no local
// const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';

//  URL para o evaluator
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

let db = null;

const cookmasterDb = () => (
  db
  ? Promise.resolve(db)
  : MongoClient.connect(MONGO_DB_URL, OPTIONS)
  .then((conn) => {
    db = conn.db('Cookmaster');
    return db;
  }));

module.exports = cookmasterDb;
