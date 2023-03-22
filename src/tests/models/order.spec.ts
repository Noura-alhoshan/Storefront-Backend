import database from "../../database";
import ordermodel from "../../models/order";
import orderType from '../../types/orders';
import usermodel from "../../models/user";


const Order = new ordermodel()
const User = new usermodel()
let userId1: string


describe('testing the order model', () => {


    beforeAll(async () => {
            const Ruser = await User.createUser({
                firstname: 'noura',
                lastname: 'saad',
                password: '123456',
            })
        userId1 = Ruser.id as string
    }) 


    it('should create an order', async () => {
        const result = await Order.createOrder({
            userid: userId1,
            status: `current`
        })
        expect(result).toEqual({
            id: result.id,
            userid: userId1,
            status: `current`
            } as orderType)
    })

    it('should return order by userid', async () => {
        const result = await Order.getCurrentOrderByUser(userId1)
        const order = result[0]
        expect(order.userid).toEqual(userId1)
    })

    it('should return the orders', async () => {
        const result = await Order.getOrders()
        expect(result.length).toEqual(1)
    })

    afterAll(async () => {
        const connection = await database.connect()
        const sql = 'DELETE FROM orders;'
        await connection.query(sql)
        connection.release()
      })
      afterAll(async () => {
        const connection = await database.connect()
        const sql = 'DELETE FROM users;'
        await connection.query(sql)
        connection.release()
      })
      afterAll(async () => {
        const connection = await database.connect()
        const sql = 'DELETE FROM products;'
        await connection.query(sql)
        connection.release()
      })
})

