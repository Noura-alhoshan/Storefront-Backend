import bcrypt from 'bcrypt'
import userType from '../types/user'
import database from '../database'
import UserType from '../types/user'

export class User {

  async createUser(user: userType): Promise<userType> {
    try {
      const { firstname, lastname, password } = user;
      const salt = parseInt(process.env.SALT_ROUND as string, 10)
      const pepper = process.env.BCRYPT_PASS
      const hashedPassword = bcrypt.hashSync(password+pepper , salt)
      const connection = await database.connect()
      const sql = `INSERT INTO users (firstName, lastName, password) 
                  values ($1, $2, $3) 
                  RETURNING *`;
      const result = await connection.query(sql, [
        firstname,
        lastname,
        hashedPassword,
      ])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(
        `cannot create the user 1.`
      )
    }
  }

  async getUsers(): Promise<UserType[]> {
    try {
      const connection = await database.connect()
      const sql =
        'SELECT * from users'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (err) {
      throw new Error(`cannot get the users`)
    }
  }

  async getUserById(id: string): Promise<UserType> {
    try {
      const sql = `SELECT * FROM users 
      WHERE id=($1)`
      const connection = await database.connect()
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Cannot get the user`)
    }
  }
 }

export default User