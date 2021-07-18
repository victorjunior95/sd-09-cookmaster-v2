// const Joi = require('joi');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');

const responses = {
    allFields: 'All fields must be filled',
    invalid: 'Incorrect username or password',
};

const JWT_SECRET = 'meuSegredoSuperSegreto';

const validateBody = async (body) => {
    if (body.password === undefined || body.email === undefined) {
        return responses.allFields;
    }
    const user = await userModel.findByEmail(body.email);
    if (user === null) {
        return responses.invalid;
    }
};

const login = async (req, res, _next) => {
    const validate = await validateBody(req.body);
    if (validate === responses.allFields) {
        return res.status(401).json({ message: responses.allFields });
    } if (validate === responses.invalid) {
        return res.status(401).json({ message: responses.invalid });
    }
    const payload = {
        email: req.body.email,
        password: req.body.password,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1h',
    });

    res.status(200).json({ token });
};

module.exports = login;