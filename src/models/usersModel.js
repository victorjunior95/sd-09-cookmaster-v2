const { ObjectId } = require('mongodb');
const conn = require('./conn');


const adduser = async(body)=>{
  const result = await  conn().then(async (db) =>   
    db.collection('users').insertOne( body));
  return (result.ops[0]);
};

const getbyemail = async(email)=>{
  const emailcheck = await conn().then(
    async (db) => db.collection('users').findOne({email})
  );
  console.log('usermodel13', emailcheck);
  return (emailcheck);
};

const findUserbyname = async(name)=>{
  const user = await conn().then(
    async (db) => db.collection('users').findOne({name})
  );
  //console.log('usermodel23', user);
  return (user);
};


module.exports ={
  adduser,
  getbyemail,
  findUserbyname,
};