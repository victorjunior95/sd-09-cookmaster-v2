const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
const DBServer = new MongoMemoryServer();

const connection = () => DBServer.getUri().then((mock) => MongoClient.connect(mock, OPTIONS));

module.exports = connection;