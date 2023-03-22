import { Request, Response, NextFunction } from 'express'
import jsonwebtoken from 'jsonwebtoken'


const authenticationToken = (req: Request, res: Response, next: NextFunction
) => {
  try {
    const authenticationHeader: string | undefined = req.headers.authorization;
      const token: string = authenticationHeader ? authenticationHeader.split(' ')[1] : '';

        const decode = jsonwebtoken.verify(
          token,
          process.env.JWT_SECRET as string
        )
        res.locals.userData = decode;
          next()
  } catch (err) {
   next(err);
  }
}
export default authenticationToken