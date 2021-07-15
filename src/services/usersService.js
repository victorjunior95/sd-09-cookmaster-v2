const {
  adduser,
  getbyemail,
} = require('../models/usersModel');

const errCreate = { message: 'Invalid entries. Try again.' };
const errJaexiste = { message: 'Email already registered' };
const regxp = /.+@[A-z]+[.]com/;

const checkName = async (req, res, next) => {
if (!req.body) { return errCreate; }
if (!req.body.name) { return errCreate; }
if (!req.body.password) { return errCreate; }
next();
};

const checkEmal = async (req, res, next) => {
  if (!req.body.email) { return errCreate; }
  if (!regxp.test(req.body.email)) { return errCreate; }
  next();
  };
const createUser = async (body) => {
 const getAllEmail = await getbyemail(body.email);
  if (!getAllEmail) {
    const result = await adduser({ ...body, role: 'user' });
    const { name, email, role, _id } = result;
    const envolucro = { user: { _id, name, email, role } };
    return envolucro;
  }

  if (body.email === getAllEmail.email
  ) { return errJaexiste; }
};

// fazer um arrey com todos os emails de usuários.
// se o email da req estiver no array devolver um erro

module.exports = {
  createUser,
  checkEmal,
  checkName,

};
