"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.ENV === 'test' ? process.env.DATABASE_TEST : process.env.DATABASE,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    port: parseInt(process.env.DATABASE_PORT, 10),
});
exports.default = pool;
