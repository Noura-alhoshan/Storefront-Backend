"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../models/user"));
const User = new user_1.default();
describe('testing the user model', () => {
    const user = {
        firstname: 'noura',
        lastname: 'saad',
        password: '1234',
    };
    it('should create a user', async () => {
        const result = await User.createUser({
            firstname: 'noura',
            lastname: 'saad',
            password: '123456',
        });
        expect(result).toEqual({
            id: result.id,
            firstname: 'noura',
            lastname: 'saad',
            password: result.password
        });
    });
    it('should return the users', async () => {
        const result = await User.getUsers();
        expect(result.length).toEqual(1);
    });
    it('should return user by id', async () => {
        const users = await User.getUsers();
        const Id = users[0].id;
        const result = await User.getUserById(Id);
        expect(result.firstname).toEqual('noura');
    });
});
