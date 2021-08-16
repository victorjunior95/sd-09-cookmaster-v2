const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DBServer = new MongoMemoryServer();
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

const uriConnection = async () => {
  return await DBServer.getUri()
    .then((setURI) => MongoClient.connect(setURI, OPTIONS));
};

module.exports = uriConnection; 