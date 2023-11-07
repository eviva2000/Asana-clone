"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuth = void 0;
const firebase_1 = require("../firebase");
const validateAuth = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        try {
            await firebase_1.adminFireAuth.verifyIdToken(token);
            next();
        }
        catch (error) {
            res.status(401).send({ errorCode: 410, errorMessage: 'Token has expired' });
        }
    }
    else {
        res.status(401).send({ errorCode: 410, errorMessage: 'No token provided.' });
    }
};
exports.validateAuth = validateAuth;
