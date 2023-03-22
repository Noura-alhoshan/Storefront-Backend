"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticationToken = (req, res, next) => {
    try {
        const authenticationHeader = req.headers.authorization;
        const token = authenticationHeader ? authenticationHeader.split(' ')[1] : '';
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        res.locals.userData = decode;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.default = authenticationToken;
