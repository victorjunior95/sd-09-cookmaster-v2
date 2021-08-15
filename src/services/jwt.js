const jwt = require('jsonwebtoken');

const secret = 'minhaChaveSecreta';

function generateJwt({ id, email, role }) {
    const token = jwt.sign({ id, email, role }, secret);
    return token;
}

module.exports = {
    generateJwt,
};