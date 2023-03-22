"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class Product {
    async createProduct(product) {
        try {
            const { name, price } = product;
            const connection = await database_1.default.connect();
            const sql = `INSERT INTO products (name, price) 
                  values ($1, $2) 
                  RETURNING *`;
            const result = await connection.query(sql, [
                name,
                price,
            ]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`cannot create the product.`);
        }
    }
    async getProducts() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * from products';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`cannot get the products`);
        }
    }
    async getProductById(id) {
        try {
            const sql = `SELECT * FROM products 
      WHERE id=($1)`;
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot get the product`);
        }
    }
}
exports.default = Product;
