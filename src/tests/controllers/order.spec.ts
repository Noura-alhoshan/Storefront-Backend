import app from "../../server"
import supertest from 'supertest'
import { generateToken } from "../../middleware/auth"
import database from "../../database"

const request = supertest(app)
const token: string = generateToken("123", 'nnouraa')


describe('order controllers: ', () => {

    it('/orders/ should create a order', () => {
        const data = {
            productid: "123",
            productquantity: "1",
            userid: "321",
            status: "current"
        }
        request
            .post('/api/orders/')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                productid: "123",
                productquantity: "1",
                userid: "321",
                status: "current"
            })
    })


    it('/orders/ should show error if product quantity is not sent', () => {
        const data = {
            productid: "1234",
            orderid: "123"
        }
        request
            .post('/api/orders/addproduct/')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
                error: 'cannot add the product.',
            })
    })

    it('/orders/ should show error if product id is not sent', () => {
        const data = {
            productquantity: "1",
            userid: "321",
            status: "current"
        }
        request
            .post('/api/orders/')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
                error: 'cannot create the order.',
            })
    })

    it('/orders/ should show error if product quantity is not sent', () => {
        const data = {
            productid: "1",
            userid: "321",
            status: "current"
        }
        request
            .post('/api/orders/')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
                error: 'cannot create the order.',
            })
    })

    it('/orders/ should show error if user id is not sent', () => {
        const data = {
            productid: "123",
            productquantity: "1",
            status: "current"
        }
        request
            .post('/api/orders/')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
                error: 'cannot create the order.',
            })
    })

    afterAll(async () => {
        const connection = await database.connect()
        const sql = 'DELETE FROM orders;'
        await connection.query(sql)
        connection.release()
      })
      
}) 
