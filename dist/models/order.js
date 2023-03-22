"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class Order {
    async createOrder(order) {
        try {
            const { userid, status } = order;
            const connection = await database_1.default.connect();
            const sql = `INSERT INTO orders (userid, status) 
                  values ($1, $2) 
                  RETURNING *`;
            const result = await connection.query(sql, [
                userid, status
            ]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`cannot create the order.`);
        }
    }
    async getOrders() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * from orders';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`cannot get the orders`);
        }
    }
    async getCurrentOrderByUser(userId) {
        try {
            const connection = await database_1.default.connect();
            const sql = `SELECT * FROM orders 
      WHERE userID='${userId}'`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`cannot get the current order`);
        }
    }
}
exports.default = Order;
