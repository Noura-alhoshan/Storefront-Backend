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
describe('products controllers: ', () => {
    it('/products/ should create a product', () => {
        const data = {
            name: 'phone',
            price: '9000',
        };
        request
            .post('/api/products/')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
            name: 'phone',
            price: '9000',
        });
    });
    it('/products/ should show error if name is not sent', () => {
        const data = {
            price: '9000',
        };
        request
            .post('/api/products/')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
            error: 'cannot create the product.',
        });
    });
    it('/products/ should show error if price is not sent', () => {
        const data = {
            name: 'phone',
        };
        request
            .post('/api/products/')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
            error: 'cannot create the product.',
        });
    });
    it('/users should return all products', () => {
        request
            .get('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', 'application/json')
            .expect([
            {
                name: 'phone',
                price: '9000',
            },
        ]);
    });
    afterAll(async () => {
        const connection = await database_1.default.connect();
        const sql = 'DELETE FROM products;';
        await connection.query(sql);
        connection.release();
    });
});
