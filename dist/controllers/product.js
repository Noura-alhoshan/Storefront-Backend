"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middleware/authentication"));
const product_1 = __importDefault(require("../models/product"));
const routes = (0, express_1.Router)();
const Product = new product_1.default();
routes.post('/', authentication_1.default, async (req, res) => {
    try {
        const product = await Product.createProduct(req.body);
        return res.json(product);
    }
    catch (err) {
        throw new Error(`cannot create the product.`);
    }
});
routes.get('/', async (_, res) => {
    try {
        const allProduct = await Product.getProducts();
        return res.json(allProduct);
    }
    catch (err) {
        throw new Error(`cannot get the products`);
    }
});
routes.get('/:id', async (req, res) => {
    try {
        const product = await Product.getProductById(req.params.id);
        return res.json(product);
    }
    catch (err) {
        throw new Error(`Cannot get the product`);
    }
});
exports.default = routes;
