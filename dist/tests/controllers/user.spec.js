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
describe('Users controllers: ', () => {
    it('/users/ should create a user', () => {
        const data = {
            firstname: 'sarah',
            lastname: 'salem',
            password: '123',
        };
        request
            .post('/api/users/')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
            firstname: 'sarah',
            lastname: 'salem',
        });
    });
    it('/users/ should show error if first name is not sent', () => {
        const data = {
            lastname: 'salem',
            password: '123',
        };
        request
            .post('/api/users/')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
            error: 'cannot create the user.',
        });
    });
    it('/users/ should show error if last name is not sent', () => {
        const data = {
            firstname: 'sarah',
            password: '123',
        };
        request
            .post('/api/users/')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
            error: 'cannot create the user.',
        });
    });
    it('/users/ should show error if password is not sent', () => {
        const data = {
            firstname: 'sarah',
            lastname: 'salem',
        };
        request
            .post('/api/users/')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
            error: 'cannot create the user.',
        });
    });
    it('/users should return all users', () => {
        request
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', 'application/json')
            .expect([
            {
                firstname: 'sarah',
                lastname: 'salem',
            },
        ]);
    });
    afterAll(async () => {
        const connection = await database_1.default.connect();
        const sql = 'DELETE FROM users;';
        await connection.query(sql);
        connection.release();
    });
});
