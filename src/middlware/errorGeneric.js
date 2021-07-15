const errorGeneric = (err, req, res, _next) => {
    console.log(err);
    if (err.status) {
        const { message, status } = err;
        return res.status(status).json({ message });
    }

    return res.status(500).json({ message: 'Internal error server' });
};

module.exports = { errorGeneric };
