"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middleware/authentication"));
const ordertoproducts_1 = __importDefault(require("../models/ordertoproducts"));
const routes = (0, express_1.Router)();
const Ordertoproducts = new ordertoproducts_1.default();
routes.post('/', authentication_1.default, async (req, res) => {
    try {
        const product = await Ordertoproducts.addProductToOrder(req.body);
        return res.json(product);
    }
    catch {
        throw new Error(`cannot add product to order.`);
    }
});
routes.get('/:orderid', authentication_1.default, async (req, res) => {
    try {
        const order = await Ordertoproducts.getProductsInOrderByorder(req.params.orderid);
        return res.json(order);
    }
    catch {
        throw new Error(`cannot get the products`);
    }
});
exports.default = routes;
