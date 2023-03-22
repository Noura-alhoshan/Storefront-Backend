import { Router } from 'express'
import userControllers from '../controllers/user'
import productControllers from '../controllers/product'
import orderControllers from '../controllers/order'
import ordertoProductControllers from '../controllers/ordertoproducts'


const routes = Router()
routes.use('/users', userControllers)
routes.use('/products', productControllers)
routes.use('/orders', orderControllers)
routes.use('/ordertoproducts', ordertoProductControllers)



export default routes
