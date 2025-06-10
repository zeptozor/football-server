import { NextFunction, Request, Response } from 'express'
import { prisma } from '../prisma'
import { ApiError } from '../api-error'

export async function unauthorized(req: Request, res: Response, next: NextFunction) {
  try {
    const session = req.cookies.session
    if (typeof session != 'string' || !session.trim()) {
      res.clearCookie('session')
      next()
      return
    }
    const user = await prisma.user.findFirst({ where: { session }, include: { participations: true } })
    if (!user) {
      res.clearCookie('session')
      next()
      return
    }
    throw new ApiError(403, 'Access forbidden, you are authorized')
  } catch (error) {
    next(error)
  }
}
