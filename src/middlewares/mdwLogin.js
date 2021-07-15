const login = (req, res, _next) => res.status(200).send('login middleware');

module.exports = { login };
