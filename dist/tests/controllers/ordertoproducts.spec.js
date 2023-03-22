"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const auth_1 = require("../../middleware/auth");
const database_1 = __importDefault(require("../../database"));
const request = (0, supertest_1.default)(server_1.default);
const token = (0, auth_1.generateToken)("123", 'nnouraa');
describe('order to product controllers: ', () => {
    it('/orders/ should add product to order', () => {
        const data = {
            productid: "1234",
            productquantity: "current",
            orderid: "123"
        };
        request
            .post('/api/ordertoproducts/addproduct/')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
            productid: "1234",
            productquantity: "current",
            orderid: "123"
        });
    });
    it('/users should return all products in order', () => {
        request
            .get('/api/ordertoproducts/123')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', 'application/json')
            .expect([
            {
                productid: "1234",
                productquantity: "current",
                orderid: "123"
            },
        ]);
    });
    afterAll(async () => {
        const connection = await database_1.default.connect();
        const sql = 'DELETE FROM ordertoproducts;';
        await connection.query(sql);
        connection.release();
    });
});
