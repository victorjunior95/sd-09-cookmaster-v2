const users = (req, res, _next) => res.status(200).send('users middleware');

module.exports = { users };
