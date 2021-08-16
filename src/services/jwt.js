const jwt = require('jsonwebtoken');

const secret = 'minhaChaveSecreta';

function generateJwt({ id, email, role }) {
    const token = jwt.sign({ id, email, role }, secret);
    return token;
}

function verifyJwt(token) {
    try {
        const { email, role } = jwt.verify(token, secret);
        return { email, role, error: undefined };
    } catch (error) {
        return { error };
    }
}

module.exports = {
    generateJwt,
    verifyJwt,
};