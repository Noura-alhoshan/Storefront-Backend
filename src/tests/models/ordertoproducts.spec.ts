import ordertoproductsType from '../../types/ordertoproducts'
import database from "../../database";
import ordertoaproducts from "../../models/ordertoproducts";
import Rproductmodel from "../../models/product";
import ordermodel from "../../models/order";
import usermodel from "../../models/user";


const Ordertoproducts = new ordertoaproducts()
const Product = new Rproductmodel()
const Order = new ordermodel()
const User = new usermodel()

let productid1: string, orderid1: string, userId1: string


describe('testing the order model', () => {

    beforeAll(async () => {
        const Rproduct = await Product.createProduct({
            name: 'phone',
            price: '999'
        })
        productid1 = Rproduct.id as string

        const Ruser = await User.createUser({
            firstname: 'noura',
            lastname: 'saad',
            password: '123456',
        })
    userId1 = Ruser.id as string

        const rorder = await Order.createOrder({
            userid: userId1,
            status: `current`
        })
        orderid1 = rorder.id as string
}) 



it('should add to order', async () => {
    const result = await Ordertoproducts.addProductToOrder({
        productid: productid1,
        productquantity: "5",
        orderid: orderid1
    })
    expect(result).toEqual({
        productid: productid1,
        productquantity: "5",
        orderid: orderid1,
        id: result.id
              } as ordertoproductsType)
})

afterAll(async () => {
    const connection = await database.connect()
    const sql = 'DELETE FROM ordertoproducts;'
    await connection.query(sql)
    connection.release()
  })

  afterAll(async () => {
    const connection = await database.connect()
    const sql = 'DELETE FROM users;'
    await connection.query(sql)
    connection.release()
  })

  
})