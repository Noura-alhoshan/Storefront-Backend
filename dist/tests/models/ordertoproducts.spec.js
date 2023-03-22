"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const ordertoproducts_1 = __importDefault(require("../../models/ordertoproducts"));
const product_1 = __importDefault(require("../../models/product"));
const order_1 = __importDefault(require("../../models/order"));
const user_1 = __importDefault(require("../../models/user"));
const Ordertoproducts = new ordertoproducts_1.default();
const Product = new product_1.default();
const Order = new order_1.default();
const User = new user_1.default();
let productid1, orderid1, userId1;
describe('testing the order model', () => {
    beforeAll(async () => {
        const Rproduct = await Product.createProduct({
            name: 'phone',
            price: '999'
        });
        productid1 = Rproduct.id;
        const Ruser = await User.createUser({
            firstname: 'noura',
            lastname: 'saad',
            password: '123456',
        });
        userId1 = Ruser.id;
        const rorder = await Order.createOrder({
            userid: userId1,
            status: `current`
        });
        orderid1 = rorder.id;
    });
    it('should add to order', async () => {
        const result = await Ordertoproducts.addProductToOrder({
            productid: productid1,
            productquantity: "5",
            orderid: orderid1
        });
        expect(result).toEqual({
            productid: productid1,
            productquantity: "5",
            orderid: orderid1,
            id: result.id
        });
    });
    afterAll(async () => {
        const connection = await database_1.default.connect();
        const sql = 'DELETE FROM ordertoproducts;';
        await connection.query(sql);
        connection.release();
    });
    afterAll(async () => {
        const connection = await database_1.default.connect();
        const sql = 'DELETE FROM users;';
        await connection.query(sql);
        connection.release();
    });
});
