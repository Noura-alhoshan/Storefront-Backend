"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middleware/authentication"));
const order_1 = __importDefault(require("../models/order"));
const routes = (0, express_1.Router)();
const Order = new order_1.default();
routes.post('/', authentication_1.default, async (req, res) => {
    try {
        const order = await Order.createOrder(req.body);
        return res.json(order);
    }
    catch {
        throw new Error(`cannot create the order.`);
    }
});
routes.get('/', async (_, res) => {
    try {
        const allOrders = await Order.getOrders();
        return res.json(allOrders);
    }
    catch (err) {
        throw new Error(`cannot get the orders`);
    }
});
routes.get('/:userID', async (req, res) => {
    try {
        const order = await Order.getCurrentOrderByUser(req.params.userID);
        return res.json(order);
    }
    catch {
        throw new Error(`cannot get the current order`);
    }
});
exports.default = routes;
