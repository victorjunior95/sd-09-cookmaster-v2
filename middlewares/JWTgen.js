// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

// const secret = 'meusecretdetoken';

// module.exports = async (req, res) => {
//   try {
//     const { username } = req.body;
//     const { password } = req.body;
    
//     if (!username || !password) return res.status(401).json({ message: 'É necessário usuário e senha para fazer login' });
    
//     const user = await User.findUser(username);
    
//     const jwtConfig = {
//       expiresIn: '7d',
//       algorithm: 'HS256',
//     };
    
//     const token = jwt.sign({ data: user }, secret, jwtConfig);

//   if (!user || user.password !== password) return res.status(401).json({ message: 'Usuário não existe ou senha inválida' });

//   return res.status(200).json({ message: 'Login efetuado com sucesso', token });
//   } catch (e) {
//     return res.status(500).json({ message: 'Erro interno', error: e });
//   }
// };
