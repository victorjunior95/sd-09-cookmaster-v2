const jwt = require('jsonwebtoken');
const {
  getByEmail
} = require('../models/loginModel');


const errlogin = {'message':'All fields must be filled'};
const emailneed = {'message':'Incorrect username or password'};


const checkUser = async({email, password})=>{
  if(!email || !password){return errlogin;};
  const user = await getByEmail(email);
  if (!user|| password !== user.password){
    return emailneed;
  }else if(user.password === password){
    const secret = 'cookMaster';
    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256'};
    const token = jwt.sign(user,secret,jwtConfig);
    return {'token': token} ;
  };
};






module.exports = {
  checkUser
};


