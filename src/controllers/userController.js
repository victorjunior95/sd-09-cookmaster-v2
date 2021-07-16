const userModel = require('../models/userModel');
const status = require('../status/httpCodes');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await userModel.createUser(name, email, password);

    res.status(status.CREATED).json(result);
  } catch (err) {
    console.log(err);
    res.status(status.ERRO).json({ message: 'Deu ruim!' });
  }
};

module.exports = {
  createUser,
};