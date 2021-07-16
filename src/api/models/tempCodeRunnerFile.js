const { MongoClient } = require('mongodb');

const MONGO_DB_URL = process.env.MONGO_URL || 'mongodb';

console.log(MONGO_DB_URL);