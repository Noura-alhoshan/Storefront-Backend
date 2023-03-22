"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middleware/authentication"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const routes = (0, express_1.Router)();
const User = new user_1.default();
routes.post('/', async (req, res) => {
    try {
        const user = await User.createUser(req.body);
        const token = jsonwebtoken_1.default.sign({ user }, process.env.JWT_SECRET);
        return res.json({ user, token });
    }
    catch (err) {
        throw new Error(`cannot create the user. 2`);
    }
});
routes.get('/', authentication_1.default, async (_, res) => {
    try {
        const allUsers = await User.getUsers();
        return res.json(allUsers);
    }
    catch (err) {
        throw new Error(`cannot get the users`);
    }
});
routes.get('/:id', authentication_1.default, async (req, res) => {
    try {
        const user = await User.getUserById(req.params.id);
        return res.json(user);
    }
    catch (err) {
        throw new Error(`Cannot get the user`);
    }
});
exports.default = routes;
