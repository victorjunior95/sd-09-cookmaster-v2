const { ObjectId } = require('mongodb');
const conn = require('./conn');

const addrecipie = async (body, _id) => {
  const formated = { ...body, userId: _id };
    
  const result = await conn().then(async (db) => 
    db.collection('recipes').insertOne(formated));
  return { recipe: result.ops[0] };
};

const getall = async () => {
  const result = await conn().then(
    async (db) => db.collection('recipes').find().toArray(),
  );
  
  return result;
};

const getone = async (_id) => {
  const result = await conn().then(async (db) => 
    db.collection('recipes').findOne(ObjectId(_id)));
  
  return result;
};

const editrecipe = async (id, body) => {
  await conn().then(async (db) => 
    db.collection('recipes').findOneAndUpdate(
      { _id: ObjectId(id) }, { $set: body }, { returnDocument: 'after' },
    ));
  const result = await conn().then(
    async (db) => db.collection('recipes').findOne({ _id: ObjectId(id) }),
  );
 
  return result;
};

const delrecipe = async (id) => {
  // console.log(id);
  const result = await conn().then(async (db) => 
    db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
  return result;
};

const insertimag = async (id, path) => {
  await conn().then(async (db) => 
    db.collection('recipes').updateOne(
      { _id: ObjectId(id) }, { $set: { image: `localhost:3000/${path}` } },
));
  const result = await conn().then(
    async (db) => db.collection('recipes').findOne({ _id: ObjectId(id) }),
);
 
  return result;
};

module.exports = {
  addrecipie,
  getone,
  getall,
  editrecipe,
  delrecipe,
  insertimag,
};
// returnDocument:'after'
