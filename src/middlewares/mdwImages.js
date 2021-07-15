const img = (req, res, _next) => res.status(200).send('img middleware');

module.exports = { img };
