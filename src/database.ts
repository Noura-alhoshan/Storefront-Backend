import { Pool } from 'pg'
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  database: process.env.ENV === 'test' ? process.env.DATABASE_TEST: process.env.DATABASE ,
  user:process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  port: parseInt(process.env.DATABASE_PORT as string, 10),
})


export default pool
