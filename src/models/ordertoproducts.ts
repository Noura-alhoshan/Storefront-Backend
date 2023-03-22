import database from '../database';
import ordertoproducts from '../types/ordertoproducts'



class Ordertoproducts{
    async addProductToOrder(ordertoproducts: ordertoproducts): Promise<ordertoproducts> {
        try {
          const { orderid, productid, productquantity } = ordertoproducts;
          const connection = await database.connect()
            const sql =
                'INSERT INTO ordertoproducts (orderid, productid, productQuantity) VALUES($1, $2, $3) RETURNING *'
                const result = await connection.query(sql, [
                  orderid, productid, productquantity
                 ])
    
            connection.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`cannot add product`)
        }
    }

    async getProductsInOrderByorder(orderid: String): Promise<ordertoproducts[]> {
        try {
          const connection = await database.connect()
          const sql = `SELECT * FROM ordertoproducts 
      WHERE orderid='${orderid}'`;
          const result = await connection.query(sql)
          connection.release()
          return result.rows
        } catch (err) {
          throw new Error(
            `cannot get the products`
            )
        }
      }
}


export default Ordertoproducts