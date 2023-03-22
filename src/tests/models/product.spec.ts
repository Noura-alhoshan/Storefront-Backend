import productmodel from "../../models/product";
import ProductType from '../../types/product'
import database from '../../database'

const Product = new productmodel()

describe('testing the product model', () => {

    it('should create a product', async () => {
        const result = await Product.createProduct({
            name: 'phone',
            price: '999'
        })
        expect(result).toEqual({
                    name: 'phone',
                    price: '999',
                    id: result.id
                  } as ProductType)
    })

    it('should return the products', async () => {
        const result = await Product.getProducts()
        expect(result.length).toEqual(2)
    })

    it('should return product by id', async () => {
        const products = await Product.getProducts()
        const Id = products[0].id

        const result = await Product.getProductById(Id as string)
        expect(result.name).toEqual('phone')
    })
    
    afterAll(async () => {
        const connection = await database.connect()
        const sql = 'DELETE FROM products;'
        await connection.query(sql)
        connection.release()
      })
})
