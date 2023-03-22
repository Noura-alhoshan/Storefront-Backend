import database from "../../database";
import usermodel from "../../models/user";
import UserType from '../../types/user'

const User = new usermodel()

describe('testing the user model', () => {
        const user = {
      firstname: 'noura',
      lastname: 'saad',
      password: '1234',
    } as UserType
    
    it('should create a user', async () => {
        const result = await User.createUser({
            firstname: 'noura',
            lastname: 'saad',
            password: '123456',
        })
        expect(result).toEqual({
                    id: result.id,
                    firstname: 'noura',
                    lastname: 'saad',
                    password: result.password
                  } as UserType)
    })

    it('should return the users', async () => {
        const result = await User.getUsers()
        expect(result.length).toEqual(1)
    })

    it('should return user by id', async () => {
        const users = await User.getUsers()
        const Id = users[0].id

        const result = await User.getUserById(Id as string)
        expect(result.firstname).toEqual('noura')
    })
    

})
