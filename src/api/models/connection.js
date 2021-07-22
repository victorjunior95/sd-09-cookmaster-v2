const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// conexao local
const MONGO_DB_URL = 'mongodb://localhost:27017/'