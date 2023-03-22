import app from "../../server"
import supertest from 'supertest'
import { generateToken } from "../../middleware/auth"
import database from "../../database"

const request = supertest(app)
const token: string = generateToken("123", 'nnouraa')


describe('order to product controllers: ', () => {

it('/orders/ should add product to order', () => {
    const data = {
        productid: "1234",
        productquantity: "current",
        orderid: "123"
    }
    request
        .post('/api/ordertoproducts/addproduct/')
        .send(data)
        .expect('Content-Type', 'application/json')
        .expect(201)
        .expect({
            productid: "1234",
            productquantity: "current",
            orderid: "123"
        })
})

it('/users should return all products in order', () => {
    request
        .get('/api/ordertoproducts/123')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', 'application/json')
        .expect([
            {
                productid: "1234",
                productquantity: "current",
                orderid: "123"
            },
        ])
})

afterAll(async () => {
    const connection = await database.connect()
    const sql = 'DELETE FROM ordertoproducts;'
    await connection.query(sql)
    connection.release()
  })

})

