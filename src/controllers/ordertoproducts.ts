import { Router, Request, Response } from 'express'
import authenticationToken from '../middleware/authentication'
import ordertoproducts from '../models/ordertoproducts'

const routes = Router()
const Ordertoproducts = new ordertoproducts()

 routes.post('/', authenticationToken, async (req: Request, res: Response) => {
    try {
        const product = await Ordertoproducts.addProductToOrder(req.body)
        return res.json(product);
    }   catch{
      throw new Error(
          `cannot add product to order.`)
  }
})

routes.get('/:orderid',authenticationToken, async (req: Request, res: Response) => {
    try{
    const order = await Ordertoproducts.getProductsInOrderByorder(req.params.orderid as unknown as string)
    return res.json(order);
    }
    catch{
        throw new Error(
            `cannot get the products`)
    }
  });

  export default routes
