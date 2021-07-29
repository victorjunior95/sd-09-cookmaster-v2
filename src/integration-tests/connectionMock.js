const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DBServer = MongoMemoryServer.create();
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

const getConnection = () => DBServer.getUri()
  .then((URLMock) => MongoClient.connect(URLMock, OPTIONS));

module.exports = { getConnection };