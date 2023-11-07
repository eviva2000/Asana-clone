"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const signUp = (req, res) => {
    (0, express_validator_1.check)('email', 'Invalid Email').isEmail();
    (0, express_validator_1.check)('password', 'Password must be at least 8 characters long').isLength({
        min: 8,
    });
    (0, express_validator_1.check)('password', 'Password must contain special character').matches(/[$*.{}()?"!@#%&/,><':;|_~`]/);
    (0, express_validator_1.check)('password', 'Password must contain a number').matches(/[0-9]/);
    (0, express_validator_1.check)('password', 'Password must contain a lower case letter').matches(/[a-z]/);
    (0, express_validator_1.check)('password', 'Password must contain an upper case letter').matches(/[A-Z]/);
    (0, express_validator_1.check)('password', 'Passwords do not match').equals(req.body.confirm_password);
    const Result = (0, express_validator_1.validationResult)(req);
    console.error('Result.errors:', Result);
    if (!Result.isEmpty()) {
        return res.status(401).send(Result.array());
    }
    res.status(200).send({ message: 'User registered' });
};
const login = (req, res) => {
    const { email, password } = req.body;
    res.status(200).send({
        message: `User loged in with  email ${email} and pass ${password}`,
    });
};
const testAuth = (req, res) => {
    res.status(200).send({ message: 'Test auth route works successfully!!!!' });
};
exports.default = { signUp, login, testAuth };
