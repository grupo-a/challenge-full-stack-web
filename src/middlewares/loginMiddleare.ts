import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export default (req: Request, res: Response, next: NextFunction): any => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json('You are not authorized to access this page.')
  }

  try {
    const [, token] = authorization.split(' ')
    if (token && process.env.TOKEN_SECRET) {
      jwt.verify(token, process.env.TOKEN_SECRET)
      return next()
    } else {
      return res.status(401).json('You are not authorized to access this page.')
    }
  } catch (error) {
    return res.status(401).send({ error })
  }
}
