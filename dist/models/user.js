"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
class User {
    async createUser(user) {
        try {
            const { firstname, lastname, password } = user;
            const salt = parseInt(process.env.SALT_ROUND, 10);
            const pepper = process.env.BCRYPT_PASS;
            const hashedPassword = bcrypt_1.default.hashSync(password + pepper, salt);
            const connection = await database_1.default.connect();
            const sql = `INSERT INTO users (firstName, lastName, password) 
                  values ($1, $2, $3) 
                  RETURNING *`;
            const result = await connection.query(sql, [
                firstname,
                lastname,
                hashedPassword,
            ]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`cannot create the user 1.`);
        }
    }
    async getUsers() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * from users';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`cannot get the users`);
        }
    }
    async getUserById(id) {
        try {
            const sql = `SELECT * FROM users 
      WHERE id=($1)`;
            const connection = await database_1.default.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot get the user`);
        }
    }
}
exports.User = User;
exports.default = User;
