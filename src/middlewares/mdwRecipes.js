const recipes = (req, res, _next) => res.status(200).send('recipes middleware');

module.exports = { recipes };
