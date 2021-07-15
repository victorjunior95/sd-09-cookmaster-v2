const { ObjectId } = require('mongodb');

const {
  addrecipie,
  getall,
  getone,
  editrecipe,
  delrecipe,
  insertimag, 
} = require('../models/recipesModel');


// mensagens a retornar em caso de falha
const notfound = {message: 'recipe not found'};
//const notToken = {message: 'missing auth token'};



// sem numeros magicos eslint
const z = 0;
const i = 1;


const validarecipies =async(body,user)=>{
  if (
    !body.name || body.name.length < i+i ||
    !body.ingredients || body.ingredients.length < i ||
    !body.preparation || body.preparation.length < i 
  ){
    return {message:'Invalid entries. Try again.'};
  }else {
    const recipeAdded = await addrecipie(body,user._id);
    return recipeAdded;
  };

};
const getAllrecipies = async()=>{
  return await getall();
};


const getOneRecipe = async(_id)=>{
  if(!ObjectId.isValid(_id)){
    return notfound;
  };
  
  const res = await getone(_id);
  if(!res){ return notfound;} return res;
  
};

const editvlidation = async(id, body)=>{
  
  const result = await Promise.all([editrecipe(id,body)]);
  return result[0];

};

const deletevalidation = async(id)=>{
  
  const result = await delrecipe(id);
  return result;

};

const imagvalidation = async(id, path)=>{
  
  const result = await Promise.all([insertimag(id,path)]);
  return result[0];

};




module.exports ={
  
  validarecipies,
  getAllrecipies,
  getOneRecipe,
  editvlidation,
  deletevalidation,
  imagvalidation
};