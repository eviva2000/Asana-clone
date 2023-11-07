"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../controllers/auth"));
const auth_2 = require("../../helpers/auth");
const auth = (0, express_1.Router)();
auth.get('/test', auth_1.default.testAuth);
auth.get('/test-prptected', auth_2.validateAuth, auth_1.default.testAuth);
auth.post('/sign-in', auth_1.default.login);
auth.post('/sign-up', auth_1.default.signUp);
exports.default = auth;
