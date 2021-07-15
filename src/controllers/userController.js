const status = require('../statuscode/status');
const userService = require('../services/userService');

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await userService.addUser(name, email, password);
    if (!result !== null) {
      return res.status(status.CREATE).json({ user: result });
    }
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).send({ error: Message.err });
  }
};

module.exports = {

  addUser,
};
