const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const server = require('../api/app');
const { getConnection } = require('./connectionTests');


const { MongoClient } = require('mongodb');

chai.use(chaiHttp);

const { expect } = chai;
