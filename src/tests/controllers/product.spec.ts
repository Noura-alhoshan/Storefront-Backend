import app from "../../server"
import supertest from 'supertest'
import { generateToken } from "../../middleware/auth"
import database from "../../database"

const request = supertest(app)
const token: string = generateToken("123", 'nnouraa')


describe('products controllers: ', () => {

    it('/products/ should create a product', () => {
        const data = {
            name: 'phone',
            price: '9000',
        }
        request
            .post('/api/products/')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                name: 'phone',
                price: '9000',
            })
    })

    it('/products/ should show error if name is not sent', () => {
        const data = {
            price: '9000',
        }
        request
            .post('/api/products/')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
                error: 'cannot create the product.',
            })
    })

    it('/products/ should show error if price is not sent', () => {
        const data = {
            name: 'phone',
        }
        request
            .post('/api/products/')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
                error: 'cannot create the product.',
            })
    })

    it('/users should return all products', () => {
        request
            .get('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', 'application/json')
            .expect([
                {
                    name: 'phone',
                    price: '9000',
                },
            ])
    })
    afterAll(async () => {
        const connection = await database.connect()
        const sql = 'DELETE FROM products;'
        await connection.query(sql)
        connection.release()
      })
})
