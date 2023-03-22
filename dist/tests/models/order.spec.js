"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const order_1 = __importDefault(require("../../models/order"));
const user_1 = __importDefault(require("../../models/user"));
const Order = new order_1.default();
const User = new user_1.default();
let userId1;
describe('testing the order model', () => {
    beforeAll(async () => {
        const Ruser = await User.createUser({
            firstname: 'noura',
            lastname: 'saad',
            password: '123456',
        });
        userId1 = Ruser.id;
    });
    it('should create an order', async () => {
        const result = await Order.createOrder({
            userid: userId1,
            status: `current`
        });
        expect(result).toEqual({
            id: result.id,
            userid: userId1,
            status: `current`
        });
    });
    it('should return order by userid', async () => {
        const result = await Order.getCurrentOrderByUser(userId1);
        const order = result[0];
        expect(order.userid).toEqual(userId1);
    });
    it('should return the orders', async () => {
        const result = await Order.getOrders();
        expect(result.length).toEqual(1);
    });
    afterAll(async () => {
        const connection = await database_1.default.connect();
        const sql = 'DELETE FROM orders;';
        await connection.query(sql);
        connection.release();
    });
    afterAll(async () => {
        const connection = await database_1.default.connect();
        const sql = 'DELETE FROM users;';
        await connection.query(sql);
        connection.release();
    });
    afterAll(async () => {
        const connection = await database_1.default.connect();
        const sql = 'DELETE FROM products;';
        await connection.query(sql);
        connection.release();
    });
});
