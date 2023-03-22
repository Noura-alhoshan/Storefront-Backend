"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../../models/product"));
const database_1 = __importDefault(require("../../database"));
const Product = new product_1.default();
describe('testing the product model', () => {
    it('should create a product', async () => {
        const result = await Product.createProduct({
            name: 'phone',
            price: '999'
        });
        expect(result).toEqual({
            name: 'phone',
            price: '999',
            id: result.id
        });
    });
    it('should return the products', async () => {
        const result = await Product.getProducts();
        expect(result.length).toEqual(2);
    });
    it('should return product by id', async () => {
        const products = await Product.getProducts();
        const Id = products[0].id;
        const result = await Product.getProductById(Id);
        expect(result.name).toEqual('phone');
    });
    afterAll(async () => {
        const connection = await database_1.default.connect();
        const sql = 'DELETE FROM products;';
        await connection.query(sql);
        connection.release();
    });
});
