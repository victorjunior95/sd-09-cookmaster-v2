const {
  adduser,
  getbyemail,
} = require('../models/usersModel');

const errCreate = {message:'Invalid entries. Try again.'};
const errJaexiste = {message: 'Email already registered'};
const regxp = /.+@[A-z]+[.]com/;


const createUser = async(body) =>{
  const getAllEmail = await getbyemail(body.email);
    
  if( 
    !body|| !body.name || !body.email || !body.password 
    || !regxp.test(body.email)
  ) {return errCreate;};
  
  if(!getAllEmail){
    const result = await adduser({...body, role:'user'});
    const {name, email, role,_id} = result;
    const envolucro = {user: {_id,name, email,role}};
    return envolucro;
  };

  if( body.email === getAllEmail.email
  ){return errJaexiste;};
  
};

// fazer um arrey com todos os emails de usuários.
// se o email da req estiver no array devolver um erro



module.exports = {
  createUser,

};
