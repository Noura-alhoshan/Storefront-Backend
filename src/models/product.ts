import product from '../types/product'
import database from '../database'

class Product {

    async createProduct(product: product): Promise<product> {
    try {
      const { name, price } = product;
      const connection = await database.connect()
      const sql = `INSERT INTO products (name, price) 
                  values ($1, $2) 
                  RETURNING *`;
      const result = await connection.query(sql, [
        name,
        price,
      ])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(
        `cannot create the product.`
      )
    }
  }

  async getProducts(): Promise<product[]> {
    try {
      const connection = await database.connect()
      const sql =
        'SELECT * from products'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (err) {
      throw new Error(`cannot get the products`)
    }
  }

  async getProductById(id: string): Promise<product> {
    try {
      const sql = `SELECT * FROM products 
      WHERE id=($1)`
      const connection = await database.connect()
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Cannot get the product`)
    }
  }
}

export default Product


