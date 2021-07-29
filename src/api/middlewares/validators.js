const validate = require('../utils/validators');

const token = async (req, res, next) => {
  try {
     const userRegister = await validate.token(req.headers);
     req.user = userRegister;
     next();
    } catch (err) {
      const { message } = err;
      res.status(401).json({ message });
    }
};

module.exports = { token };