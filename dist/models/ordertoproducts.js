"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class Ordertoproducts {
    async addProductToOrder(ordertoproducts) {
        try {
            const { orderid, productid, productquantity } = ordertoproducts;
            const connection = await database_1.default.connect();
            const sql = 'INSERT INTO ordertoproducts (orderid, productid, productQuantity) VALUES($1, $2, $3) RETURNING *';
            const result = await connection.query(sql, [
                orderid, productid, productquantity
            ]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`cannot add product`);
        }
    }
    async getProductsInOrderByorder(orderid) {
        try {
            const connection = await database_1.default.connect();
            const sql = `SELECT * FROM ordertoproducts 
      WHERE orderid='${orderid}'`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`cannot get the products`);
        }
    }
}
exports.default = Ordertoproducts;
