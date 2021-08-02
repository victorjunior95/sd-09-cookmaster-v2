const { StatusCodes } = require('http-status-codes');
const userService = require('../service/userService');
const userAdmin = require('../model/userModel');

const createUser = async (req, res) => {
  console.log('[USER CONTROLLER] : CHAMOU O MÉTODO CRIAR UM USER');
  try {
       const result = await userService.createUser(req.body);
        
       if (result.isError) return res.status(result.status).json(result.err);
       return res.status(StatusCodes.CREATED).json({ user: result });
  } catch (error) {
    console.log(`[USER CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const createAdmin = async (req, res) => {
  console.log('[USER CONTROLLER] : CHAMOU O MÉTODO CRIAR UM ADMIR');
  try {
       const result = await userAdmin.createAdmin(req.body);
        
      // if (result.isError) return res.status(result.status).json(result.err);
       return res.status(StatusCodes.CREATED).json({ user: result });
  } catch (error) {
    console.log(`[USER CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
module.exports = {
  createUser,
  createAdmin,
};