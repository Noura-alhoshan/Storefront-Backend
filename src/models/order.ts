import order from '../types/orders'
import database from '../database'

class Order {
    async createOrder(order: order): Promise<order> {
    try {
        const { userid, status } = order;
        const connection = await database.connect()
      const sql = `INSERT INTO orders (userid, status) 
                  values ($1, $2) 
                  RETURNING *`;
      const result = await connection.query(sql, [
       userid, status
      ])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(
        `cannot create the order.`
      )
    }
  }

async getOrders(): Promise<order[]> {
  try {
    const connection = await database.connect()
    const sql =
      'SELECT * from orders'
    const result = await connection.query(sql)
    connection.release()
    return result.rows
  } catch (err) {
    throw new Error(`cannot get the orders`)
  }
}
  async getCurrentOrderByUser(userId: String): Promise<order[]> {
    try {
      const connection = await database.connect()
      const sql = `SELECT * FROM orders 
      WHERE userID='${userId}'`;

      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (err) {
      throw new Error(
        `cannot get the current order`
        )
    }
  }
}

export default Order


