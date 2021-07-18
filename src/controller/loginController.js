const loginService = require('../services/loginServices');

const ERROR = 500;
const OK = 200;
module.exports = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    const token = await loginService(email);
    // console.log(token);
    res.status(OK).json(token);
  } catch (error) {
    res.status(ERROR).json({ message: error });
  }
};
