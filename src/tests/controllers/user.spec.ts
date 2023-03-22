import app from "../../server"
import supertest from 'supertest'
import { generateToken } from "../../middleware/auth"
import database from "../../database"

const request = supertest(app)
const token: string = generateToken("123", 'nnouraa')


describe('Users controllers: ', () => {

    it('/users/ should create a user', () => {
        const data = {
            firstname: 'sarah',
            lastname: 'salem',
            password: '123',
        }
        request
            .post('/api/users/')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                firstname: 'sarah',
                lastname: 'salem',
            })
    })

    it('/users/ should show error if first name is not sent', () => {
        const data = {
            lastname: 'salem',
            password: '123',
        }
        request
            .post('/api/users/')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
                error: 'cannot create the user.',
            })
    })

    it('/users/ should show error if last name is not sent', () => {
        const data = {
            firstname: 'sarah',
            password: '123',
        }
        request
            .post('/api/users/')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
                error: 'cannot create the user.',
            })
    })

    it('/users/ should show error if password is not sent', () => {
        const data = {
            firstname: 'sarah',
            lastname: 'salem',
        }
        request
            .post('/api/users/')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
                error: 'cannot create the user.',
            })
    })

    it('/users should return all users', () => {
        request
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', 'application/json')
            .expect([
                {
                    firstname: 'sarah',
                    lastname: 'salem',
                },
            ])
    })
    afterAll(async () => {
        const connection = await database.connect()
        const sql = 'DELETE FROM users;'
        await connection.query(sql)
        connection.release()
      })
})
