const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
const DBServer = new MongoMemoryServer();

const getConnection = () => DBServer.getUri().then((URIMock) => MongoClient.connect(URIMock, OPTIONS));

module.exports = getConnection; 
