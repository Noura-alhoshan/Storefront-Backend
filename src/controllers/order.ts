import { Router, Request, Response } from 'express'
import authenticationToken from '../middleware/authentication'
import order from '../models/order'

const routes = Router()
const Order = new order()

routes.post('/', authenticationToken, async (req: Request, res: Response) => {
    try{
    const order = await Order.createOrder(req.body)
    return res.json(order);}
    catch{
        throw new Error(
            `cannot create the order.`)
    }
  });

  routes.get('/', async (_: Request, res: Response) => {
    try {
    const allOrders = await Order.getOrders()
    return res.json(allOrders);
    }
    catch (err) {
        throw new Error(`cannot get the orders`)
      }
  });

  routes.get('/:userID', async (req: Request, res: Response) => {
    try{
    const order = await Order.getCurrentOrderByUser(req.params.userID as unknown as string)
    return res.json(order);
    }
    catch{
        throw new Error(
            `cannot get the current order`)
    }
  });

export default routes


