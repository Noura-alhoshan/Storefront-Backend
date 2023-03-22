import { Router, Request, Response } from 'express'
import authenticationToken from '../middleware/authentication'
import product from '../models/product'

const routes = Router()
const Product = new product()

routes.post('/', authenticationToken, async (req: Request, res: Response) => {
    try {
    const product = await Product.createProduct(req.body)
    return res.json(product); }
    catch (err) {
        throw new Error(
          `cannot create the product.`)
      }
  });

routes.get('/', async (_: Request, res: Response) => {
    try {
    const allProduct = await Product.getProducts()
    return res.json(allProduct);
    }
    catch (err) {
        throw new Error(`cannot get the products`)
      }
  });

routes.get('/:id', async (req: Request, res: Response) => {
    try {
    const product = await Product.getProductById(req.params.id as unknown as string)
    return res.json(product);
    }
    catch (err) {
        throw new Error(`Cannot get the product`)
      }
  });

export default routes


