const authentication = require('./authentication_Middleware');
const { MISSING_TOKEN, INVALID_TOKEN } = require('../Messages/errors');
const { updateById } = require('../services');

const updateRecipeById = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  if (!token) {
    return res.status(MISSING_TOKEN.code).json({ message: MISSING_TOKEN.message });
  }
  const userId = await authentication(token);
  if (userId.code === 401) {
    const { code, message } = INVALID_TOKEN;
    return res.status(code).json({ message });
  }
  const { _id, role } = userId;
  const result = await updateById(id, _id, role, req.body);
  if (!result) {
    const { code, message } = MISSING_TOKEN;
    return res.status(code).json({ message });
  }
  console.log(result);
  return res.status(200).json(result);
};

module.exports = updateRecipeById;
