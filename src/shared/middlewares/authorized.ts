import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../api-error'
import { prisma } from '../prisma'
import { UserDTO } from '@/user/dto'

export async function authorized(req: Request, res: Response, next: NextFunction) {
  try {
    const session = req.cookies.session
    if (typeof session != 'string' || !session.trim()) throw ApiError.Unauthorized()
    const user = await prisma.user.findFirst({ where: { session }, include: { participations: true } })
    if (!user) throw ApiError.Unauthorized()
    const dto = new UserDTO(user)
    req.user = dto
    next()
  } catch (error) {
    next(error)
  }
}
