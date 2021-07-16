const {
  adduser,
  getbyemail,
} = require('../models/usersModel');

const errCreate = { message: 'Invalid entries. Try again.' };
const errJaexiste = { message: 'Email already registered' };
const regxp = /.+@[A-z]+[.]com/;
const cd = 400;

const checkName = async (req, res, next) => {
if (!req.body) { return res.status(cd).json(errCreate); }
if (!req.body.name) { return res.status(cd).json(errCreate); }
if (!req.body.password) { return res.status(cd).json(errCreate); }
next();
};

const checkEmal = async (req, res, next) => {
  if (!req.body.email) { return res.status(cd).json(errCreate); }
  if (!regxp.test(req.body.email)) { return res.status(cd).json(errCreate); }
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

const createUserAdmin = async (body, user) => {
  if (user.role !== 'admin') { return { message: 'Only admins can register new admins' }; }
  const getAllEmail = await getbyemail(body.email);
      if (!getAllEmail) {
     const result = await adduser({ ...body, role: 'admin' });
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
  createUserAdmin,

};
