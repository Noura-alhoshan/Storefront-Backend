import { Router, Request, Response } from 'express'
import authenticationToken from '../middleware/authentication'
import user from '../models/user'
import jwt from 'jsonwebtoken'

const routes = Router()
const User = new user()

routes.post('/', async (req: Request, res: Response) => {
   try {
  const user = await User.createUser(req.body)
  const token = jwt.sign({ user }, process.env.JWT_SECRET as unknown as string)
    return res.json({user,token});
   }
   catch (err) {
    throw new Error(
      `cannot create the user. 2`)
  }
  });

routes.get('/', authenticationToken, async (_: Request, res: Response) => {
   try {
  const allUsers = await User.getUsers()
    return res.json(allUsers);
   }
   catch (err) {
    throw new Error(`cannot get the users`)
  }
  });

routes.get('/:id', authenticationToken, async (req: Request, res: Response) => {
    try {
  const user = await User.getUserById(req.params.id as unknown as string)
    return res.json(user);
    }
    catch (err) {
      throw new Error(`Cannot get the user`)
    }
  });

export default routes